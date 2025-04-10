var _excluded = ["companionWindows", "manifest"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
import { v4 as uuid } from 'uuid';
import ActionTypes from './action-types';
import { miradorSlice } from '../selectors/utils';

/**
 * focusWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function focusWindow(windowId) {
  var pan = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    pan: pan,
    type: ActionTypes.FOCUS_WINDOW,
    windowId: windowId
  };
}

/**
 * addWindow - action creator
 *
 * @param  {Object} options
 * @memberof ActionCreators
 */
export function addWindow(_ref) {
  var companionWindows = _ref.companionWindows,
    manifest = _ref.manifest,
    options = _objectWithoutProperties(_ref, _excluded);
  return function (dispatch, getState) {
    var _miradorSlice = miradorSlice(getState()),
      config = _miradorSlice.config,
      _miradorSlice$workspa = _miradorSlice.workspace.windowIds,
      windowIds = _miradorSlice$workspa === void 0 ? [] : _miradorSlice$workspa;
    var numWindows = windowIds.length;
    var windowId = options.id || "window-".concat(uuid());
    var cwThumbs = "cw-".concat(uuid());
    var defaultCompanionWindows = [{
      content: 'thumbnailNavigation',
      "default": true,
      id: cwThumbs,
      position: options.thumbnailNavigationPosition || config.thumbnailNavigation.defaultPosition,
      windowId: windowId
    }].concat(_toConsumableArray((companionWindows || []).map(function (cw, i) {
      return _objectSpread(_objectSpread({}, cw), {}, {
        id: "cw-".concat(uuid())
      });
    })));
    if (options.sideBarPanel || config.window.defaultSideBarPanel || config.window.sideBarPanel) {
      defaultCompanionWindows.unshift({
        content: options.sideBarPanel || options.defaultSearchQuery && 'search' || config.window.defaultSideBarPanel || config.window.sideBarPanel,
        "default": true,
        id: "cw-".concat(uuid()),
        position: 'left',
        windowId: windowId
      });
    }
    var defaultOptions = {
      canvasId: undefined,
      collectionIndex: 0,
      companionAreaOpen: true,
      companionWindowIds: defaultCompanionWindows.map(function (cw) {
        return cw.id;
      }),
      draggingEnabled: true,
      highlightAllAnnotations: config.window.highlightAllAnnotations || false,
      id: windowId,
      manifestId: null,
      maximized: false,
      rangeId: null,
      rotation: null,
      selectedAnnotations: {},
      sideBarOpen: config.window.sideBarOpenByDefault !== undefined ? config.window.sideBarOpenByDefault || !!options.defaultSearchQuery : config.window.sideBarOpen || !!options.defaultSearchQuery,
      sideBarPanel: options.sideBarPanel || config.window.defaultSideBarPanel || config.window.sideBarPanel,
      thumbnailNavigationId: cwThumbs
    };
    var elasticLayout = _objectSpread(_objectSpread({}, config.window.elastic || {
      height: 400,
      width: 480
    }), {}, {
      x: 200 + (Math.floor(numWindows / 10) * 50 + numWindows * 30 % 300),
      y: 200 + numWindows * 50 % 300
    });
    dispatch({
      companionWindows: defaultCompanionWindows,
      elasticLayout: elasticLayout,
      manifest: manifest,
      type: ActionTypes.ADD_WINDOW,
      window: _objectSpread(_objectSpread({}, defaultOptions), options)
    });
  };
}

/** */
export function updateWindow(id, payload) {
  return {
    id: id,
    payload: payload,
    type: ActionTypes.UPDATE_WINDOW
  };
}

/**
 * maximizeWindow
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function maximizeWindow(windowId, layout) {
  return {
    type: ActionTypes.MAXIMIZE_WINDOW,
    windowId: windowId
  };
}

/**
 * minimizeWindow
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function minimizeWindow(windowId) {
  return {
    type: ActionTypes.MINIMIZE_WINDOW,
    windowId: windowId
  };
}

/** */
export function setCompanionAreaOpen(id, companionAreaOpen) {
  return {
    id: id,
    payload: {
      companionAreaOpen: companionAreaOpen
    },
    type: ActionTypes.UPDATE_WINDOW
  };
}

/**
 * removeWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function removeWindow(windowId) {
  return {
    type: ActionTypes.REMOVE_WINDOW,
    windowId: windowId
  };
}

/**
 * toggleWindowSideBar - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function toggleWindowSideBar(windowId) {
  return {
    type: ActionTypes.TOGGLE_WINDOW_SIDE_BAR,
    windowId: windowId
  };
}

/**
 * setWindowThumbnailPosition - action creator
 *
 * @param  {String} windowId
 * @param  {String} position
 * @memberof ActionCreators
 */
export function setWindowThumbnailPosition(windowId, position) {
  return function (dispatch, getState) {
    var _getState = getState(),
      windows = _getState.windows;
    var thumbnailNavigationId = windows[windowId].thumbnailNavigationId;
    dispatch({
      id: thumbnailNavigationId,
      payload: {
        position: position
      },
      type: ActionTypes.UPDATE_COMPANION_WINDOW
    });
  };
}

/**
 * setWindowViewType - action creator
 *
 * @param  {String} windowId
 * @param  {String} viewType
 * @memberof ActionCreators
 */
export function setWindowViewType(windowId, viewType) {
  return {
    type: ActionTypes.SET_WINDOW_VIEW_TYPE,
    viewType: viewType,
    windowId: windowId
  };
}

/** */
export function showCollectionDialog(manifestId) {
  var collectionPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var windowId = arguments.length > 2 ? arguments[2] : undefined;
  return {
    collectionPath: collectionPath,
    manifestId: manifestId,
    type: ActionTypes.SHOW_COLLECTION_DIALOG,
    windowId: windowId
  };
}

/** */
export function hideCollectionDialog(windowId) {
  return {
    type: ActionTypes.HIDE_COLLECTION_DIALOG,
    windowId: windowId
  };
}