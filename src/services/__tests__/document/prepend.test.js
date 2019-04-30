import { prepend } from './../../document'

import Doc from 'support/components'
import json from 'support/fixtures/document'

jest.mock('shortid')

describe('#prepend', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  let buildDoc = () => {
    return new Doc(JSON.parse(JSON.stringify(json)))
  }

  describe('node contains no children', () => {
    let doc = buildDoc()
    prepend(doc.node.children[0])

    test('prepends node to children', () => {
      expect(doc.state.node).toEqual({
        id: '0000',
        type: 'text',
        value: 'Getting started',
        children: [
          {
            id: '1111',
            type: 'text',
            value: 'Hi there',
            children: [
              {
                id: '6666',
                type: 'text',
                value: '',
                children: []
              }
            ]
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
                children: [
                  {
                    id: '4444',
                    type: 'text',
                    value: 'Come back',
                    children: []
                  }
                ]
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

    test('focuses new node', () => {
      expect(doc.state.focusedNode).toEqual('6666')
    })
  })

  describe('node already contains children', () => {
    let doc = buildDoc()
    prepend(doc.node.children[1].children[0])

    test('prepends node to children', () => {
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
                children: [
                  {
                    id: '7777',
                    type: 'text',
                    value: '',
                    children: []
                  },
                  {
                    id: '4444',
                    type: 'text',
                    value: 'Come back',
                    children: []
                  }
                ]
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

    test('focuses new node', () => {
      expect(doc.state.focusedNode).toEqual('7777')
    })
  })
})
