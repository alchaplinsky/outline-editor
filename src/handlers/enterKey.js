import shortid from 'shortid'
import { position } from 'caret-pos'

import { updateDocument, getTree, searchTree } from './../helpers/tree'

export const handleEnterKey = (event, node) => {
  event.preventDefault()
  addNode(node, 'append')
}

const addNode = (node) => {
  const { prevNodeValue, nextNodeValue } = splitValue(node)
  const newNode = createNode(nextNodeValue)

  const tree = getTree(node)
  const { parent, child } = searchTree(tree, node.props.node.id)

  if (parent && node.props.node.children.length === 0) {
    parent.children.splice(parent.children.indexOf(child) + 1, 0, newNode)
  } else {
    child.children.unshift(newNode)
  }
  child.value = prevNodeValue
  updateDocument(node, { focusedNode: newNode.id, caretPosition: 0, node: tree })
}

const splitValue = (node) => {
  let pos = position(node.contentEditable.current).pos
  let value = node.state.value.replace(/&nbsp;/g, ' ')
  return {
    prevNodeValue: value.slice(0, pos),
    nextNodeValue: value.slice(pos, value.length)
  }
}

const createNode = value => {
  return {
    id: shortid.generate(),
    type: 'text',
    value: value,
    completed: false,
    children: []
  }
}
