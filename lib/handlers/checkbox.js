"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCheck = void 0;

var _tree = require("./../helpers/tree");

const handleCheck = (event, node) => {
  const tree = (0, _tree.getTree)(node);
  const {
    child
  } = (0, _tree.searchTree)(tree, node.props.node.id);
  child.completed = !child.completed;
  (0, _tree.updateDocument)(node, {
    node: tree
  });
};

exports.handleCheck = handleCheck;