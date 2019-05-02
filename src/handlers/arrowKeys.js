import { position } from 'caret-pos'
import { goUp, goDown } from './../services/document'

export const handleUpKey = (event, node) => {
  if (isOnFirstLine(event, node)) {
    event.preventDefault()
    goUp(node, node.getCaretPosition())
  }
}

export const handleDownKey = (event, node) => {
  if (isOnLastLine(event, node)) {
    event.preventDefault()
    goDown(node, node.getCaretPosition())
  }
}

const isOnFirstLine = (event, node) => {
  return position(node.contentEditable.current).top <= node.getLineHeight()
}

const isOnLastLine = (event, node) => {
  let height = node.contentEditable.current.clientHeight
  let top = position(node.contentEditable.current).top
  return height - top <= node.getLineHeight()
}
