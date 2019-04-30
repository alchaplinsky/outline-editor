import { clone, find } from 'lodash'

export const getRootNode = node => {
  let parent = node.props.parent
  if (!parent) return node
  return getRootNode(parent)
}

export const getDocument = node => {
  return getRootNode(node).props.document
}

export const getTree = node => {
  return clone(getDocument(node).state.node)
}

export const searchTree = (child, id) => {
  let grandParent = null
  let parent = null
  if (child.id === id) {
    return { grandParent, parent, child }
  } else {
    return traverse(parent, child, id)
  }
}

const traverse = (parent, node, id) => {
  let child = find(node.children, { id: id })
  if (child) return { grandParent: parent, parent: node, child: child }
  let result, i
  for (i = 0; i < node.children.length; i++) {
    let child = node.children[i]
    result = traverse(node, child, id)
    if (result) break
  }
  return result
}
