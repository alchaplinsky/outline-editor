import React from 'react'

export default function Node({ node, handleKeyDown, handleInput }) {
  return (
    <div className="node">
      <div
        className="node-self"
        contentEditable
        suppressContentEditableWarning
        tabIndex="-1"
        onKeyDown={event => handleKeyDown(event, node)}
        onInput={event => handleInput(event, node)}
      >
        {node.value}
      </div>
      {node.nodes.map((n, index) => {
        return <Node node={n} key={index} handleKeyDown={handleKeyDown} handleInput={handleInput} />
      })}
    </div>
  )
}
