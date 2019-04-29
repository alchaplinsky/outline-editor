import { getRootNode, getTree, searchTree } from './../tree.js'
import tree from 'support/fixtures/tree'
import Node from 'support/node'

describe('#getTree', () => {
  const rootNode = new Node(tree)
  const data = getTree(rootNode)

  test('tree should be clone of root node property', () => {
    expect(data).not.toBe(rootNode.props.node)
    expect(data).toMatchObject(tree)
  })
})

describe('#getRootNode', () => {
  const rootNode = new Node(tree)
  const childNode1 = rootNode.children[1].children[0].children[0]
  const childNode2 = rootNode.children[1].children[1]
  const childNode3 = rootNode.children[2].children[0]

  test('should find root from any node', () => {
    expect(getRootNode(childNode1)).toBe(rootNode)
    expect(getRootNode(childNode2)).toBe(rootNode)
    expect(getRootNode(childNode2)).toBe(rootNode)
  })
})

describe('#searchTree', () => {
  const rootNode = new Node(tree)
  const { grandParent, parent, child } = searchTree(rootNode.props.node, '1111')

  test('returns grand parent, parent and current node', () => {
    expect(grandParent).toMatchObject(rootNode.children[1].props.node)
    expect(parent).toMatchObject(rootNode.children[1].children[0].props.node)
    expect(child).toMatchObject(rootNode.children[1].children[0].children[0].props.node)
  })
})
