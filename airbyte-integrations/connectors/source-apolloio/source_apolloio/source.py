#
# Copyright (c) 2022 Airbyte, Inc., all rights reserved.
#


from typing import Any, List, Mapping, Tuple

from airbyte_cdk.sources.streams import Stream
from airbyte_cdk.sources import AbstractSource

from source_apolloio.streams import EmailerMessages, EmailerCampaigns


class SourceApolloio(AbstractSource):
    def check_connection(self, logger, config) -> Tuple[bool, any]:
        try:
            # authenticator = TokenAuthenticator(config["apikey"])
            # scopes_gen = Scopes(authenticator=authenticator).read_records(sync_mode=SyncMode.full_refresh)
            # next(scopes_gen)
            return True, None
        except Exception as error:
            return False, f"Unable to connect to Sendgrid API with the provided credentials - {error}"

    def streams(self, config: Mapping[str, Any]) -> List[Stream]:
        return [
            EmailerMessages(api_key=config['api_key'], start_time=config['start_time']),
            # EmailerCampaigns(api_key=config['api_key'], start_time=config['start_time']),
        ]
