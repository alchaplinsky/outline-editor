import { update } from './../../document'

import Doc from 'support/components'
import json from 'support/fixtures/document'

jest.mock('shortid')

describe('#update', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  let buildDoc = () => {
    return new Doc(JSON.parse(JSON.stringify(json)))
  }

  let doc = buildDoc()
  let node = doc.node.children[1].children[0].children[0]
  update(node, 'New text value')

  test('sets new value to node', () => {
    expect(node.props.node).toEqual({
      id: '4444',
      type: 'text',
      value: 'New text value',
      children: []
    })
  })

  test('sets focus to same node', () => {
    expect(doc.state.focusedNode).toEqual('0000')
  })
})
