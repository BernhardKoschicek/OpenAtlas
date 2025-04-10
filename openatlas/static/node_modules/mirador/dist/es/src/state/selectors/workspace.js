function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { createSelector } from 'reselect';
import { getWorkspace } from './getters';
import { miradorSlice } from './utils';

/** */
export function getElasticLayout(state) {
  return miradorSlice(state).elasticLayout;
}
export var getFullScreenEnabled = createSelector([getWorkspace], function (workspace) {
  return workspace.isFullscreenEnabled;
});

/** Returns the latest error from the state
 * @param {object} state
 */
export function getLatestError(state) {
  var _miradorSlice$errors$ = _slicedToArray(miradorSlice(state).errors.items, 1),
    errorId = _miradorSlice$errors$[0];
  return miradorSlice(state).errors[errorId];
}
export var getWorkspaceType = createSelector([getWorkspace], function (_ref) {
  var type = _ref.type;
  return type;
});
var getFocusedWindowId = createSelector([getWorkspace], function (_ref2) {
  var focusedWindowId = _ref2.focusedWindowId;
  return focusedWindowId;
});

/** Check if the current window is focused */
export var isFocused = function isFocused(state, _ref3) {
  var windowId = _ref3.windowId;
  return getFocusedWindowId(state) === windowId;
};