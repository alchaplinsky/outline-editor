import React from 'react'
import Node from './node'
import { identify } from '../helpers/tree'

export default class Document extends React.Component {
  constructor(props) {
    super(props)

    const document = this.props.document || this.defaultDocument()
    const node = identify(document)

    this.state = {
      focusedNode: node.id,
      caretPosition: node.value.length,
      node: node
    }
  }

  defaultDocument() {
    return { type: 'text', value: '', children: [] }
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
