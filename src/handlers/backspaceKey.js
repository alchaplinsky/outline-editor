import { remove } from '../services/document'

export const handleBackspaceKey = (event, node) => {
  if (node.state.value === '' && node.state.children.length === 0) {
    event.preventDefault()
    remove(node)
  }
}
