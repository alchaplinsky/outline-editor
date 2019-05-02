import { nest, unnest } from '../services/document'

export const handleTabKey = (event, node) => {
  event.preventDefault()
  if (event.shiftKey) {
    unnest(node)
  } else {
    nest(node)
  }
}
