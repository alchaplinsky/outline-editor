import { identify } from './../../document'

import document from 'support/fixtures/unidentified'

jest.mock('shortid')

describe('#identify', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('adds ids and focus: false', () => {
    expect(identify(document)).toEqual({
      id: '6666',
      type: 'text',
      value: 'Getting started',
      children: [
        {
          id: '7777',
          type: 'text',
          value: 'Hi there',
          children: []
        },
        {
          id: '8888',
          type: 'text',
          value: 'The Essentials List',
          children: [
            {
              id: '9999',
              type: 'text',
              value: 'Outliner nested lists',
              children: [
                {
                  id: '10101010',
                  type: 'text',
                  value: 'Come back',
                  children: []
                }
              ]
            },
            {
              id: '11111111',
              type: 'text',
              value: 'Convert lists',
              children: []
            }
          ]
        }
      ]
    })
  })
})
