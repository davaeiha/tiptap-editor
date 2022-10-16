import { gql } from "@apollo/client";

export const KNOWLEDGE_CONTENT = gql`
    query knowledgeContent($id: String!) {
        knowledgeContent(id: $id) {
            id
            type2
            name_key
            content_id
            names {
                key
                language_key
                value
            }
            versions {
            # url @client
            id
            parent_id
            name_key
                names {
                    key
                    language_key
                    value
                }
            }
        }
    }
`;
