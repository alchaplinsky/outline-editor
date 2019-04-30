import { unnest } from './../../document'
import Doc from 'support/components'

import json from 'support/fixtures/document'

jest.mock('shortid')

describe('#unnest', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  let buildDoc = () => {
    return new Doc(JSON.parse(JSON.stringify(json)))
  }

  describe('node is already under root', () => {
    let doc = buildDoc()
    unnest(doc.node.children[0])

    test('node is not updated', () => {
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
    unnest(doc.node.children[1].children[0].children[0])

    test('pulls node one step left', () => {
      expect(doc.state.node).toMatchObject({
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
      })
    })

    test('focuses updated node', () => {
      expect(doc.state.focusedNode).toEqual('4444')
    })
  })

  describe('node with children', () => {
    let doc = buildDoc()
    unnest(doc.node.children[1].children[0])

    test('pulls node one step left', () => {
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
                id: '5555',
                type: 'text',
                value: 'Convert lists',
                children: []
              }
            ]
          },
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
          }
        ]
      })
    })

    test('focuses updated node', () => {
      expect(doc.state.focusedNode).toEqual('3333')
    })
  })
})
