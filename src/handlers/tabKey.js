import { remove } from 'lodash'
import { updateDocument, getTree, searchTree } from './../services/tree'

export const handleTabKey = (event, node) => {
  event.preventDefault()
  return event.shiftKey ? unnest(node) : nest(node)
}

const nest = (node) => {
  const tree = getTree(node)
  const { parent, child } = searchTree(tree, node.props.node.id)

  if (!parent) return

  let siblings = parent.children
  let newParent = siblings[siblings.indexOf(child) - 1]
  if (!newParent) return

  newParent.children.push(child)
  remove(siblings, { id: child.id })

  updateDocument(node, {
    focusedNode: child.id,
    caretPosition: node.getCaretPosition()
  })
}

const unnest = (node) => {
  const tree = getTree(node)
  const { grandParent, parent, child } = searchTree(tree, node.props.node.id)

  if (parent && grandParent) {
    remove(parent.children, { id: child.id })
    let index = grandParent.children.indexOf(parent)
    grandParent.children.splice(index + 1, 0, child)

    updateDocument(node, {
      focusedNode: child.id,
      caretPosition: node.getCaretPosition()
    })
  }
}
