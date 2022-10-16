import { gql } from "@apollo/client";

export const VERSION=gql`
    query version($id: String!,$sort:Boolean) {
        version(id: $id,sort: $sort) {
            id
            parent_id
            name_key
            names {
                key
                language_key
                value
            }
            # url @client
            items {
                id
                # url @client
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
        }
    }

`;