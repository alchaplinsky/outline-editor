import { clone, find } from 'lodash'

export const getRootNode = node => {
  let parent = node.props.parent
  if (!parent) return node
  return getRootNode(parent)
}

export const getTree = node => {
  return clone(node.props.node)
}

export const searchTree = (node, id) => {
  let grandParent = null
  let parent = null
  if (node.id === id) {
    return { grandParent, parent, node }
  } else {
    return traverse(parent, node, id)
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
