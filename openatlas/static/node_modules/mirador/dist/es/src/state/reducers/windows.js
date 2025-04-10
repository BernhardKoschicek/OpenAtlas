function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import update from 'lodash/fp/update';
import omit from 'lodash/omit';
import ActionTypes from '../actions/action-types';

/**
 * windowsReducer
 */
export var windowsReducer = function windowsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case ActionTypes.ADD_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.window.id, action.window));
    case ActionTypes.MAXIMIZE_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        maximized: true
      })));
    case ActionTypes.MINIMIZE_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        maximized: false
      })));
    case ActionTypes.UPDATE_WINDOW:
      return update([action.id], function (orig) {
        return _objectSpread(_objectSpread({}, orig || {}), action.payload);
      }, state);
    case ActionTypes.REMOVE_WINDOW:
      return omit(state, [action.windowId]);
    case ActionTypes.TOGGLE_WINDOW_SIDE_BAR:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        sideBarOpen: !state[action.windowId].sideBarOpen
      })));
    case ActionTypes.SET_WINDOW_VIEW_TYPE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        view: action.viewType
      })));
    case ActionTypes.UPDATE_WINDOW_POSITION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.payload.windowId, _objectSpread(_objectSpread({}, state[action.payload.windowId]), {}, {
        x: action.payload.position.x,
        y: action.payload.position.y
      })));
    case ActionTypes.SET_WINDOW_SIZE:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.payload.windowId, _objectSpread(_objectSpread({}, state[action.payload.windowId]), {}, {
        height: action.payload.size.height,
        width: action.payload.size.width,
        x: action.payload.size.x,
        y: action.payload.size.y
      })));
    case ActionTypes.SET_CANVAS:
      if (!state[action.windowId]) return state;
      return update([action.windowId], function (orig) {
        return _objectSpread(_objectSpread({}, orig || {}), {}, {
          canvasId: action.canvasId,
          visibleCanvases: action.visibleCanvases || []
        });
      }, state);
    case ActionTypes.ADD_COMPANION_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        companionWindowIds: state[action.windowId].companionWindowIds.concat([action.id])
      }, action.payload.position === 'left' ? {
        companionAreaOpen: true,
        sideBarPanel: action.payload.content
      } : {})));
    case ActionTypes.UPDATE_COMPANION_WINDOW:
      if (action.payload.position !== 'left') return state;
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        companionAreaOpen: true
      })));
    case ActionTypes.REMOVE_COMPANION_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        companionWindowIds: state[action.windowId].companionWindowIds.filter(function (id) {
          return id !== action.id;
        })
      })));
    case ActionTypes.SELECT_ANNOTATION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        selectedAnnotationId: action.annotationId
      })));
    case ActionTypes.DESELECT_ANNOTATION:
      {
        return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
          selectedAnnotationId: undefined
        })));
      }
    case ActionTypes.HOVER_ANNOTATION:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        hoveredAnnotationIds: action.annotationIds
      })));
    case ActionTypes.TOGGLE_ANNOTATION_DISPLAY:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        highlightAllAnnotations: !state[action.windowId].highlightAllAnnotations
      })));
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.windows || [];
    case ActionTypes.REQUEST_SEARCH:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        suggestedSearches: undefined
      })));
    case ActionTypes.SHOW_COLLECTION_DIALOG:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        collectionDialogOn: true,
        collectionManifestId: action.manifestId,
        collectionPath: action.collectionPath
      })));
    case ActionTypes.HIDE_COLLECTION_DIALOG:
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, action.windowId, _objectSpread(_objectSpread({}, state[action.windowId]), {}, {
        collectionDialogOn: false
      })));
    default:
      return state;
  }
};