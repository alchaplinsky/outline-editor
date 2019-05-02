import { update } from '../services/document'

export const handleInput = (event, node) => {
  node.setState({ value: event.target.value })
  update(node, event.target.value)
}
