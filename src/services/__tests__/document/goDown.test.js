import { goDown } from './../../document'
import Doc from 'support/components'

import json from 'support/fixtures/document'

jest.mock('shortid')

describe('#goDown', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  let buildDoc = () => {
    return new Doc(JSON.parse(JSON.stringify(json)))
  }

  describe('node contains children', () => {
    let doc = buildDoc()
    let node = doc.node.children[1]

    test('focuses first child', () => {
      goDown(node, 0)
      expect(doc.state.focusedNode).toEqual('3333')
    })
  })

  describe('node has no children', () => {
    let doc = buildDoc()
    let node = doc.node.children[0]

    test('focuses next sibling', () => {
      goDown(node, 0)
      expect(doc.state.focusedNode).toEqual('2222')
    })
  })

  describe('node has no children and no siblings', () => {
    let doc = buildDoc()
    let node = doc.node.children[1].children[0].children[0]

    test('focuses first sibling of closes parent with siblings', () => {
      goDown(node, 0)
      expect(doc.state.focusedNode).toEqual('5555')
    })
  })
})
