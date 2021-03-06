"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDownKey = exports.handleUpKey = void 0;

var _caretPos = require("caret-pos");

var _tree = require("./../helpers/tree");

const LINE_HEIGHT = 24; // Replace with detected line-height

const handleUpKey = (event, node) => {
  if (isOnFirstLine(event, node)) {
    event.preventDefault();
    goUp(node, node.getCaretPosition());
  }
};

exports.handleUpKey = handleUpKey;

const handleDownKey = (event, node) => {
  if (isOnLastLine(event, node)) {
    event.preventDefault();
    goDown(node, node.getCaretPosition());
  }
};

exports.handleDownKey = handleDownKey;

const isOnFirstLine = (event, node) => {
  return (0, _caretPos.position)(node.contentEditable.current).top <= LINE_HEIGHT;
};

const isOnLastLine = (event, node) => {
  let height = node.contentEditable.current.clientHeight;
  let top = (0, _caretPos.position)(node.contentEditable.current).top;
  return height - top <= LINE_HEIGHT;
};

const goUp = (node, position) => {
  let parent, prevNode, sibling;
  parent = getParent(node);
  if (!parent) return;
  sibling = getPrevSibling(node);

  if (sibling) {
    if (sibling.children.length > 0) {
      prevNode = getPrevSiblingChild(sibling);
    } else {
      prevNode = sibling;
    }
  } else {
    prevNode = parent.props.node;
  }

  (0, _tree.updateDocument)(node, {
    focusedNode: prevNode.id,
    caretPosition: position
  }, true);
};

const goDown = (node, position) => {
  let nextNode, children;
  children = getChildren(node);

  if (children.length > 0) {
    nextNode = children[0];
  } else {
    nextNode = getNextParentChild(node);
  }

  if (nextNode) {
    (0, _tree.updateDocument)(node, {
      focusedNode: nextNode.id,
      caretPosition: position
    }, true);
  }
};

const getParent = node => {
  return node.props.parent;
};

const getChildren = node => {
  return node.props.node.children;
};

const getPrevSibling = node => {
  let parent = getParent(node);
  if (!parent) return null;
  let children = getChildren(parent);
  return children[children.indexOf(node.props.node) - 1] || null;
};

const getPrevSiblingChild = node => {
  let lastChild = node.children[node.children.length - 1];

  if (lastChild.children.length > 0) {
    return getPrevSiblingChild(lastChild);
  } else {
    return lastChild;
  }
};

const getNextParentChild = node => {
  let parent = getParent(node);
  if (!parent) return null;
  let parentChildren = getChildren(parent);
  let index = parentChildren.indexOf(node.props.node);

  if (parentChildren[index + 1]) {
    return parentChildren[index + 1];
  } else {
    return getNextParentChild(parent);
  }
};