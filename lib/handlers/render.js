"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyFocus = void 0;

var _caretPos = require("caret-pos");

var _tree = require("../helpers/tree");

const applyFocus = node => {
  let docState = (0, _tree.getDocument)(node).state;

  if (docState.focusedNode === node.state.id) {
    let element = node.contentEditable.current;
    let value = node.state.value;

    if (value.length === 0) {
      element.focus();
    } else {
      if (value.length < docState.caretPosition) {
        (0, _caretPos.position)(element, value.length);
      } else {
        (0, _caretPos.position)(element, docState.caretPosition);
      }
    }
  }
};

exports.applyFocus = applyFocus;