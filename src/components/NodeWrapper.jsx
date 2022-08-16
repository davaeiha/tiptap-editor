/* eslint-disable import/no-anonymous-default-export */
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import React,{useRef} from 'react';
import DropdownMenu from './DropdownMenu';

export default (props) => {

  const contentRef = useRef(null);

  return (
    <NodeViewWrapper className="draggable-item">
      <div
        className="drag-handle"
        contentEditable="false"
        draggable="true"
        data-drag-handle
      />
      <NodeViewContent className="content" ref={contentRef}/>

      <DropdownMenu contentRef={contentRef}/>
    </NodeViewWrapper>
  )
}