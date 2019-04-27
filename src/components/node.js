import React from 'react'
import ContentEditable from 'react-contenteditable'
import { nest, unnest, remove, append, prepend } from '../services/document'

export default class Node extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      parent: this.props.parent,
      id: this.props.node.id,
      type: this.props.node.type,
      value: this.props.node.value,
      children: this.props.node.children
    }
  }

  handleInput(event) {
    this.setState({ value: event.target.value })
  }

  onKeyDown(event, node) {
    switch (event.keyCode) {
      case 8:
        this.handleBackspaceKey(event)
        break;
      case 9:
        this.handleTabKey(event)
        break;
      case 13:
        this.handleEnterKey(event)
        break;
      case 38:
        this.handleUpKey(event)
        break;
      case 40:
        this.handleDownKey(event)
        break;
      default:
        break;
    }
  }

  handleUpKey() {}
  handleDownKey() {}

  handleBackspaceKey(event) {
    if (this.state.value === '') {
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
