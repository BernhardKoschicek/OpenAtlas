"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importConfig = importConfig;
exports.importMiradorState = importMiradorState;
exports.setConfig = setConfig;
exports.updateConfig = updateConfig;
var _uuid = require("uuid");
var _actionTypes = _interopRequireDefault(require("./action-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * importConfig - action creator
 *
 * @param  {Object} config
 * @memberof ActionCreators
 */
function importConfig(config) {
  return {
    config: config,
    type: _actionTypes["default"].IMPORT_CONFIG
  };
}

/**
 * setConfig - action creator
 *
 * @param  {Object} config
 * @memberof ActionCreators
 */
function setConfig(config) {
  return {
    config: config,
    type: _actionTypes["default"].SET_CONFIG
  };
}

/**
 * updateConfig - action creator
 *
 * @param  {Object} config
 * @memberof ActionCreators
 */
function updateConfig(config) {
  return {
    config: config,
    type: _actionTypes["default"].UPDATE_CONFIG
  };
}

/**
 * importMiradorState - action creator
 *
 * @param  {Object} config
 * @memberof ActionCreators
 */
function importMiradorState(state) {
  var newState = _objectSpread(_objectSpread({}, state), {}, {
    workspace: _objectSpread(_objectSpread({}, state.workspace), {}, {
      id: (0, _uuid.v4)()
    })
  });
  return {
    state: newState,
    type: _actionTypes["default"].IMPORT_MIRADOR_STATE
  };
}