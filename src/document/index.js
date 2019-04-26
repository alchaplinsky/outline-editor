import Node from './node'

export default class Document {
  constructor(nodes) {
    this.nodes = nodes.map((node) => {
      return new Node(node.value, node.type, node.nodes, this)
    })
  }
}
