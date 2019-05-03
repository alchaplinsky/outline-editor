import { position } from 'caret-pos'
import { remove } from 'lodash'
import { updateDocument, getTree, searchTree } from './../helpers/tree'

export const handleBackspaceKey = (event, node) => {
  if (node.state.children.length === 0) {
    if (position(node.contentEditable.current).pos === 0) {
      event.preventDefault()
      removeNode(node)
    }
  }
}

const removeNode = (node) => {
  const tree = getTree(node)
  const { parent, child } = searchTree(tree, node.props.node.id)

  let nextNode
  if (isOnlyChild(child, parent)) {
    nextNode = parent
  } else {
    let index = parent.children.indexOf(child)
    nextNode = getLastChild(parent.children[index - 1])
  }

  let caretPosition = nextNode.value.length
  nextNode.value = `${nextNode.value}${child.value}`
  remove(parent.children, { id: child.id })

  updateDocument(node, {
    focusedNode: nextNode.id,
    caretPosition: caretPosition,
    node: tree
  })
}

const isOnlyChild = (node, parent) => {
  return parent.children.indexOf(node) === 0
}

const getLastChild = (node) => {
  if (node.children.length === 0) {
    return node
  } else {
    return getLastChild(node.children[node.children.length - 1])
  }
}
