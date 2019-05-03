A React component for Outliner editor.

**WARNING**: This package is still WIP

## Getting Started

Clone repo: `git clone git@github.com:railsware/outliner.git`

Install via yarn: `yarn add file:[PATH_TO_OUTLINER]`.

Import from `@railsware/outliner`.


## Usage

Example:

```javascript
import Document from '@railsware/outliner'
import '@railsware/outliner/src/css/index.css'

class MyComponent extends React.Component {

  constructor() {
    super()
    this.onChange = this.onChange.bind(this)
  }

  state = {
    document: {
      type: 'text',
      value: 'This is a root node',
      children: []
    }
  }

  onChange(value) {
    this.setState({
      document
    })
  }

  render() {
    return <Document document={this.state.document} onChange={this.onChange} />
  }
}
```

## Props
| Name            | Type                    | Description                                                 | Required  | Default                    |
|-----------------|-------------------------|-------------------------------------------------------------|-----------|----------------------------|
| onChange        | func                    | Passes document state when change is made                   | true      |                            |
| document        | object                  | Document tree to render                                     | true      |                            |
