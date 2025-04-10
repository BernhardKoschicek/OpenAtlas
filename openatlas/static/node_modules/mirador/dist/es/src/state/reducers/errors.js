function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import without from 'lodash/without';
import ActionTypes from '../actions/action-types';
var defaultState = {
  items: []
};

/**
 * errorsReducer
 */
export var errorsReducer = function errorsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var ret;
  switch (action.type) {
    case ActionTypes.ADD_ERROR:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty(_defineProperty({}, action.id, {
        id: action.id,
        message: action.message
      }), "items", [].concat(_toConsumableArray(state.items), [action.id])));
    // eslint-disable-line max-len
    case ActionTypes.RECEIVE_INFO_RESPONSE_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty(_defineProperty({}, action.infoId, {
        id: action.infoId,
        message: action.error
      }), "items", [].concat(_toConsumableArray(state.items), [action.infoId])));
    case ActionTypes.RECEIVE_SEARCH_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty(_defineProperty({}, action.searchId, {
        id: action.searchId,
        message: action.error
      }), "items", [].concat(_toConsumableArray(state.items), [action.searchId])));
    case ActionTypes.REMOVE_ERROR:
      ret = Object.keys(state).reduce(function (object, key) {
        if (key !== action.id) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
      ret.items = without(ret.items, action.id);
      return ret;
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return defaultState;
    default:
      return state;
  }
};