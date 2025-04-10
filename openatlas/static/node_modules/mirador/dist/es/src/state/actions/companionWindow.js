function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { v4 as uuid } from 'uuid';
import ActionTypes from './action-types';
import { getCompanionWindowIdsForPosition, getManuallyExpandedNodeIds, getVisibleNodeIds } from '../selectors';
var defaultProps = {
  content: null,
  position: null
};

/** */
export function addCompanionWindow(windowId, payload) {
  var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultProps;
  var id = "cw-".concat(uuid());
  return {
    id: id,
    payload: _objectSpread(_objectSpread(_objectSpread({}, defaults), payload), {}, {
      id: id,
      windowId: windowId
    }),
    type: ActionTypes.ADD_COMPANION_WINDOW,
    windowId: windowId
  };
}

/** */
export function addOrUpdateCompanionWindow(windowId, payload) {
  var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultProps;
  return function (dispatch, getState) {
    var state = getState();
    var position = payload.position;
    var updatableWindowId = position === 'left' && getCompanionWindowIdsForPosition(state, {
      position: position,
      windowId: windowId
    })[0];
    if (updatableWindowId) {
      dispatch(updateCompanionWindow(windowId, updatableWindowId, payload));
    } else {
      dispatch(addCompanionWindow(windowId, payload, defaults));
    }
  };
}

/** */
export function updateCompanionWindow(windowId, id, payload) {
  return {
    id: id,
    payload: payload,
    type: ActionTypes.UPDATE_COMPANION_WINDOW,
    windowId: windowId
  };
}

/** */
export function removeCompanionWindow(windowId, id) {
  return {
    id: id,
    type: ActionTypes.REMOVE_COMPANION_WINDOW,
    windowId: windowId
  };
}

/** */
export function toggleNode(windowId, id, nodeId) {
  return function (dispatch, getState) {
    var state = getState();
    var collapsedNodeIds = getManuallyExpandedNodeIds(state, {
      companionWindowId: id
    }, false);
    var expandedNodeIds = getManuallyExpandedNodeIds(state, {
      companionWindowId: id
    }, true);
    var visibleNodeIds = getVisibleNodeIds(state, {
      id: id,
      windowId: windowId
    });
    var expand = collapsedNodeIds.indexOf(nodeId) !== -1 || expandedNodeIds.indexOf(nodeId) === -1 && visibleNodeIds.indexOf(nodeId) === -1;
    return dispatch({
      id: id,
      payload: _defineProperty({}, nodeId, {
        expanded: expand
      }),
      type: ActionTypes.TOGGLE_TOC_NODE,
      windowId: windowId
    });
  };
}