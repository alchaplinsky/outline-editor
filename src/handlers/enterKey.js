import { append, prepend } from '../services/document'

export const handleEnterKey = (event, node) => {
  event.preventDefault()
  if (node.state.children.length === 0) {
    append(node)
  } else {
    prepend(node)
  }
}
