"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBackspaceKey = void 0;

var _caretPos = require("caret-pos");

var _lodash = require("lodash");

var _tree = require("./../helpers/tree");

const handleBackspaceKey = (event, node) => {
  if (node.state.children.length === 0) {
    if ((0, _caretPos.position)(node.contentEditable.current).pos === 0) {
      event.preventDefault();
      removeNode(node);
    }
  }
};

exports.handleBackspaceKey = handleBackspaceKey;

const removeNode = node => {
  const tree = (0, _tree.getTree)(node);
  const {
    parent,
    child
  } = (0, _tree.searchTree)(tree, node.props.node.id);
  let nextNode;

  if (isOnlyChild(child, parent)) {
    nextNode = parent;
  } else {
    let index = parent.children.indexOf(child);
    nextNode = getLastChild(parent.children[index - 1]);
  }

  let caretPosition = nextNode.value.length;
  nextNode.value = `${nextNode.value}${child.value}`;
  (0, _lodash.remove)(parent.children, {
    id: child.id
  });
  (0, _tree.updateDocument)(node, {
    focusedNode: nextNode.id,
    caretPosition: caretPosition,
    node: tree
  });
};

const isOnlyChild = (node, parent) => {
  return parent.children.indexOf(node) === 0;
};

const getLastChild = node => {
  if (node.children.length === 0) {
    return node;
  } else {
    return getLastChild(node.children[node.children.length - 1]);
  }
};