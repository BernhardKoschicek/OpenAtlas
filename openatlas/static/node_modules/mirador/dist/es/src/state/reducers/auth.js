function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import omit from 'lodash/omit';
import ActionTypes from '../actions/action-types';

/**
 * authReducer
 */
export var authReducer = function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case ActionTypes.ADD_AUTHENTICATION_REQUEST:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.id, {
        id: action.id,
        isFetching: true,
        profile: action.profile,
        windowId: action.windowId
      }));
    case ActionTypes.RESOLVE_AUTHENTICATION_REQUEST:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.id, _objectSpread(_objectSpread({}, state[action.id]), {}, {
        isFetching: false,
        ok: action.ok
      })));
    case ActionTypes.RECEIVE_ACCESS_TOKEN:
      if (!action.authId) return state;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.authId, _objectSpread(_objectSpread({}, state[action.authId]), {}, {
        ok: true
      })));
    case ActionTypes.RESET_AUTHENTICATION_STATE:
      return omit(state, action.id);
    default:
      return state;
  }
};