function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import omit from 'lodash/omit';
import ActionTypes from '../actions/action-types';

/**
 * manifestsReducer
 */
export var manifestsReducer = function manifestsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case ActionTypes.REQUEST_MANIFEST:
      return _objectSpread(_defineProperty({}, action.manifestId, _objectSpread(_objectSpread(_objectSpread({}, state[action.manifestId]), action.properties), {}, {
        id: action.manifestId
      })), omit(state, action.manifestId));
    case ActionTypes.RECEIVE_MANIFEST:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.manifestId, _objectSpread(_objectSpread({}, state[action.manifestId]), {}, {
        error: null,
        // Explicitly set the error to null in case this is a re-fetch
        id: action.manifestId,
        isFetching: false,
        json: action.manifestJson
      })));
    case ActionTypes.RECEIVE_MANIFEST_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.manifestId, _objectSpread(_objectSpread({}, state[action.manifestId]), {}, {
        error: action.error,
        id: action.manifestId,
        isFetching: false
      })));
    case ActionTypes.REMOVE_MANIFEST:
      return Object.keys(state).reduce(function (object, key) {
        if (key !== action.manifestId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.manifests || {};
    default:
      return state;
  }
};