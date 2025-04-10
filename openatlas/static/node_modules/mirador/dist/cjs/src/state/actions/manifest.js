"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchManifest = fetchManifest;
exports.receiveManifest = receiveManifest;
exports.receiveManifestFailure = receiveManifestFailure;
exports.removeManifest = removeManifest;
exports.requestManifest = requestManifest;
var _actionTypes = _interopRequireDefault(require("./action-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * requestManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
function requestManifest(manifestId, properties) {
  return {
    manifestId: manifestId,
    properties: properties,
    type: _actionTypes["default"].REQUEST_MANIFEST
  };
}

/**
 * receiveManifest - action creator
 *
 * @param  {String} manifestId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */
function receiveManifest(manifestId, manifestJson) {
  return {
    manifestId: manifestId,
    manifestJson: manifestJson,
    type: _actionTypes["default"].RECEIVE_MANIFEST
  };
}

/**
 * receiveManifestFailure - action creator
 *
 * @param  {String} windowId
 * @param  {String} error
 * @memberof ActionCreators
 */
function receiveManifestFailure(manifestId, error) {
  return {
    error: error,
    manifestId: manifestId,
    type: _actionTypes["default"].RECEIVE_MANIFEST_FAILURE
  };
}

/**
 * fetchManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
function fetchManifest(manifestId, properties) {
  return requestManifest(manifestId, _objectSpread(_objectSpread({}, properties), {}, {
    isFetching: true
  }));
}

/**
 * removeManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
function removeManifest(manifestId) {
  return {
    manifestId: manifestId,
    type: _actionTypes["default"].REMOVE_MANIFEST
  };
}