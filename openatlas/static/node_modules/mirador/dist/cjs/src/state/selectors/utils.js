"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.miradorSlice = miradorSlice;
var _settings = _interopRequireDefault(require("../../config/settings"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** */
function miradorSlice(state) {
  if (_settings["default"].state.slice) return state[_settings["default"].state.slice];
  return state;
}