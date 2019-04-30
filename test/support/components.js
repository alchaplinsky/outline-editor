export default class Doc {

  constructor(node) {
    this.state = {
      focusedNode: '0000',
      node: node
    }
    this.node = new Node({ node: node, document: this, parent: null })
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state)
  }
}

class Node {
  constructor({ node, document, parent }) {
    let nodes = []
    this.children = node.children.map(child => {
      return new Node({ node: child, parent: this, document: null })
    })
    this.props = { node: node, parent: parent, document: document }
  }

  setState() {
    return true
  }
}
