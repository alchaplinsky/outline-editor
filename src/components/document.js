import React from 'react'
import Node from './node'
import { identify } from '../services/document'

export default class Document extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      focusedNode: null,
      caretPosition: null,
      node: identify(window.DOC)
    }
  }

  render() {
    return (
      <div className="document">
        <Node node={this.state.node} document={this} />
      </div>
    )
  }
}
