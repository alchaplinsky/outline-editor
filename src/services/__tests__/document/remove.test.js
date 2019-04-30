import { remove } from './../../document'
import Doc from 'support/components'

import json from 'support/fixtures/document'

jest.mock('shortid')

describe('#remove', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  let buildDoc = () => {
    return new Doc(JSON.parse(JSON.stringify(json)))
  }

  describe('node without children', () => {
    let doc = buildDoc()
    remove(doc.node.children[1].children[0].children[0])

    test('removes node', () => {
      expect(doc.state.node).toEqual({
        id: '0000',
        type: 'text',
        value: 'Getting started',
        children: [
          {
            id: '1111',
            type: 'text',
            value: 'Hi there',
            children: []
          },
          {
            id: '2222',
            type: 'text',
            value: 'The Essentials List',
            children: [
              {
                id: '3333',
                type: 'text',
                value: 'Outliner nested lists',
                children: []
              },
              {
                id: '5555',
                type: 'text',
                value: 'Convert lists',
                children: []
              }
            ]
          }
        ]
      })
    })

    test('focuses pervious node', () => {
      expect(doc.state.focusedNode).toEqual('3333')
    })
  })

  describe('node with children', () => {
    let doc = buildDoc()
    remove(doc.node.children[1])

    test('removes node with all children', () => {
      expect(doc.state.node).toEqual({
        id: '0000',
        type: 'text',
        value: 'Getting started',
        children: [
          {
            id: '1111',
            type: 'text',
            value: 'Hi there',
            children: []
          }
        ]
      })
    })

    test('focuses pervious node', () => {
      expect(doc.state.focusedNode).toEqual('1111')
    })
  })
})
