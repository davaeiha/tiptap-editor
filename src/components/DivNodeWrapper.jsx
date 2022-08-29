/* eslint-disable import/no-anonymous-default-export */
import { NodeViewContent } from '@tiptap/react';
import NodeWrapper from './NodeWrapper';

const DivNodeWrapper = (props) => {

  return (
      <NodeWrapper {...props}>
           <NodeViewContent className="content"/>
      </NodeWrapper>
  )
}

export  default DivNodeWrapper;