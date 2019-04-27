import _ from 'lodash'
import shortid from 'shortid'
import { getRootNode, getTree, searchTree } from './tree'

const createNode = () => {
  return { id: shortid.generate(), type: 'text', value: '', children: [] }
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
  const rootNode = getRootNode(node)
  const tree = getTree(rootNode)
  const { parent, child } = searchTree(tree, node.state.id)
  parent.children.splice(parent.children.indexOf(child) + 1, 0, createNode())
  rootNode.setState(tree)
}

export const prepend = node => {
  const rootNode = getRootNode(node)
  const tree = getTree(rootNode)
  const { child } = searchTree(tree, node.state.id)
  child.children.unshift(createNode())
  rootNode.setState(tree)
}

export const remove = node => {
  const rootNode = getRootNode(node)
  const tree = getTree(rootNode)
  const { parent, child } = searchTree(tree, node.state.id)

  if (parent) {
    _.remove(parent.children, { id: child.id })
    rootNode.setState(tree)
  }
}

export const nest = (node) => {
  const rootNode = getRootNode(node)
  const tree = getTree(rootNode)
  const { parent, child } = searchTree(tree, node.state.id)
  if (!parent) return
  let siblings = parent.children
  let newParent = siblings[siblings.indexOf(child) - 1]
  if (!newParent) return
  newParent.children.push(child)
  _.remove(siblings, { id: child.id })
  rootNode.setState(tree)
}

export const unnest = (node) => {
  const rootNode = getRootNode(node)
  const tree = getTree(rootNode)
  const { grandParent, parent, child } = searchTree(tree, node.state.id)
  if (parent && grandParent) {
    _.remove(parent.children, { id: child.id })
    grandParent.children.splice(grandParent.children.indexOf(parent)+1, 0, child)
    rootNode.setState(tree)
  }
}
