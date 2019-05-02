import { getDocument } from '../services/tree'
import { position } from 'caret-pos'

export const applyFocus = node => {
  let docState = getDocument(node).state

  if (docState.focusedNode === node.state.id) {
    let element = node.contentEditable.current
    let value = node.state.value

    if (value.length === 0) {
      element.focus()
    } else {
      if (value.length < docState.caretPosition) {
        position(element, value.length)
      } else {
        position(element, docState.caretPosition)
      }
    }
  }
}
