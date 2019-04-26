import React from 'react'
import Node from './node'
import { setIds } from '../services/document'

export default function Document() {
  let rootNode = setIds(window.DOC)
  return (
    <div className="document">
      <Node node={rootNode} root />
    </div>
  );
}
