"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infoResponsesReducer = void 0;
var _actionTypes = _interopRequireDefault(require("../actions/action-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * infoResponsesReducer
 */
var infoResponsesReducer = exports.infoResponsesReducer = function infoResponsesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actionTypes["default"].REQUEST_INFO_RESPONSE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.infoId, {
        id: action.infoId,
        isFetching: true
      }));
    case _actionTypes["default"].RECEIVE_INFO_RESPONSE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.infoId, {
        degraded: false,
        id: action.infoId,
        isFetching: false,
        json: action.infoJson,
        tokenServiceId: action.tokenServiceId
      }));
    case _actionTypes["default"].RECEIVE_DEGRADED_INFO_RESPONSE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.infoId, {
        degraded: true,
        id: action.infoId,
        isFetching: false,
        json: action.infoJson,
        tokenServiceId: action.tokenServiceId
      }));
    case _actionTypes["default"].RECEIVE_INFO_RESPONSE_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.infoId, {
        error: action.error,
        id: action.infoId,
        isFetching: false,
        tokenServiceId: action.tokenServiceId
      }));
    case _actionTypes["default"].REMOVE_INFO_RESPONSE:
      return Object.keys(state).reduce(function (object, key) {
        if (key !== action.infoId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    case _actionTypes["default"].IMPORT_MIRADOR_STATE:
      return {};
    default:
      return state;
  }
};