/* eslint-disable import/no-anonymous-default-export */
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import React from 'react';

export default () => {
  return (
    <NodeViewWrapper className="draggable-item">
      <div
        className="drag-handle"
        contentEditable="false"
        draggable="true"
        data-drag-handle
      />
      <NodeViewContent className="content" />
      <div
        className='dropdown-menu'
        contentEditable="false"
      />
    </NodeViewWrapper>
  )
}