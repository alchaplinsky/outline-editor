"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _node = _interopRequireDefault(require("./node"));

var _tree = require("../helpers/tree");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Document extends _react.default.Component {
  constructor(props) {
    super(props);
    const document = this.props.document || this.defaultDocument();
    const node = (0, _tree.identify)(document);
    this.state = {
      focusedNode: node.id,
      caretPosition: node.value.length,
      node: node
    };
  }

  defaultDocument() {
    return {
      type: 'text',
      value: '',
      children: [],
      completed: false
    };
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.state.node);
    }
  }

  render() {
    return _react.default.createElement("div", {
      className: "document"
    }, _react.default.createElement(_node.default, {
      node: this.state.node,
      document: this
    }));
  }

}

exports.default = Document;