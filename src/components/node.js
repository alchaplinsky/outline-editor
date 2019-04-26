import React from 'react'
import ContentEditable from 'react-contenteditable'
import shortid from 'shortid'
import { clone, remove, findIndex } from 'lodash'

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
      let nodes = clone(this.props.parent.state.children)
      remove(nodes, {id: this.state.id })
      this.props.parent.setState({ children: nodes })
    }
  }

  handleEnterKey(event) {
    event.preventDefault()
    if (this.state.children.length === 0) {
      let nodes = clone(this.props.parent.state.children)
      let index = findIndex(nodes, { id: this.state.id })
      nodes.splice(index + 1, 0, this.createNode())
      this.props.parent.setState({ children: nodes })
    } else {
      let nodes = clone(this.state.children)
      nodes.unshift(this.createNode())
      this.setState({ children: nodes })
    }
  }

  handleTabKey(event) {
    event.preventDefault()
    if (event.shiftKey) {
      let parentState = this.props.parent.state
      let grandParent = parentState.parent
      let nodes = clone(grandParent.state.children)
      let index = findIndex(nodes, { id: parentState.id })
      nodes.splice(index + 1, 0, this.props.node)
      grandParent.setState({ children: nodes })
      let parentNodes = clone(parentState.children)
      remove(parentNodes, {id: this.state.id })
      this.props.parent.setState({ children: parentNodes })
    } else {
      let parentNodes = clone(this.props.parent.state.children)
      let index = findIndex(parentNodes, { id: this.state.id })
      if (index > 0) {
        remove(parentNodes, { id: this.state.id })
        parentNodes[index - 1].children.push(this.props.node)
        this.props.parent.setState({ children: parentNodes })
      }
    }
  }

  createNode() {
    return { id: shortid.generate(), type: 'text', value: '', children: [] }
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
