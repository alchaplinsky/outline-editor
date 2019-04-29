export default class Node {
  constructor(node, parent = null) {
    let nodes = []
    this.children = node.children.map(child => new Node(child, this))
    this.props = { node: node, parent: parent }
  }

  setState() {
    return true
  }
}
