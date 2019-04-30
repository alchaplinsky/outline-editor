import { nest } from './../../document'

import Doc from 'support/components'
import json from 'support/fixtures/document'

jest.mock('shortid')

describe('#nest', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  let buildDoc = () => {
    return new Doc(JSON.parse(JSON.stringify(json)))
  }

  describe('node is first sibling', () => {
    let doc = buildDoc()
    nest(doc.node.children[0])

    test('node position is not updated', () => {
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

    test('keeps focus on same node', () => {
      expect(doc.state.focusedNode).toEqual('0000')
    })
  })

  describe('node without children', () => {
    let doc = buildDoc()
    nest(doc.node.children[1].children[1])

    test('nests node under sibling', () => {
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
                    id: '4444',
                    type: 'text',
                    value: 'Come back',
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
          }
        ]
      })
    })

    test('focuses nested node', () => {
      expect(doc.state.focusedNode).toEqual('5555')
    })
  })

  describe('node contains children', () => {
    let doc = buildDoc()
    nest(doc.node.children[1])

    test('node position is not updated', () => {
      expect(doc.state.node).toMatchObject({
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
          }
        ]
      })
    })

    test('focuses nested node', () => {
      expect(doc.state.focusedNode).toEqual('2222')
    })
  })
})
