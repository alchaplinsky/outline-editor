import { getTree } from './../../tree'
import { update } from './../../document'

import document from 'support/fixtures/identified_document'
import Node from 'support/node'

jest.mock('shortid')

describe('#update', () => {
  let data = JSON.parse(JSON.stringify(document))
  let rootNode = new Node(data)
  let node = rootNode.children[1].children[0].children[0]
  update(node, 'New text value')

  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('sets new value to node', () => {
    expect(node.props.node).toMatchObject({
      id: '4444',
      type: 'text',
      value: 'New text value',
      children: [],
      focus: true
    })
  })

  test('updates all nodes focus to false', () => {
    expect(rootNode.children[0].props.node.focus).toBe(false)
    expect(rootNode.children[1].props.node.focus).toBe(false)
    expect(rootNode.children[1].children[0].props.node.focus).toBe(false)
    expect(rootNode.children[1].children[1].props.node.focus).toBe(false)
  })
})
