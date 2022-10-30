import React, { useEffect } from 'react'
import {Editor as EditorType, NodeViewRendererProps, NodeViewWrapper,NodeViewContent } from '@tiptap/react';

const OrderedListNodeWrapper = (props:NodeViewRendererProps) => {

    useEffect(()=>{
        props
        .node
        .content
        .content
        .filter((childNode)=>childNode.attrs.parent_item_id !== props.node.firstChild?.attrs.parent_item_id)
        .forEach((childNode)=>{
          childNode.attrs.parent_id = props.node.firstChild?.attrs.parent_id;
          childNode.attrs.parent_item_id = props.node.firstChild?.attrs.parent_item_id;
        })
    },[props.node.childCount]);

    return (
        <NodeViewWrapper className="ordered-list">
            <NodeViewContent className="content"/>
        </NodeViewWrapper>
    );
}

export default OrderedListNodeWrapper;