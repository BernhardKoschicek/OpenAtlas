"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.windowsReducer = void 0;
var _update = _interopRequireDefault(require("lodash/fp/update"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _actionTypes = _interopRequireDefault(require("../actions/action-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * windowsReducer
 */
var windowsReducer = exports.windowsReducer = function windowsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _actionTypes["default"].ADD_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.window.id, action.window));
    case _actionTypes["default"].MAXIMIZE_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        maximized: true
      })));
    case _actionTypes["default"].MINIMIZE_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        maximized: false
      })));
    case _actionTypes["default"].UPDATE_WINDOW:
      return (0, _update["default"])([action.id], function (orig) {
        return _objectSpread(_objectSpread({}, orig || {}), action.payload);
      }, state);
    case _actionTypes["default"].REMOVE_WINDOW:
      return (0, _omit["default"])(state, [action.windowId]);
    case _actionTypes["default"].TOGGLE_WINDOW_SIDE_BAR:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        sideBarOpen: !state[action.windowId].sideBarOpen
      })));
    case _actionTypes["default"].SET_WINDOW_VIEW_TYPE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        view: action.viewType
      })));
    case _actionTypes["default"].UPDATE_WINDOW_POSITION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.payload.windowId, _objectSpread(_objectSpread({}, state[action.payload.windowId]), {}, {
        x: action.payload.position.x,
        y: action.payload.position.y
      })));
    case _actionTypes["default"].SET_WINDOW_SIZE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.payload.windowId, _objectSpread(_objectSpread({}, state[action.payload.windowId]), {}, {
        height: action.payload.size.height,
        width: action.payload.size.width,
        x: action.payload.size.x,
        y: action.payload.size.y
      })));
    case _actionTypes["default"].SET_CANVAS:
      if (!state[action.windowId]) return state;
      return (0, _update["default"])([action.windowId], function (orig) {
        return _objectSpread(_objectSpread({}, orig || {}), {}, {
          canvasId: action.canvasId,
          visibleCanvases: action.visibleCanvases || []
        });
      }, state);
    case _actionTypes["default"].ADD_COMPANION_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        companionWindowIds: state[action.windowId].companionWindowIds.concat([action.id])
      }, action.payload.position === 'left' ? {
        companionAreaOpen: true,
        sideBarPanel: action.payload.content
      } : {})));
    case _actionTypes["default"].UPDATE_COMPANION_WINDOW:
      if (action.payload.position !== 'left') return state;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        companionAreaOpen: true
      })));
    case _actionTypes["default"].REMOVE_COMPANION_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        companionWindowIds: state[action.windowId].companionWindowIds.filter(function (id) {
          return id !== action.id;
        })
      })));
    case _actionTypes["default"].SELECT_ANNOTATION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        selectedAnnotationId: action.annotationId
      })));
    case _actionTypes["default"].DESELECT_ANNOTATION:
      {
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
          selectedAnnotationId: undefined
        })));
      }
    case _actionTypes["default"].HOVER_ANNOTATION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        hoveredAnnotationIds: action.annotationIds
      })));
    case _actionTypes["default"].TOGGLE_ANNOTATION_DISPLAY:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        highlightAllAnnotations: !state[action.windowId].highlightAllAnnotations
      })));
    case _actionTypes["default"].IMPORT_MIRADOR_STATE:
      return action.state.windows || [];
    case _actionTypes["default"].REQUEST_SEARCH:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        suggestedSearches: undefined
      })));
    case _actionTypes["default"].SHOW_COLLECTION_DIALOG:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        collectionDialogOn: true,
        collectionManifestId: action.manifestId,
        collectionPath: action.collectionPath
      })));
    case _actionTypes["default"].HIDE_COLLECTION_DIALOG:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        collectionDialogOn: false
      })));
    default:
      return state;
  }
};