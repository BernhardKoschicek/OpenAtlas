"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateElasticWindowLayout = updateElasticWindowLayout;
var _actionTypes = _interopRequireDefault(require("./action-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** */
function updateElasticWindowLayout(windowId, payload) {
  return {
    payload: payload,
    type: _actionTypes["default"].UPDATE_ELASTIC_WINDOW_LAYOUT,
    windowId: windowId
  };
}