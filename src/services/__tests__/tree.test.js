import { getRootNode, getTree, searchTree } from './../tree.js'
import tree from 'support/fixtures/tree'
import Doc from 'support/components'

describe('#getTree', () => {
  const doc = new Doc(tree)
  const data = getTree(doc.node)

  test('tree should be clone of root node property', () => {
    expect(data).not.toBe(doc.state.node)
    expect(data).toMatchObject(tree)
  })
})

describe('#getRootNode', () => {
  const doc = new Doc(tree)
  const childNode1 = doc.node.children[1].children[0].children[0]
  const childNode2 = doc.node.children[1].children[1]
  const childNode3 = doc.node.children[2].children[0]

  test('should find root from any node', () => {
    expect(getRootNode(childNode1)).toBe(doc.node)
    expect(getRootNode(childNode2)).toBe(doc.node)
    expect(getRootNode(childNode2)).toBe(doc.node)
  })
})

describe('#searchTree', () => {
  const doc = new Doc(tree)
  const { grandParent, parent, child } = searchTree(doc.state.node, '1111')

  test('returns grand parent, parent and current node', () => {
    expect(grandParent).toMatchObject(doc.node.children[1].props.node)
    expect(parent).toMatchObject(doc.node.children[1].children[0].props.node)
    expect(child).toMatchObject(doc.node.children[1].children[0].children[0].props.node)
  })
})
