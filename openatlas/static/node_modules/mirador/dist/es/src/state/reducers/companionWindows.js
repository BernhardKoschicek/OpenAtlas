function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import omit from 'lodash/omit';
import set from 'lodash/fp/set';
import update from 'lodash/fp/update';
import ActionTypes from '../actions/action-types';

/** */
export function companionWindowsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case ActionTypes.ADD_COMPANION_WINDOW:
      return set([action.id], action.payload, state);
    case ActionTypes.ADD_WINDOW:
      return _objectSpread(_objectSpread({}, state), (action.companionWindows || []).reduce(function (newState, cw) {
        newState[cw.id] = _objectSpread(_objectSpread(_objectSpread({}, state[cw.id]), cw), {}, {
          windowId: action.id
        });
        return newState;
      }, {}));
    case ActionTypes.REMOVE_WINDOW:
      return Object.keys(state).reduce(function (object, key) {
        if (state[key].windowId !== action.windowId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    case ActionTypes.UPDATE_COMPANION_WINDOW:
      return update([action.id], function (orig) {
        return _objectSpread(_objectSpread({}, orig || {}), action.payload);
      }, state);
    case ActionTypes.REMOVE_COMPANION_WINDOW:
      return omit(state, action.id);
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.companionWindows || [];
    case ActionTypes.TOGGLE_TOC_NODE:
      return update([action.id, 'tocNodes'], function (orig) {
        return _objectSpread(_objectSpread({}, orig || {}), action.payload);
      }, state);
    default:
      return state;
  }
}