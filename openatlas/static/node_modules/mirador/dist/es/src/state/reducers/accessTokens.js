function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import omit from 'lodash/omit';
import ActionTypes from '../actions/action-types';

/** */
export function accessTokensReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case ActionTypes.RESOLVE_AUTHENTICATION_REQUEST:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.tokenServiceId, {
        authId: action.id,
        id: action.tokenServiceId,
        isFetching: true
      }));
    case ActionTypes.REQUEST_ACCESS_TOKEN:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.serviceId, {
        authId: action.authId,
        id: action.serviceId,
        isFetching: true
      }));
    case ActionTypes.RECEIVE_ACCESS_TOKEN:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.serviceId, _objectSpread(_objectSpread({}, state[action.serviceId]), {}, {
        isFetching: false,
        json: action.json
      })));
    case ActionTypes.RECEIVE_ACCESS_TOKEN_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.serviceId, _objectSpread(_objectSpread({}, state[action.serviceId]), {}, {
        error: action.error,
        isFetching: false
      })));
    case ActionTypes.RESET_AUTHENTICATION_STATE:
      return omit(state, action.tokenServiceId);
    case ActionTypes.RECEIVE_INFO_RESPONSE:
      if (!action.tokenServiceId) return state;
      if (state[action.tokenServiceId].success) return state;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.tokenServiceId, _objectSpread(_objectSpread({}, state[action.tokenServiceId]), {}, {
        success: true
      })));
    default:
      return state;
  }
}