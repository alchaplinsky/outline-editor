import { extend, remove as _remove } from 'lodash'
import shortid from 'shortid'
import { getDocument, getTree, searchTree } from './tree'

const createNode = () => {
  return {
    id: shortid.generate(),
    type: 'text',
    value: '',
    children: []
  }
}

const modify = (node, callback) => {
  const document = getDocument(node)
  const tree = getTree(node)
  const { grandParent, parent, child } = searchTree(tree, node.props.node.id)
  const result = callback(child, parent, grandParent)
  document.setState(extend({ node: tree }, result))
}

const getParent = node => {
  return node.props.parent
}

const getChildren = node => {
  return node.props.node.children
}

const getPrevSibling = node => {
  let parent = getParent(node)
  if (!parent) return null
  let children = getChildren(parent)
  return children[children.indexOf(node.props.node) - 1] || null
}

const getNextSiblingChild = node => {
  let lastChild = node.children[node.children.length - 1]
  if (lastChild.children.length > 0) {
    return getNextSiblingChild(lastChild)
  } else {
    return lastChild
  }
}

const getNextParentChild = node => {
  let parent = getParent(node)
  if (!parent) return null
  let parentChildren = getChildren(parent)
  let index = parentChildren.indexOf(node.props.node)
  if (parentChildren[index + 1]) {
    return parentChildren[index + 1]
  } else {
    return getNextParentChild(parent)
  }
}

export const identify = node => {
  node.id = shortid.generate()
  if (node.children && node.children.length !== 0) {
    node.children.forEach((node) => {
      return identify(node)
    })
  }
  return node
}

export const update = (node, value) => {
  modify(node, (child) => {
    let caretPosition = node.getCaretPosition()
    child.value = value
    return { focusedNode: child.id, caretPosition: caretPosition }
  })
}

export const append = node => {
  modify(node, (child, parent) => {
    let newNode = createNode()
    parent.children.splice(parent.children.indexOf(child) + 1, 0, newNode)
    return { focusedNode: newNode.id, caretPosition: 0 }
  })
}

export const prepend = node => {
  modify(node, (child) => {
    let newNode = createNode()
    child.children.unshift(newNode)
    return { focusedNode: newNode.id, caretPosition: 0 }
  })
}

export const remove = node => {
  modify(node, (child, parent) => {
    let index = parent.children.indexOf(child)
    let nextNode = index === 0 ? parent : parent.children[index - 1]
    _remove(parent.children, { id: child.id })
    return { focusedNode: nextNode.id, caretPosition: nextNode.value.length }
  })
}

export const nest = node => {
  modify(node, (child, parent) => {
    let caretPosition = node.getCaretPosition()
    if (!parent) return
    let siblings = parent.children
    let newParent = siblings[siblings.indexOf(child) - 1]
    if (!newParent) return
    newParent.children.push(child)
    _remove(siblings, { id: child.id })
    return { focusedNode: child.id, caretPosition: caretPosition }
  })
}

export const unnest = node => {
  modify(node, (child, parent, grandParent) => {
    let caretPosition = node.getCaretPosition()
    if (parent && grandParent) {
      _remove(parent.children, { id: child.id })
      let index = grandParent.children.indexOf(parent)
      grandParent.children.splice(index + 1, 0, child)
      return { focusedNode: child.id, caretPosition: caretPosition }
    }
  })
}

export const goUp = node => {
  let parent = getParent(node)
  let caretPosition = node.getCaretPosition()
  if (parent) {
    let prevNode
    let sibling = getPrevSibling(node)
    if (sibling) {
      if (sibling.children.length > 0) {
        prevNode = getNextSiblingChild(sibling)
      } else {
        prevNode = sibling
      }
    } else {
      prevNode = parent.props.node
    }
    getDocument(node).setState({
      focusedNode: prevNode.id,
      caretPosition: caretPosition
    })
  }
}

export const goDown = node => {
  let nextNode
  let children = getChildren(node)
  let caretPosition = node.getCaretPosition()
  if (children.length > 0) {
    nextNode = children[0]
  } else {
    nextNode = getNextParentChild(node)
  }
  if (nextNode) {
    getDocument(node).setState({
      focusedNode: nextNode.id,
      caretPosition: caretPosition
    })
  }
}
