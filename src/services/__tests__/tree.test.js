import { getRootNode, getTree, searchTree } from './../tree.js'
import tree from 'support/fixtures/tree'
import Node from 'support/node'

const rootNode = new Node(tree)
const nodes = rootNode.getNodes()

test('#getTree', () => {
  const data = getTree(rootNode)
  expect(data).not.toBe(rootNode.props.node)
  expect(data).toMatchObject(tree)
})

test('#getRootNode', () => {
  expect(getRootNode(nodes[2])).toBe(rootNode)
  expect(getRootNode(nodes[5])).toBe(rootNode)
  expect(getRootNode(nodes[3])).toBe(rootNode)
})

test('#searchTree', () => {
  const { grandParent, parent, child } = searchTree(rootNode.props.node, '1111')
  expect(grandParent).toMatchObject(nodes[4].props.node)
  expect(parent).toMatchObject(nodes[2].props.node)
  expect(child).toMatchObject(nodes[1].props.node)
})
