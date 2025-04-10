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
import settings from '../../config/settings';
import ActionTypes from '../actions/action-types';

/** Check if the viewport dimensions are fully specified */
function hasViewportPosition(viewportPosition) {
  return viewportPosition.x !== undefined && viewportPosition.y !== undefined && viewportPosition.width !== undefined && viewportPosition.height !== undefined;
}

/** Check if the containee is fully within the bounds on the container */
function contains(container, containee) {
  return containee.x - containee.width / 2 > container.x - container.width / 2 && containee.y - containee.height / 2 > container.y - container.height / 2 && containee.x + containee.width / 2 < container.x + container.width / 2 && containee.y + containee.height / 2 < container.y + container.height / 2;
}

/**
 * workspaceReducer
 */
export var workspaceReducer = function workspaceReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _objectSpread(_objectSpread({}, settings.workspace), {}, {
    windowIds: []
  });
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var newWorkspaceDimensions;
  var viewportPosition;
  var newWindowIds;
  switch (action.type) {
    case ActionTypes.UPDATE_WORKSPACE:
      return _objectSpread(_objectSpread({}, state), action.config);
    case ActionTypes.FOCUS_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, {
        focusedWindowId: action.windowId,
        viewportPosition: _objectSpread(_objectSpread({}, state.viewportPosition), action.position)
      });
    case ActionTypes.ADD_WINDOW:
      return _objectSpread(_objectSpread({}, state), {}, {
        focusedWindowId: action.window.id,
        windowIds: [].concat(_toConsumableArray(state.windowIds || []), [action.window.id])
      });
    case ActionTypes.REMOVE_WINDOW:
      newWindowIds = (state.windowIds || []).filter(function (v) {
        return v !== action.windowId;
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        focusedWindowId: action.windowId === state.focusedWindowId ? newWindowIds[newWindowIds.length - 1] : state.focusedWindowId,
        windowIds: newWindowIds
      });
    case ActionTypes.SET_WORKSPACE_FULLSCREEN:
      return _objectSpread(_objectSpread({}, state), {}, {
        isFullscreenEnabled: action.isFullscreenEnabled
      });
    case ActionTypes.TOGGLE_ZOOM_CONTROLS:
      return _objectSpread(_objectSpread({}, state), {}, {
        showZoomControls: action.showZoomControls
      });
    case ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT:
      return _objectSpread(_objectSpread({}, state), {}, {
        layout: action.layout
      });
    case ActionTypes.SET_WORKSPACE_ADD_VISIBILITY:
      return _objectSpread(_objectSpread({}, state), {}, {
        isWorkspaceAddVisible: action.isWorkspaceAddVisible
      });
    case ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION:
      newWorkspaceDimensions = {};
      viewportPosition = _objectSpread(_objectSpread({}, state.viewportPosition), action.payload.position);
      if (hasViewportPosition(viewportPosition) && !contains({
        height: state.height,
        width: state.width,
        x: 0,
        y: 0
      }, viewportPosition)) {
        newWorkspaceDimensions = {
          height: state.height * 2,
          width: state.width * 2
        };
      }
      return _objectSpread(_objectSpread(_objectSpread({}, state), newWorkspaceDimensions), {}, {
        viewportPosition: viewportPosition
      });
    case ActionTypes.SET_CONFIG:
    case ActionTypes.IMPORT_CONFIG:
    case ActionTypes.UPDATE_CONFIG:
      return _objectSpread(_objectSpread({}, state), action.config.workspace);
    case ActionTypes.IMPORT_MIRADOR_STATE:
      return action.state.workspace || {};
    case ActionTypes.TOGGLE_DRAGGING:
      return _objectSpread(_objectSpread({}, state), {}, {
        draggingEnabled: !state.draggingEnabled
      });
    default:
      return state;
  }
};