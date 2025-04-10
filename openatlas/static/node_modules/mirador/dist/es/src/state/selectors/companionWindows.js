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
import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import { miradorSlice } from './utils';
import { getWindow, getWindows } from './getters';

/** */
export function getCompanionWindows(state) {
  return miradorSlice(state).companionWindows || {};
}
export var getCompanionWindow = createSelector([getCompanionWindows, function (state, _ref) {
  var companionWindowId = _ref.companionWindowId;
  return companionWindowId;
}], function (companionWindows, companionWindowId) {
  return companionWindowId && companionWindows[companionWindowId];
});

/** Return position of thumbnail navigation in a certain window.
* @param {object} state
* @param {String} windowId
* @param {String}
*/
export var getThumbnailNavigationPosition = createSelector([getWindow, getCompanionWindows], function (window, companionWindows) {
  return window && companionWindows[window.thumbnailNavigationId] && companionWindows[window.thumbnailNavigationId].position;
});

/**
* Return compantion window ids from a window
* @param {String} windowId
* @return {Array}
*/
var getCompanionWindowIndexByWindowAndPosition = createSelector([getWindows, getCompanionWindows], function (windows, companionWindows) {
  return (Object.keys(windows) || []).reduce(function (obj, id) {
    return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, id, groupBy(windows[id].companionWindowIds, function (cwid) {
      return companionWindows[cwid] && companionWindows[cwid].position;
    })));
  }, {});
});

/**
* Return compantion window ids from a window
* @param {String} windowId
* @return {Array}
*/
var getCompanionWindowsByWindowAndPosition = createSelector([getWindows, getCompanionWindows], function (windows, companionWindows) {
  return (Object.keys(windows) || []).reduce(function (obj, id) {
    return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, id, groupBy(windows[id].companionWindowIds.map(function (cwid) {
      return companionWindows[cwid];
    }), function (cw) {
      return cw.position;
    })));
  }, {});
});

/**
 * Return companion windows of a window
 * @param {String} windowId
 * @return {Array}
 */
var getCompanionWindowsOfWindow = createSelector([function (state, _ref2) {
  var windowId = _ref2.windowId;
  return windowId;
}, getCompanionWindowsByWindowAndPosition], function (windowId, companionWindows) {
  return companionWindows[windowId] || {};
});

/**
 * Return companion windows of a window
 * @param {String} windowId
 * @return {Array}
 */
var getCompanionWindowIdsOfWindow = createSelector([function (state, _ref3) {
  var windowId = _ref3.windowId;
  return windowId;
}, getCompanionWindowIndexByWindowAndPosition], function (windowId, companionWindowIds) {
  return companionWindowIds[windowId] || {};
});

/**
* Return the companion window string from state in a given windowId and position
* @param {object} state
* @param {String} windowId
* @param {String} position
* @return {String}
*/
export var getCompanionWindowsForPosition = createSelector([getCompanionWindowsOfWindow, function (state, _ref4) {
  var position = _ref4.position;
  return {
    position: position
  };
}], function (companionWindows, _ref5) {
  var position = _ref5.position;
  return companionWindows[position] || EMPTY_ARRAY;
});

/**
* Return the companion window string from state in a given windowId and content type
* @param {object} state
* @param {String} windowId
* @param {String} position
* @return {String}
*/
export var getCompanionWindowsForContent = createSelector([getCompanionWindowsOfWindow, function (state, _ref6) {
  var content = _ref6.content;
  return {
    content: content
  };
}], function (companionWindows, _ref7) {
  var _ref8;
  var content = _ref7.content;
  return (_ref8 = []).concat.apply(_ref8, _toConsumableArray(Object.values(companionWindows))).filter(function (w) {
    return w.content === content;
  });
});
var EMPTY_ARRAY = [];

/** */
export var getCompanionWindowIdsForPosition = createSelector([getCompanionWindowIdsOfWindow, function (state, _ref9) {
  var position = _ref9.position;
  return {
    position: position
  };
}], function (companionWindowIds, _ref10) {
  var position = _ref10.position;
  return companionWindowIds[position] || EMPTY_ARRAY;
});

/**
 * Returns the visibility of the companion area
 * @param {object} state
 * @param {object} props
 * @return {Boolean}
 */
export var getCompanionAreaVisibility = createSelector([function (state, _ref11) {
  var position = _ref11.position;
  return position;
}, getWindow], function (position, window) {
  if (!window) return false;
  var companionAreaOpen = window.companionAreaOpen,
    sideBarOpen = window.sideBarOpen;
  if (position !== 'left') return true;
  return !!(companionAreaOpen && sideBarOpen);
});
export var selectCompanionWindowDimensions = createSelector([getCompanionWindowsOfWindow], function (companionWindows) {
  var _ref12;
  var width = 0;
  var height = 0;
  (_ref12 = []).concat.apply(_ref12, _toConsumableArray(Object.values(companionWindows))).forEach(function (cw) {
    if (cw.position.match(/right/)) {
      width += 235;
    }
    if (cw.position.match(/bottom/)) {
      height += 201;
    }
  });
  return {
    height: height,
    width: width
  };
});