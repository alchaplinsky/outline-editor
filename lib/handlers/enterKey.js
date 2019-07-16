"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleEnterKey = void 0;

var _shortid = _interopRequireDefault(require("shortid"));

var _caretPos = require("caret-pos");

var _tree = require("./../helpers/tree");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleEnterKey = (event, node) => {
  event.preventDefault();
  addNode(node, 'append');
};

exports.handleEnterKey = handleEnterKey;

const addNode = node => {
  const {
    prevNodeValue,
    nextNodeValue
  } = splitValue(node);
  const newNode = createNode(nextNodeValue);
  const tree = (0, _tree.getTree)(node);
  const {
    parent,
    child
  } = (0, _tree.searchTree)(tree, node.props.node.id);

  if (parent && node.props.node.children.length === 0) {
    parent.children.splice(parent.children.indexOf(child) + 1, 0, newNode);
  } else {
    child.children.unshift(newNode);
  }

  child.value = prevNodeValue;
  (0, _tree.updateDocument)(node, {
    focusedNode: newNode.id,
    caretPosition: 0,
    node: tree
  });
};

const splitValue = node => {
  let pos = (0, _caretPos.position)(node.contentEditable.current).pos;
  let value = node.state.value.replace(/&nbsp;/g, ' ');
  return {
    prevNodeValue: value.slice(0, pos),
    nextNodeValue: value.slice(pos, value.length)
  };
};

const createNode = value => {
  return {
    id: _shortid.default.generate(),
    type: 'text',
    value: value,
    completed: false,
    children: []
  };
};