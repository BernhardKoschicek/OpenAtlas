function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import omit from 'lodash/omit';
import flatten from 'lodash/flatten';
import ActionTypes from '../actions/action-types';

/**
 * searchReducer
 */
export var searchesReducer = function searchesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var searchStruct = (state[action.windowId] || {})[action.companionWindowId] || {};
  switch (action.type) {
    case ActionTypes.REQUEST_SEARCH:
      if (searchStruct.query !== action.query) {
        // new query
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, _defineProperty({}, action.companionWindowId, _objectSpread(_objectSpread({}, searchStruct), {}, {
          data: _defineProperty({}, action.searchId, {
            isFetching: true
          }),
          query: action.query,
          selectedContentSearchAnnotation: []
        })))));
      }

      // paginating through a query
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, _defineProperty({}, action.companionWindowId, _objectSpread(_objectSpread({}, searchStruct), {}, {
        data: _objectSpread(_objectSpread({}, searchStruct.data), {}, _defineProperty({}, action.searchId, {
          isFetching: true
        }))
      })))));
    case ActionTypes.RECEIVE_SEARCH:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, _defineProperty({}, action.companionWindowId, _objectSpread(_objectSpread({}, searchStruct), {}, {
        data: _objectSpread(_objectSpread({}, searchStruct.data), {}, _defineProperty({}, action.searchId, {
          isFetching: false,
          json: action.searchJson
        }))
      })))));
    case ActionTypes.RECEIVE_SEARCH_FAILURE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, _defineProperty({}, action.companionWindowId, _objectSpread(_objectSpread({}, searchStruct), {}, {
        data: _objectSpread(_objectSpread({}, searchStruct.data), {}, _defineProperty({}, action.searchId, {
          error: action.error,
          isFetching: false
        }))
      })))));
    case ActionTypes.REMOVE_SEARCH:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, Object.keys(state[action.windowId]).reduce(function (object, key) {
        if (key !== action.companionWindowId) {
          object[key] = state[action.windowId][key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {})));
    case ActionTypes.SET_CONTENT_SEARCH_CURRENT_ANNOTATIONS:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, _defineProperty({}, action.companionWindowId, _objectSpread(_objectSpread({}, searchStruct), {}, {
        selectedContentSearchAnnotationIds: action.annotationIds
      })))));
    case ActionTypes.SELECT_ANNOTATION:
      if (!state[action.windowId]) return state;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, Object.keys(state[action.windowId]).reduce(function (object, key) {
        var search = state[action.windowId][key];
        var searchHasAnnotation = search.data && Object.values(search.data).filter(function (resp) {
          return resp.json && resp.json.resources;
        }).some(function (resp) {
          return flatten([resp.json.resources]).some(function (r) {
            return r['@id'] === action.annotationId;
          });
        });
        if (searchHasAnnotation) {
          object[key] = _objectSpread(_objectSpread({}, search), {}, {
            selectedContentSearchAnnotationIds: [action.annotationId]
          });
        } else {
          object[key] = search; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {})));
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return {};
    case ActionTypes.REMOVE_WINDOW:
      return omit(state, action.windowId);
    case ActionTypes.REMOVE_COMPANION_WINDOW:
      if (!state[action.windowId]) return state;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread({}, omit(state[action.windowId], action.id))));
    default:
      return state;
  }
};