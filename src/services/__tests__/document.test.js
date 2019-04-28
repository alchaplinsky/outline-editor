import { identify, update, append } from './../document'
import { getTree } from './../tree'

import document from 'support/fixtures/document'
import Node from 'support/node'

jest.mock('shortid')

const rootNode = new Node(Object.assign({}, document))
const nodes = rootNode.getNodes()

test('#identify', () => {
  const data = identify(document)
  expect(data).toMatchObject({
    id: '0000',
    type: 'text',
    value: 'Getting started',
    focus: false,
    children: [
      {
        id: '1111',
        type: 'text',
        value: 'Hi there',
        focus: false,
        children: []
      },
      {
        id: '2222',
        type: 'text',
        value: 'The Essentials List',
        focus: false,
        children: [
          {
            id: '3333',
            type: 'text',
            value: 'Outliner nested lists',
            focus: false,
            children: [
              {
                id: '4444',
                type: 'text',
                value: 'Come back',
                focus: false,
                children: []
              }
            ]
          },
          {
            id: '5555',
            type: 'text',
            value: 'Convert lists',
            focus: false,
            children: []
          }
        ]
      }
    ]
  })
})

test('#update', () => {
  update(nodes[1], 'New text value')
  expect(nodes[1].props.node).toMatchObject({
    id: '4444',
    type: 'text',
    value: 'New text value',
    children: [],
    focus: true
  })
  expect(nodes[0].props.node.focus).toBe(false)
  expect(nodes[2].props.node.focus).toBe(false)
  expect(nodes[3].props.node.focus).toBe(false)
  expect(nodes[4].props.node.focus).toBe(false)
})

test('#append', () => {
  append(nodes[1])
  expect(getTree(rootNode)).toMatchObject({
    id: '0000',
    type: 'text',
    value: 'Getting started',
    focus: false,
    children: [
      {
        id: '1111',
        type: 'text',
        value: 'Hi there',
        focus: false,
        children: []
      },
      {
        id: '2222',
        type: 'text',
        value: 'The Essentials List',
        focus: false,
        children: [
          {
            id: '3333',
            type: 'text',
            value: 'Outliner nested lists',
            focus: false,
            children: [
              {
                id: '4444',
                type: 'text',
                value: 'New text value',
                focus: false,
                children: []
              },
              {
                id: '6666',
                type: 'text',
                value: '',
                focus: true,
                children: []
              }
            ]
          },
          {
            id: '5555',
            type: 'text',
            value: 'Convert lists',
            focus: false,
            children: []
          }
        ]
      }
    ]
  })
})
