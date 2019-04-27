import React from 'react'
import ContentEditable from 'react-contenteditable'
import { nest, unnest, remove, append, prepend } from '../services/document'

export default class Node extends React.Component {
  keyMap = {
    8: 'handleBackspaceKey',
    9: 'handleTabKey',
    13: 'handleEnterKey',
    38: 'handleUpKey',
    40: 'handleDownKey'
  }

  constructor(props) {
    super(props)

    this.state = {
      id: this.props.node.id,
      type: this.props.node.type,
      value: this.props.node.value,
      children: this.props.node.children
    }
  }

  handleInput(event) {
    this.setState({ value: event.target.value })
  }

  onKeyDown(event) {
    let name = this.keyMap[event.keyCode]
    if (name) return this[name](event)
  }

  handleUpKey() {}
  handleDownKey() {}

  handleBackspaceKey(event) {
    if (this.state.value === '' && this.state.children.length === 0) {
      remove(this)
    }
  }

  handleEnterKey(event) {
    event.preventDefault()
    if (this.state.children.length === 0) {
      append(this)
    } else {
      prepend(this)
    }
  }

  handleTabKey(event) {
    event.preventDefault()
    if (event.shiftKey) {
      unnest(this)
    } else {
      nest(this)
    }
  }

  render() {
    return (
      <div className="node">
        <ContentEditable
          className="node-self"
          html={this.state.value}
          onKeyDown={event => this.onKeyDown(event)}
          onChange={event => this.handleInput(event)}
        />
        {this.state.children.map((node, index) => {
          return <Node key={node.id} parent={this} node={node} />
        })}
      </div>
    )
  }
}
