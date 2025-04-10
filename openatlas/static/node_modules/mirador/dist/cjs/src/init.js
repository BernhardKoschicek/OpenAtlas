"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _MiradorViewer = _interopRequireDefault(require("./lib/MiradorViewer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Default Mirador instantiation
 */
function viewer(config, pluginsOrStruct) {
  var struct;
  if (Array.isArray(pluginsOrStruct)) {
    struct = {
      plugins: pluginsOrStruct
    };
  } else {
    struct = pluginsOrStruct;
  }
  return new _MiradorViewer["default"](config, struct);
}
var _default = exports["default"] = {
  viewer: viewer
};