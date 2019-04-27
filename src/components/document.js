import React from 'react'
import Node from './node'
import { identify } from '../services/document'

export default function Document() {
  let rootNode = identify(window.DOC)
  return (
    <div className="document">
      <Node node={rootNode} />
    </div>
  );
}
