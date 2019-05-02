import { getDocument, updateDocument, getTree, searchTree } from './../services/tree'

export const handleInput = (event, node) => {
  const tree = getTree(node)
  const { child } = searchTree(tree, node.props.node.id)

  let caretPosition = node.getCaretPosition()
  child.value = event.target.value
  if (getDocument(node).state.focusedNode === child.id) {
    updateDocument(node, { caretPosition: caretPosition, node: tree })
  } else {
    updateDocument(node, { node: tree })
  }
}
