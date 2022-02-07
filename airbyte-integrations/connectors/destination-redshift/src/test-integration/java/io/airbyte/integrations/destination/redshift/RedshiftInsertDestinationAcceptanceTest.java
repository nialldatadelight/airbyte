/*
 * Copyright (c) 2021 Airbyte, Inc., all rights reserved.
 */

package io.airbyte.integrations.destination.redshift;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Lists;
import io.airbyte.commons.io.IOs;
import io.airbyte.commons.json.Jsons;
import io.airbyte.commons.string.Strings;
import io.airbyte.db.Database;
import io.airbyte.integrations.base.AirbyteMessageConsumer;
import io.airbyte.integrations.base.Destination;
import io.airbyte.integrations.base.JavaBaseConstants;
import io.airbyte.integrations.destination.NamingConventionTransformer;
import io.airbyte.integrations.destination.StandardNameTransformer;
import io.airbyte.protocol.models.*;
import org.jooq.Record;
import org.jooq.Result;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.nio.file.Path;
import java.sql.SQLException;
import java.time.Instant;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Integration test testing the {@link RedshiftInsertDestination}. As the Redshift test credentials
 * contain S3 credentials by default, we remove these credentials.
 */
public class RedshiftInsertDestinationAcceptanceTest extends RedshiftCopyDestinationAcceptanceTest {

  public static final String DATASET_ID = Strings.addRandomSuffix("airbyte_tests", "_", 8);
  private static final String TYPE = "type";
  private ConfiguredAirbyteCatalog catalog;

  private static final Path CREDENTIALS_PATH = Path.of("secrets/credentials.json");

  private static final Instant NOW = Instant.now();
  private static final String USERS_STREAM_NAME = "users";

  private static final AirbyteMessage MESSAGE_USERS1 = new AirbyteMessage().withType(AirbyteMessage.Type.RECORD)
          .withRecord(new AirbyteRecordMessage().withStream(USERS_STREAM_NAME)
                  .withData(Jsons.jsonNode(ImmutableMap.builder().put("name", "john").put("id", "10").build()))
                  .withEmittedAt(NOW.toEpochMilli()));
  private static final AirbyteMessage MESSAGE_USERS2 = new AirbyteMessage().withType(AirbyteMessage.Type.RECORD)
          .withRecord(new AirbyteRecordMessage().withStream(USERS_STREAM_NAME)
                  .withData(Jsons.jsonNode(ImmutableMap.builder().put("name", "susan").put("id", "30").build()))
                  .withEmittedAt(NOW.toEpochMilli()));

  private static final AirbyteMessage MESSAGE_STATE = new AirbyteMessage().withType(AirbyteMessage.Type.STATE)
          .withState(new AirbyteStateMessage().withData(Jsons.jsonNode(ImmutableMap.builder().put("checkpoint", "now!").build())));

  private static final NamingConventionTransformer NAMING_RESOLVER = new StandardNameTransformer();

  public JsonNode getStaticConfig() {
    return purge(Jsons.deserialize(IOs.readFile(Path.of("secrets/config.json"))));
  }

  public static JsonNode purge(final JsonNode config) {
    final var original = (ObjectNode) Jsons.clone(config);
    original.remove("s3_bucket_name");
    original.remove("s3_bucket_region");
    original.remove("access_key_id");
    original.remove("secret_access_key");
    return original;
  }

  @BeforeEach
  void setup(){
    MESSAGE_USERS1.getRecord().setNamespace(DATASET_ID);
    MESSAGE_USERS2.getRecord().setNamespace(DATASET_ID);
    catalog = new ConfiguredAirbyteCatalog().withStreams(Lists.newArrayList(
            CatalogHelpers.createConfiguredAirbyteStream(USERS_STREAM_NAME, DATASET_ID,
                            io.airbyte.protocol.models.Field.of("name", JsonSchemaPrimitive.STRING),
                            io.airbyte.protocol.models.Field.of("id", JsonSchemaPrimitive.STRING))
                    .withDestinationSyncMode(DestinationSyncMode.APPEND)));
  }

  @Test
  void testIfSuperTmpTableWasCreatedAfterVarcharTmpTable() throws Exception {
    Database database = getDatabase();
    String rawTableName = this.getNamingResolver().getRawTableName(USERS_STREAM_NAME);
    createTmpTableWithVarchar(database, rawTableName);

    assertTrue(isTmpTableDataColumnInExpectedType(database, DATASET_ID, rawTableName, "character varying"));

    final Destination destination = new RedshiftDestination();
    final AirbyteMessageConsumer consumer = destination.getConsumer(config, catalog, Destination::defaultOutputRecordCollector);
    consumer.start();
    consumer.accept(MESSAGE_USERS1);
    consumer.accept(MESSAGE_USERS2);
    consumer.accept(MESSAGE_STATE);
    consumer.close();

    assertTrue(isTmpTableDataColumnInExpectedType(database, DATASET_ID, rawTableName, "super"));

    final List<JsonNode> usersActual = retrieveRecords(testDestinationEnv, USERS_STREAM_NAME, DATASET_ID, config);
    final List<JsonNode> expectedUsersJson = Lists.newArrayList(MESSAGE_USERS1.getRecord().getData(), MESSAGE_USERS2.getRecord().getData());
    assertEquals(expectedUsersJson.size(), usersActual.size());
    assertTrue(expectedUsersJson.containsAll(usersActual) && usersActual.containsAll(expectedUsersJson));
  }

  private void createTmpTableWithVarchar(Database database, String streamName) throws SQLException {
    // As we don't care about the previous data we just simulate the flow when previous table exists.
    database.query(q -> {
      q.fetch(String.format("CREATE SCHEMA IF NOT EXISTS %s", DATASET_ID));
      q.fetch(String.format("CREATE TABLE IF NOT EXISTS %s.%s (%s VARCHAR PRIMARY KEY, %s VARCHAR, %s TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)",
              DATASET_ID,
              streamName,
              JavaBaseConstants.COLUMN_NAME_AB_ID,
              JavaBaseConstants.COLUMN_NAME_DATA,
              JavaBaseConstants.COLUMN_NAME_EMITTED_AT));
      return null;
    });
  }

  /**
   * @param database - current database properties
   * @param dataSet - current catalog
   * @param streamName - table name
   * @param expectedType - data type of _airbyte_data to expect
   * @return if current datatype of _airbyte_data column is expectedType.
   *
   * PG_TABLE_DEF table Stores information about table columns.
   * PG_TABLE_DEF only returns information about tables that are visible to the user.
   *
   * <a href="https://docs.aws.amazon.com/redshift/latest/dg/r_PG_TABLE_DEF.html">PG_TABLE_DEF</a>
   *
   * @throws SQLException
   */
  private boolean isTmpTableDataColumnInExpectedType(final Database database,
                                          final String dataSet,
                                          final String streamName,
                                          final String expectedType) throws SQLException {
    Result<Record> query = database.query(q -> {
      return q.fetch(String.format("""
              set search_path to %s;
              select type from pg_table_def where tablename = \'%s\' and "column" = \'%s\'""",
              dataSet, streamName, JavaBaseConstants.COLUMN_NAME_DATA));
    });
    return query.get(0).getValue(TYPE).toString().trim().contains(expectedType);
  }
}
