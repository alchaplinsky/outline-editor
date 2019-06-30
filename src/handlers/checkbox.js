import { getTree, searchTree, updateDocument } from './../helpers/tree'

export const handleCheck = (event, node) => {
  const tree = getTree(node)
  const { child } = searchTree(tree, node.props.node.id)
  child.completed = !child.completed
  updateDocument(node, { node: tree })
}
