"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findDOMNode;
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
/**
 * Return if a node is a DOM node. Else will return by `findDOMNode`
 */
function findDOMNode(node) {
  if (node instanceof HTMLElement) {
    return node;
  }
  if (node instanceof _react.default.Component) {
    return _reactDom.default.findDOMNode(node);
  }
  return null;
}