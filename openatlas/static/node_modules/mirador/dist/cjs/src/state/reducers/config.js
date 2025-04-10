"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configReducer = void 0;
var _deepmerge = _interopRequireDefault(require("deepmerge"));
var _settings = _interopRequireDefault(require("../../config/settings"));
var _actionTypes = _interopRequireDefault(require("../actions/action-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var initialState = _objectSpread({}, _settings["default"]);

/** Overwrite arrays when deep merging */
var overwriteMerge = function overwriteMerge(destinationArray, sourceArray, options) {
  return sourceArray;
};

/**
 * configReducer - does a deep merge of the config
 */
var configReducer = exports.configReducer = function configReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actionTypes["default"].UPDATE_CONFIG:
    case _actionTypes["default"].IMPORT_CONFIG:
      return (0, _deepmerge["default"])(state, action.config, {
        arrayMerge: overwriteMerge
      });
    case _actionTypes["default"].SET_CONFIG:
      return action.config;
    case _actionTypes["default"].IMPORT_MIRADOR_STATE:
      return action.state.config || {};
    default:
      return state;
  }
};