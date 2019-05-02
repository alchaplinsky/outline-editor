import React from 'react'
import ContentEditable from 'react-contenteditable'
import { position } from 'caret-pos'
import { handleUpKey, handleDownKey } from '../handlers/arrowKeys'
import { handleBackspaceKey } from '../handlers/backspaceKey'
import { handleEnterKey } from '../handlers/enterKey'
import { handleTabKey } from '../handlers/tabKey'
import { handleInput } from '../handlers/input'
import { applyFocus } from '../handlers/render'

const LINE_HEIGHT = 24 // Replace with detected line-height

export default class Node extends React.Component {
  keyMap = {
    8: handleBackspaceKey,
    9: handleTabKey,
    13: handleEnterKey,
    38: handleUpKey,
    40: handleDownKey
  }

  static getDerivedStateFromProps(props, state) {
    return state !== props.node ? props.node : null
  }

  constructor(props) {
    super(props)
    this.state = this.props.node
    this.contentEditable = React.createRef()
  }

  componentDidMount() {
    applyFocus(this)
  }

  componentDidUpdate() {
    applyFocus(this)
  }

  onKeyDown(event) {
    let handler = this.keyMap[event.keyCode]
    if (handler) return handler.call(this, event, this)
  }

  getLineHeight() {
    return LINE_HEIGHT
  }

  getCaretPosition() {
    return position(this.contentEditable.current).pos
  }

  render() {
    return (
      <div className="node">
        <ContentEditable
          innerRef={this.contentEditable}
          className="node-self"
          html={this.state.value}
          onKeyDown={event => this.onKeyDown(event)}
          onChange={event => handleInput(event, this)}
        />
        {this.state.children.map((node, index) => {
          return <Node key={node.id} parent={this} node={node} />
        })}
      </div>
    )
  }
}
