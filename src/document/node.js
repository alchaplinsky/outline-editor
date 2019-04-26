export default class Node {
  constructor(value, type="text", nodes = [], parent) {
    this.parent = parent
    this.value = value
    this.type = type
    this.nodes = nodes.map((node) => {
      return new Node(node.value, node.type, node.nodes, this)
    })
  }

  nest() {
    let index = this.getIndex()
    if (index !== 0) {
      let newParent = this.parent.nodes[index - 1]
      newParent.nodes.push(this)
      this.parent.nodes.splice(index, 1)
      this.parent = newParent
    }
  }

  unnest() {
    let index = this.getIndex()
    let newParent = this.parent.parent
    if (newParent) {
      let parentIndex = newParent.nodes.indexOf(this.parent)
      newParent.nodes.splice(parentIndex + 1, 0, this)
      this.parent.nodes.splice(index, 1)
      this.parent = newParent
    }
  }

  appendSibling() {
    this.parent.nodes.splice(this.getIndex() + 1, 0, this.create())
  }

  prependSibling() {
    this.parent.nodes.splice(this.getIndex(), 0, this.create())
  }

  remove() {
    this.parent.nodes.splice(this.getIndex(), 1)
  }

  getIndex() {
    return this.parent.nodes.indexOf(this)
  }

  create() {
    return new Node('', 'text', [], this.parent)
  }
}
