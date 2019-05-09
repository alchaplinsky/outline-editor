import { updateDocument } from './../helpers/tree'

export const handleFocus = (event, node) => {
  let caretPosition = node.getCaretPosition()
  updateDocument(node, {
    focusedNode: node.props.node.id,
    caretPosition: caretPosition
  })
}
