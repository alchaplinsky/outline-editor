import _ from 'lodash'
import shortid from 'shortid'
import { getRootNode, getTree, searchTree } from './tree'

const createNode = () => {
  return { id: shortid.generate(), type: 'text', value: '', children: [] }
}

const modify = (node, callback) => {
  const rootNode = getRootNode(node)
  const tree = getTree(rootNode)
  const { grandParent, parent, child } = searchTree(tree, node.state.id)
  callback(child, parent, grandParent)
  rootNode.setState(tree)
}

export const identify = (node) => {
  node.id = shortid.generate()
  if (node.children && node.children.length !== 0) {
    node.children.forEach((node) => {
      return identify(node)
    })
  }
  return node
}

export const append = node => {
  modify(node, (child, parent) => {
    parent.children.splice(parent.children.indexOf(child) + 1, 0, createNode())
  })
}

export const prepend = node => {
  modify(node, (child) => {
    child.children.unshift(createNode())
  })
}

export const remove = node => {
  modify(node, (child, parent) => {
    _.remove(parent.children, { id: child.id })
  })
}

export const nest = (node) => {
  modify(node, (child, parent) => {
    if (!parent) return
    let siblings = parent.children
    let newParent = siblings[siblings.indexOf(child) - 1]
    if (!newParent) return
    newParent.children.push(child)
    _.remove(siblings, { id: child.id })
  })
}

export const unnest = (node) => {
  modify(node, (child, parent, grandParent) => {
    if (parent && grandParent) {
      _.remove(parent.children, { id: child.id })
      let index = grandParent.children.indexOf(parent)
      grandParent.children.splice(index + 1, 0, child)
    }
  })
}
