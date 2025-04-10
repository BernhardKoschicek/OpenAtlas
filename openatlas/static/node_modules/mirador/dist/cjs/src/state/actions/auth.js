"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAuthenticationRequest = addAuthenticationRequest;
exports.receiveAccessToken = receiveAccessToken;
exports.receiveAccessTokenFailure = receiveAccessTokenFailure;
exports.requestAccessToken = requestAccessToken;
exports.resetAuthenticationState = resetAuthenticationState;
exports.resolveAccessTokenRequest = resolveAccessTokenRequest;
exports.resolveAuthenticationRequest = resolveAuthenticationRequest;
var _actionTypes = _interopRequireDefault(require("./action-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * addAuthenticationRequest - action creator
 *
 * @param  {String} windowId
 * @param  {String} id
 * @memberof ActionCreators
 */
function addAuthenticationRequest(windowId, id) {
  var profile = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return {
    id: id,
    profile: profile,
    type: _actionTypes["default"].ADD_AUTHENTICATION_REQUEST,
    windowId: windowId
  };
}

/**
 * resolveAuthenticationRequest - action creator
 * Triggered when we might have an IIIF auth cookie available (but we
 *   can't be really sure until try the access token)
 *
 * @param {String} id
 * @memberof ActionCreators
 */
function resolveAuthenticationRequest(id, tokenServiceId, props) {
  return _objectSpread({
    id: id,
    tokenServiceId: tokenServiceId,
    type: _actionTypes["default"].RESOLVE_AUTHENTICATION_REQUEST
  }, props);
}

/**
 * requestAccessToken - action creator
 * @private
 *
 * @param  {String} serviceId
 * @param  {String} authId
 * @memberof ActionCreators
 */
function requestAccessToken(serviceId, authId) {
  return {
    authId: authId,
    serviceId: serviceId,
    type: _actionTypes["default"].REQUEST_ACCESS_TOKEN
  };
}

/**
 * receiveAccessToken - action creator
 * @private
 *
 * @param  {String} serviceId
 * @param  {Object} json
 * @memberof ActionCreators
 */
function receiveAccessToken(authId, serviceId, json) {
  return {
    authId: authId,
    json: json,
    serviceId: serviceId,
    type: _actionTypes["default"].RECEIVE_ACCESS_TOKEN
  };
}

/**
 * receiveAccessTokenFailure - action creator
 * @private
 *
 * @param  {String} serviceId
 * @param  {Object} error
 * @memberof ActionCreators
 */
function receiveAccessTokenFailure(authId, serviceId, error) {
  return {
    authId: authId,
    error: error,
    serviceId: serviceId,
    type: _actionTypes["default"].RECEIVE_ACCESS_TOKEN_FAILURE
  };
}

/**
 * resolveAccessTokenRequest - action creator
 *
 * @param {Object} message
 * @memberof ActionCreators
 */
function resolveAccessTokenRequest(authServiceId, tokenServiceId, json) {
  if (!json.accessToken) return receiveAccessTokenFailure(authServiceId, tokenServiceId, json);
  return receiveAccessToken(authServiceId, tokenServiceId, json);
}

/**
 * Resets authentication state for a token service
 */
function resetAuthenticationState(_ref) {
  var authServiceId = _ref.authServiceId,
    tokenServiceId = _ref.tokenServiceId;
  return {
    id: authServiceId,
    tokenServiceId: tokenServiceId,
    type: _actionTypes["default"].RESET_AUTHENTICATION_STATE
  };
}