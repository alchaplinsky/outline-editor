import React, {useState} from 'react'
import Node from './node'
import Doc from '../document'

export default function Document() {
  const [document, setDocument] = useState(new Doc(window.DOC.nodes))

  const handleInput = (event, node) => {
    node.value = event.target.innerText
    setDocument(Object.assign({}, document))
  }

  const handleBackspace = (event, node) => {
    if (node.value === '') {
      node.remove()
    }
  }

  const handelEnterKey = (event, node) => {
    event.preventDefault()
    if (node.nodes.length === 0) {
      node.appendSibling()
    } else {
      node.nodes[0].prependSibling()
    }
  }

  const handleTabKey = (event, node) => {
    event.preventDefault()
    if (event.shiftKey) {
      node.unnest()
    } else {
      node.nest()
    }
  }

  const onKeyDown = (event, node) => {
    switch (event.keyCode) {
      case 8:
        handleBackspace(event, node)
        break;
      case 9:
        handleTabKey(event, node)
        break;
      case 13:
        handelEnterKey(event, node)
        break;
      default:
        break;
    }
    setDocument(Object.assign({}, document))
  }

  return (
    <div className="document">
      <div className="node is-root">
        <div className="node-self">Untitled Document</div>
        {document.nodes.map((node, index) => {
          return <Node node={node} key={index} handleKeyDown={onKeyDown} handleInput={handleInput} />
        })}
      </div>
    </div>
  );
}
