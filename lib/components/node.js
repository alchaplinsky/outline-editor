"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactContenteditable = _interopRequireDefault(require("react-contenteditable"));

var _caretPos = require("caret-pos");

var _tree = require("../helpers/tree");

var _arrowKeys = require("../handlers/arrowKeys");

var _backspaceKey = require("../handlers/backspaceKey");

var _enterKey = require("../handlers/enterKey");

var _tabKey = require("../handlers/tabKey");

var _input = require("../handlers/input");

var _focus = require("../handlers/focus");

var _checkbox = require("../handlers/checkbox");

var _render = require("../handlers/render");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Node extends _react.default.Component {
  static getDerivedStateFromProps(props, state) {
    return state !== props.node ? props.node : null;
  }

  constructor(props) {
    super(props);

    _defineProperty(this, "keyMap", {
      8: _backspaceKey.handleBackspaceKey,
      9: _tabKey.handleTabKey,
      13: _enterKey.handleEnterKey,
      38: _arrowKeys.handleUpKey,
      40: _arrowKeys.handleDownKey
    });

    this.state = this.props.node;
    this.contentEditable = _react.default.createRef();
  }

  componentDidMount() {
    (0, _render.applyFocus)(this);
  }

  componentDidUpdate() {
    (0, _render.applyFocus)(this);
  }

  onKeyDown(event) {
    let handler = this.keyMap[event.keyCode];
    if (handler) return handler.call(this, event, this);
  }

  getCaretPosition() {
    return (0, _caretPos.position)(this.contentEditable.current).pos;
  }

  classNames() {
    let classNames = ['node'];
    if ((0, _tree.isRoot)(this)) classNames.push('is-root');
    return classNames.join(' ');
  }

  onCheck(event) {
    this.setState({
      completed: !this.state.completed
    });
    (0, _checkbox.handleCheck)(event, this);
  }

  render() {
    return _react.default.createElement("div", {
      className: this.classNames()
    }, _react.default.createElement("input", {
      type: "checkbox",
      checked: this.state.completed,
      onChange: event => this.onCheck(event)
    }), _react.default.createElement(_reactContenteditable.default, {
      innerRef: this.contentEditable,
      className: "node-self",
      html: this.state.value,
      onKeyDown: event => this.onKeyDown(event),
      onFocus: event => (0, _focus.handleFocus)(event, this),
      onChange: event => (0, _input.handleInput)(event, this)
    }), this.state.children.map((node, index) => {
      return _react.default.createElement(Node, {
        key: node.id,
        parent: this,
        node: node
      });
    }));
  }

}

exports.default = Node;