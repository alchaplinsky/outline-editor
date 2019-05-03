import React from 'react'
import { shallow } from 'enzyme'

import Document from '../document'

jest.mock('shortid')

describe('Document', () => {
  describe('Document with no arguments', () => {
    it('renders correctly with no arguments', () => {
      const component = shallow(<Document />)

      expect(component).toMatchSnapshot()
    })

    it('renders empty root node', () => {
      expect(shallow(<Document />)).toHaveHTML(
        `<div class="document">
          <div class="node">
            <div class="node-self" contenteditable="true"></div>
          </div>
        </div>`
      )
    })
  })

  describe('Document with document argument passed in', () => {
    const document = {
      type: 'text',
      value: 'Document Title',
      children: [{
        type: 'text',
        value: 'First Item',
        children: []
      }]
    }

    it('should render document nodes', () => {
      const component = shallow(<Document document={document} />)

      expect(component).toMatchSnapshot()
    })

    it('renders document nodes', () => {
      expect(shallow(<Document document={document} />)).toHaveHTML(
        `<div class="document">
          <div class="node">
            <div class="node-self" contenteditable="true">Document Title</div>
            <div class="node">
              <div class="node-self" contenteditable="true">First Item</div>
            </div>
          </div>
        </div>`
      )
    })
  })
})
