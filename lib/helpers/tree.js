"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRoot = exports.searchTree = exports.updateDocument = exports.getTree = exports.getDocument = exports.identify = void 0;

var _shortid = _interopRequireDefault(require("shortid"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const identify = node => {
  if (!node.id) {
    node.id = _shortid.default.generate();
  }

  if (node.children && node.children.length !== 0) {
    node.children.forEach(node => {
      return identify(node);
    });
  }

  return node;
};

exports.identify = identify;

const getDocument = node => {
  return getRootNode(node).props.document;
};

exports.getDocument = getDocument;

const getTree = node => {
  return (0, _lodash.clone)(getDocument(node).state.node);
};

exports.getTree = getTree;

const updateDocument = (node, props, silent = false) => {
  const document = getDocument(node);
  document.setState(props, () => {
    if (!silent) {
      document.onChange();
    }
  });
};

exports.updateDocument = updateDocument;

const searchTree = (child, id) => {
  let grandParent = null;
  let parent = null;

  if (child.id === id) {
    return {
      grandParent,
      parent,
      child
    };
  } else {
    return traverse(parent, child, id);
  }
};

exports.searchTree = searchTree;

const isRoot = node => {
  return getRootNode(node) === node;
};

exports.isRoot = isRoot;

const getRootNode = node => {
  let parent = node.props.parent;
  if (!parent) return node;
  return getRootNode(parent);
};

const traverse = (parent, node, id) => {
  let child = (0, _lodash.find)(node.children, {
    id: id
  });
  if (child) return {
    grandParent: parent,
    parent: node,
    child: child
  };
  let result, i;

  for (i = 0; i < node.children.length; i++) {
    let child = node.children[i];
    result = traverse(node, child, id);
    if (result) break;
  }

  return result;
};