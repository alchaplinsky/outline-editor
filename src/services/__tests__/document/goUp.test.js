import { getTree } from './../../tree'
import { goUp } from './../../document'

import document from 'support/fixtures/identified_document'
import Node from 'support/node'

jest.mock('shortid')

describe('#goUp', () => {
  let data = JSON.parse(JSON.stringify(document))
  let rootNode = new Node(data)
  let node = rootNode.children[1].children[0].children[0]
  node.props.node.focus = true
  goUp(node)

  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('focuses node', () => {
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
              focus: true,
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
})
