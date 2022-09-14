/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { NodeViewContent,NodeViewRendererProps } from '@tiptap/react';
import NodeWrapper from './NodeWrapper';

const DragNodeWrapper : React.FC<NodeViewRendererProps> = (props) => {  
  return (
      <NodeWrapper {...props}>
           <NodeViewContent className="content"/>
      </NodeWrapper>
  )
}

export default DragNodeWrapper;