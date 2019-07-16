"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleInput = void 0;

var _tree = require("./../helpers/tree");

const handleInput = (event, node) => {
  const tree = (0, _tree.getTree)(node);
  const {
    child
  } = (0, _tree.searchTree)(tree, node.props.node.id);
  child.value = event.target.value;
  let caretPosition = node.getCaretPosition();
  (0, _tree.updateDocument)(node, {
    caretPosition: caretPosition,
    node: tree
  });
};

exports.handleInput = handleInput;