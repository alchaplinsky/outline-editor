"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleTabKey = void 0;

var _lodash = require("lodash");

var _tree = require("./../helpers/tree");

const handleTabKey = (event, node) => {
  event.preventDefault();
  return event.shiftKey ? unnest(node) : nest(node);
};

exports.handleTabKey = handleTabKey;

const nest = node => {
  const tree = (0, _tree.getTree)(node);
  const {
    parent,
    child
  } = (0, _tree.searchTree)(tree, node.props.node.id);
  if (!parent) return;
  let siblings = parent.children;
  let newParent = siblings[siblings.indexOf(child) - 1];
  if (!newParent) return;
  newParent.children.push(child);
  (0, _lodash.remove)(siblings, {
    id: child.id
  });
  (0, _tree.updateDocument)(node, {
    focusedNode: child.id,
    caretPosition: node.getCaretPosition()
  });
};

const unnest = node => {
  const tree = (0, _tree.getTree)(node);
  const {
    grandParent,
    parent,
    child
  } = (0, _tree.searchTree)(tree, node.props.node.id);

  if (parent && grandParent) {
    (0, _lodash.remove)(parent.children, {
      id: child.id
    });
    let index = grandParent.children.indexOf(parent);
    grandParent.children.splice(index + 1, 0, child);
    (0, _tree.updateDocument)(node, {
      focusedNode: child.id,
      caretPosition: node.getCaretPosition()
    });
  }
};