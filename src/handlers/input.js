import { getDocument, updateDocument, getTree, searchTree } from './../helpers/tree'

export const handleInput = (event, node) => {
  const tree = getTree(node)
  const { child } = searchTree(tree, node.props.node.id)
  child.value = event.target.value

  let caretPosition = node.getCaretPosition()
  updateDocument(node, { caretPosition: caretPosition, node: tree })
}
