"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLayers = updateLayers;
var _actionTypes = _interopRequireDefault(require("./action-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * updateLayers - action creator
 * @param {string} id
 */
function updateLayers(windowId, canvasId, payload) {
  return {
    canvasId: canvasId,
    payload: payload,
    type: _actionTypes["default"].UPDATE_LAYERS,
    windowId: windowId
  };
}