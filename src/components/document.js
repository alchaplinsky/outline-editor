import React from 'react'
import Node from './node'
import { identify } from '../helpers/tree'

export default class Document extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      focusedNode: null,
      caretPosition: null,
      node: identify(this.props.document)
    }
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.state.node)
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
