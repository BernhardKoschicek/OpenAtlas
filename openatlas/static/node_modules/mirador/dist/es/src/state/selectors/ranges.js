function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
import { createSelector } from 'reselect';
import union from 'lodash/union';
import without from 'lodash/without';
import { Utils } from 'manifesto.js';
import { getVisibleCanvasIds } from './canvases';
import { getCompanionWindow } from './companionWindows';
import { getSequenceTreeStructure } from './sequences';

/** */
function rangeContainsCanvasId(range, canvasId) {
  var canvasIds = range.getCanvasIds();
  for (var i = 0; i < canvasIds.length; i += 1) {
    if (Utils.normalisedUrlsMatch(canvasIds[i], canvasId)) {
      return true;
    }
  }
  return false;
}

/** */
function getAllParentIds(node) {
  if (node.parentNode === undefined) {
    return [];
  }
  if (node.parentNode.parentNode === undefined) {
    return [node.parentNode.id];
  }
  return [].concat(_toConsumableArray(getAllParentIds(node.parentNode)), [node.parentNode.id]);
}

/** */
function getVisibleNodeIdsInSubTree(nodes, canvasIds) {
  return nodes.reduce(function (nodeIdAcc, node) {
    var result = [];
    result.push.apply(result, _toConsumableArray(nodeIdAcc));
    var nodeContainsVisibleCanvas = canvasIds.reduce(function (acc, canvasId) {
      return acc || rangeContainsCanvasId(node.data, canvasId);
    }, false);
    var subTreeVisibleNodeIds = node.nodes.length > 0 ? getVisibleNodeIdsInSubTree(node.nodes, canvasIds) : [];
    result.push.apply(result, _toConsumableArray(subTreeVisibleNodeIds));
    if (nodeContainsVisibleCanvas || subTreeVisibleNodeIds.length > 0) {
      result.push({
        containsVisibleCanvas: nodeContainsVisibleCanvas,
        descendantsContainVisibleCanvas: subTreeVisibleNodeIds.length > 0,
        id: node.id,
        leaf: node.nodes.length === 0,
        parentIds: getAllParentIds(node)
      });
    }
    return result;
  }, []);
}

/** */
var getVisibleLeafAndBranchNodeIds = createSelector([getSequenceTreeStructure, getVisibleCanvasIds], function (tree, canvasIds) {
  if (canvasIds.length === 0 || !tree) return [];
  return getVisibleNodeIdsInSubTree(tree.nodes, canvasIds);
});

/** */
export var getVisibleNodeIds = createSelector([getVisibleLeafAndBranchNodeIds], function (visibleLeafAndBranchNodeIds) {
  return visibleLeafAndBranchNodeIds.map(function (item) {
    return item.id;
  });
});
var getVisibleBranchNodeIds = createSelector([getVisibleLeafAndBranchNodeIds], function (visibleLeafAndBranchNodeIds) {
  return visibleLeafAndBranchNodeIds.reduce(function (acc, item) {
    return item.leaf || !item.descendantsContainVisibleCanvas ? acc : [].concat(_toConsumableArray(acc), [item.id]);
  }, []);
});
var getCanvasContainingNodeIds = createSelector([getVisibleLeafAndBranchNodeIds], function (visibleLeafAndBranchNodeIds) {
  return visibleLeafAndBranchNodeIds.reduce(function (acc, item) {
    return item.containsVisibleCanvas ? [].concat(_toConsumableArray(acc), [item]) : acc;
  }, []);
});

/** */
export function getManuallyExpandedNodeIds(state, _ref, expanded) {
  var companionWindowId = _ref.companionWindowId;
  var companionWindow = getCompanionWindow(state, {
    companionWindowId: companionWindowId
  });
  return companionWindow.tocNodes ? Object.keys(companionWindow.tocNodes).reduce(function (acc, nodeId) {
    return companionWindow.tocNodes[nodeId].expanded === expanded ? [].concat(_toConsumableArray(acc), [nodeId]) : acc;
  }, []) : [];
}

/** */
export function getExpandedNodeIds(state, _ref2) {
  var companionWindowId = _ref2.companionWindowId,
    windowId = _ref2.windowId;
  var visibleBranchNodeIds = getVisibleBranchNodeIds(state, {
    companionWindowId: companionWindowId,
    windowId: windowId
  });
  var manuallyExpandedNodeIds = getManuallyExpandedNodeIds(state, {
    companionWindowId: companionWindowId
  }, true);
  var manuallyClosedNodeIds = getManuallyExpandedNodeIds(state, {
    companionWindowId: companionWindowId
  }, false);
  return without.apply(void 0, [union(manuallyExpandedNodeIds, visibleBranchNodeIds)].concat(_toConsumableArray(manuallyClosedNodeIds)));
}

/** */
export function getNodeIdToScrollTo(state, _ref3) {
  var args = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
  var canvasContainingNodeIds = getCanvasContainingNodeIds(state, _objectSpread({}, args));
  var collapsedNodeIds = getManuallyExpandedNodeIds(state, args, false);
  if (canvasContainingNodeIds && canvasContainingNodeIds.length > 0) {
    for (var i = 0; i < canvasContainingNodeIds[0].parentIds.length; i += 1) {
      if (collapsedNodeIds.indexOf(canvasContainingNodeIds[0].parentIds[i]) !== -1) {
        return canvasContainingNodeIds[0].parentIds[i];
      }
    }
    return canvasContainingNodeIds[0].id;
  }
  return null;
}

/**
 * Returns the default sidebar variant depending on whether or not ranges exist
 */
export var getDefaultSidebarVariant = createSelector([getSequenceTreeStructure], function (tree) {
  return tree && tree.nodes && tree.nodes.length > 0 ? 'tableOfContents' : 'item';
});