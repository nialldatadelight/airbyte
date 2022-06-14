from datetime import datetime
from airbyte_cdk.sources.streams.http import HttpStream
from airbyte_cdk.sources.streams import IncrementalMixin


class ApolloStream(HttpStream):
    url_base = "https://api.apollo.io/v1/"
    default_body = {}

    def __init__(self, api_key, *args, **kwargs):
        self.api_key = api_key
        super().__init__(*args, **kwargs)

    def request_body_json(self, *args, **kwargs):
        data = super().request_body_json(*args, **kwargs) or {}
        data = {
            **self.default_body,
            **data,
        }
        data['api_key'] = self.api_key
        return data

    def request_headers(self, **kwargs):
        return {'Content-Type': 'application/json'}

    def parse_response(self, response, *args, **kwargs):
        json_response = response.json()
        records = json_response.get(self.data_field, [])

        if records is not None:
            for record in records:
                yield record


class ApolloStreamPaginationMixin:
    page = 0

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.page = 1

    def request_body_json(self, next_page_token=None, **kwargs):
        data = super().request_body_json(next_page_token=next_page_token, **kwargs)
        print(f'For page {next_page_token}')
        data['page'] = next_page_token or 1
        return data

    def next_page_token(self, response):
        stream_data = response.json()
        records = stream_data.get(self.data_field, [])
        if len(records) == 0:
            return
        self.page += 1
        return self.page


class ApolloIncrementalMixin(IncrementalMixin):
    date_format = '%Y-%m-%dT%H:%M:%S.%f%z'
    cursor_field = "completed_at"

    def __init__(self, start_time: int, **kwargs):
        super().__init__(**kwargs)
        self.start_time = datetime.strptime(start_time, '%Y-%m-%dT%H:%M:%S%z')
        self._cursor_value = None
        self._max_cursor_value = None

    @property
    def state(self):
        return {self.cursor_field: (self._cursor_value or self.start_time).strftime(self.date_format)}
    
    @state.setter
    def state(self, value):
        self._cursor_value = datetime.strptime(value[self.cursor_field], self.date_format)

    def read_records(self, *args, **kwargs):
        records = super().read_records(*args, **kwargs)
        
        # Sorted descending, so can do next(records)
        first_record = next(records)
        latest_record_date = datetime.strptime(first_record[self.cursor_field], self.date_format)
        self._max_cursor_value = max(self._max_cursor_value or self._cursor_value or self.start_time, latest_record_date)  # TODO: Only set when finished

        yield first_record
        for record in records:
            yield record

    def next_page_token(self, response):
        stream_data = response.json()

        # As ordered descending
        records = stream_data.get(self.data_field, [])
        if records:
            last_record = records[-1]
            oldest_record_date = datetime.strptime(last_record[self.cursor_field], self.date_format)
            if oldest_record_date < self.start_time:
                return
            if self._cursor_value is not None and oldest_record_date < self._cursor_value:  # Check against last state run
                return

        npt = super().next_page_token(response)
        if npt is None:
            # Finished paginating, so set self._cursor_value.
            # Do this here, at the end of paginating, to ensure that if there's an error while paginating that the
            # state stored is the original state so we refetch from here
            self._cursor_value = self._max_cursor_value
            return

        return npt


class EmailerMessages(ApolloIncrementalMixin, ApolloStreamPaginationMixin, ApolloStream):
    primary_key = "id"
    data_field = "emailer_messages"
    default_body = {
        "display_mode": "explorer_mode",
        "sort_by_field": "completed_at",
        "sort_ascending": False,
        "emailer_message_stats": ["clicked"],
        "per_page": 100,
        "Cache-Control": "no-cache",
    }
    http_method = "POST"

    def path(self, **kwargs) -> str:
        return "emailer_messages/search"


class EmailerCampaigns(ApolloIncrementalMixin, ApolloStreamPaginationMixin, ApolloStream):
    primary_key = "id"
    data_field = "emailer_campaigns"
    cursor_field = "created_at"
    default_body = {
        "sort_by_field": "created_at",
        "sort_ascending": False,
        "emailer_message_stats": ["clicked"],
        "per_page": 200,
        "Cache-Control": "no-cache",
    }
    http_method = "POST"

    def path(self, **kwargs) -> str:
        return "emailer_campaigns/search"
