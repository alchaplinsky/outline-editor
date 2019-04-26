export default class Node {
  constructor(value, type="text", nodes = [], parent) {
    this.parent = parent
    this.value = value
    this.type = type
    this.nodes = nodes.map((node) => {
      return new Node(node.value, node.type, node.nodes, this)
    })
  }

  focus() {
    let node = this.searchTree(this.getRoot(), 'focus', true)
    if (node) {
      node.focus = false
    }
    this.focus = true
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

  getRoot() {
    return this.getRootRecursive(this)
  }

  getRootRecursive(node) {
    let parent = node.parent
    if (parent === null) return node
    return this.getRootRecursive(parent)
  }

  searchTree(node, key, value) {
    if (node[key] === value) {
      return node
    }
    if (node.nodes && node.nodes.length > 0) {
      let result = null
      node.nodes.forEach((n) => {
        result = this.searchTree(n, key, value)
      })
      return result
    }
    return null
  }

  create() {
    let node = new Node('', 'text', [], this.parent)
    node.focus()
    return node
  }
}
