interface Name {
    key ?: string | null;
    language_key ?: string | null;
    value ?:  string | null; 
    __typename ?: string | null;
}

interface Media {
    created_by ?: string | null;
    creation ?: string | null;
    file_format ?: string | null;
    file_path ?: string | null;
    id ?: string | null;
    last_upd ?: string | null;
    max_width ?: number | null;
    upd_by?: string | null;
    url ?: string | null;
  }

enum content_type1 {
    // in projects
    project = 'project',
    workspace = 'workspace', 
  
    // in document creator
    publication = 'publication', 
    field = 'field',
    field_element = 'field_element',
  
    // in KB
    knowledge = 'knowledge',
    version = 'version',
    item = 'item',
    variable = 'variable',
    variable_option = 'variable_option',
    variable_value = 'variable_value',
  
    // other
    product = 'product',
    company = 'company' 
}

enum content_type2 {
    paragraph_item = 'paragraph_item',
    head_rel0_item = 'head_rel0_item',
    head_rel1_item = 'head_rel1_item',
    head_rel2_item = 'head_rel2_item',
    head_rel3_item = 'head_rel3_item',
    image_item = 'image_item',
    bulleted_item = 'bulleted_item',
    numbered_item = 'numbered_item',
    content_item = 'content_item',
    list_item = 'list_item',
    article_kl = 'article_kl',
    none = 'none'
}

export interface QueryVarable {
    id: string;
    sort ?: boolean;
}

export interface Version {
    id : string;
    parent_id ?: string | null;
    name_key ?: string | null;
    name ?: Name[] | null;
    items ?: ContentItem[];
    __typename ?: string | null;
}

export interface KnowledgeContent {
    id : string;
    content_id ?: string | null;
    name_key ?: string | null;
    name ?: Name[] | null;
    type2 ?: content_type2 | null;
    versions ?: Version[];
    __typename ?: string | null;
}

export interface ContentItem {
    id : string;
    content_id ?: string | null;
    parent_id ?: string | null;
    parent_field_id ?: string | null;
    parent_item_id ?: string | null;
    original_id ?: string | null;
    order ?: string;
    value ?: string|null;
    raw_value ?: string|null;
    overloaded_value?: string | null;
    type1: content_type1;
    type2: content_type2;
    media ?: Media[] | null;
    name_key ?: string | null;
    name ?: Name[] | null;
    __typename ?: string | null;
}

export interface NestedContentItem extends ContentItem {
    children ?: NestedContentItem[] ;
}

export interface ContentTree{
    type : string;
    content ?: ContentTree[];
    text ?: string;
    attrs ?: any
}