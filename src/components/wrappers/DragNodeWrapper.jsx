/* eslint-disable import/no-anonymous-default-export */
import React,{memo} from "react";
import { NodeViewContent } from '@tiptap/react';
import NodeWrapper from './NodeWrapper';

const DragNodeWrapper = (props) => {  
  return (
      <NodeWrapper {...props}>
           <NodeViewContent className="content"/>
      </NodeWrapper>
  )
}

export default DragNodeWrapper;