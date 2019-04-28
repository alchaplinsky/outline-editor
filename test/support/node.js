let nodes = []
export default class Node {
  constructor(node, parent = null) {
    this._nodes = []
    node.children.forEach(child => nodes.push(new Node(child, this)))
    this.props = { node: node, parent: parent }
  }

  setState() {
    return true
  }

  getNodes() {
    return nodes
  }
}
