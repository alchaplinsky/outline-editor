import { goUp } from './../../document'
import Doc from 'support/components'

import json from 'support/fixtures/document'

jest.mock('shortid')

describe('#goUp', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  let buildDoc = () => {
    return new Doc(JSON.parse(JSON.stringify(json)))
  }

  describe('previous sibling exists', () => {
    let doc = buildDoc()
    let node = doc.node.children[1]

    test('focuses previous sibling', () => {
      goUp(node)
      expect(doc.state.focusedNode).toEqual('1111')
    })
  })

  describe('no previous siblings', () => {
    describe('no parent exists', () => {
      let doc = buildDoc()

      test('keeps focus on same node', () => {
        goUp(doc.node)
        expect(doc.state.focusedNode).toEqual('0000')
      })
    })

    describe('parent exist', () => {
      let doc = buildDoc()
      let node = doc.node.children[1].children[0].children[0]

      test('focuses parent node', () => {
        goUp(node)
        expect(doc.state.focusedNode).toEqual('3333')
      })
    })
  })
})
