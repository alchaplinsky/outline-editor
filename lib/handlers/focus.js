"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleFocus = void 0;

var _tree = require("./../helpers/tree");

const handleFocus = (event, node) => {
  let caretPosition = node.getCaretPosition();
  (0, _tree.updateDocument)(node, {
    focusedNode: node.props.node.id,
    caretPosition: caretPosition
  }, true);
};

exports.handleFocus = handleFocus;