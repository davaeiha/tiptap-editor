import { gql } from "@apollo/client";

export const BULK_ITEMS = gql`
    mutation bulkItems($data: [BulkItemInput!]!) {
        bulkItems(data: $data) {
            id
            content {
                id
                parent_id
                content_id
                original_id
                parent_item_id
                parent_field_id
                overloaded_value
                type1
                type2
                raw_value
                value
                name_key
                order
                names {
                    language_key
                    value
                    key
                }
                media {
                    id
                    url
                    max_width
                    file_format
                }
            }
            error {
                type
                message
            }
        }
    }
`