import { getTree } from './../../tree'
import { unnest } from './../../document'

import document from 'support/fixtures/identified_document'
import Node from 'support/node'

jest.mock('shortid')

describe('#unnest', () => {
  let data = JSON.parse(JSON.stringify(document))
  let rootNode = new Node(data)
  unnest(rootNode.children[1].children[0].children[0])

  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('pulls node one step left', () => {
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
              children: []
            },
            {
              id: '4444',
              type: 'text',
              value: 'Come back',
              focus: true,
              children: []
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
})
