function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { createSelector } from 'reselect';
import { getManifestTitle } from './manifests';
import { getConfig } from './config';
import { getWindows, getWindow, getWindowIds } from './getters';
import { getWorkspaceType } from './workspace';
import { getSequenceViewingHint, getSequenceBehaviors } from './sequences';

/** */
export var getWindowConfig = createSelector([getConfig, getWindow], function (_ref) {
  var defaultConfig = _ref.window;
  var windowConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _objectSpread(_objectSpread({}, defaultConfig), windowConfig);
});

/**
 * Return the manifest titles for all open windows
 * @param {object} state
 * @return {object}
 */
export function getWindowTitles(state) {
  var result = {};
  Object.keys(getWindows(state)).forEach(function (windowId) {
    result[windowId] = getManifestTitle(state, {
      windowId: windowId
    });
  });
  return result;
}

/** */
export var getMaximizedWindowsIds = createSelector([getWindows], function (windows) {
  return Object.values(windows).filter(function (window) {
    return window.maximized === true;
  }).map(function (window) {
    return window.id;
  });
});

/** Return type of view in a certain window.
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @param {String}
*/
export var getWindowViewType = createSelector([getWindow, getWindowConfig, getSequenceViewingHint, getSequenceBehaviors], function (window, _ref2, manifestViewingHint, manifestBehaviors) {
  var _ref2$views = _ref2.views,
    views = _ref2$views === void 0 ? [] : _ref2$views,
    defaultView = _ref2.defaultView;
  if (window && window.view) return window.view;
  var config = (views || []).find(function (view) {
    return view.behaviors && view.behaviors.some(function (b) {
      return manifestViewingHint === b || manifestBehaviors.includes(b);
    });
  });
  return config && config.key || defaultView;
});

/** */
export var getAllowedWindowViewTypes = createSelector([getSequenceViewingHint, getSequenceBehaviors, getWindowConfig], function (manifestViewingHint, manifestBehaviors, _ref3) {
  var _ref3$views = _ref3.views,
    views = _ref3$views === void 0 ? [] : _ref3$views,
    defaultView = _ref3.defaultView;
  return (views || []).reduce(function (allowedViews, view) {
    if (view.key === defaultView || !view.behaviors || view.behaviors.some(function (b) {
      return manifestViewingHint === b || manifestBehaviors.includes(b);
    })) allowedViews.push(view.key);
    return allowedViews;
  }, []);
});

/**
 * Returns the draggability of a window
 * @param {object} state
 * @param {object} props
 * @return {Boolean}
 */
export var getWindowDraggability = createSelector([getWorkspaceType, getWindow, function (state) {
  return getWindowIds(state).length > 1;
}], function (workspaceType, window, manyWindows) {
  if (workspaceType === 'elastic') return true;
  return manyWindows && window && window.maximized === false;
});