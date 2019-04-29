import { identify } from './../../document'

import document from 'support/fixtures/document'

jest.mock('shortid')

describe('#identify', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('adds ids and focus: false', () => {
    expect(identify(document)).toMatchObject({
      id: '6666',
      type: 'text',
      value: 'Getting started',
      focus: false,
      children: [
        {
          id: '7777',
          type: 'text',
          value: 'Hi there',
          focus: false,
          children: []
        },
        {
          id: '8888',
          type: 'text',
          value: 'The Essentials List',
          focus: false,
          children: [
            {
              id: '9999',
              type: 'text',
              value: 'Outliner nested lists',
              focus: false,
              children: [
                {
                  id: '10101010',
                  type: 'text',
                  value: 'Come back',
                  focus: false,
                  children: []
                }
              ]
            },
            {
              id: '11111111',
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
