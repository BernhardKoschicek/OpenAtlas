"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var actions = _interopRequireWildcard(require("../state/actions"));
var _withPlugins = require("../extend/withPlugins");
var _selectors = require("../state/selectors");
var _AnnotationSettings = require("../components/AnnotationSettings");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * Mapping redux state to component props using connect
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    displayAll: (0, _selectors.getWindow)(state, {
      windowId: windowId
    }).highlightAllAnnotations,
    displayAllDisabled: (0, _selectors.getAnnotationResourcesByMotivation)(state, {
      windowId: windowId
    }).length < 2
  };
};

/**
 * Mapping redux action dispatches to component props using connect
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    toggleAnnotationDisplay: function toggleAnnotationDisplay() {
      dispatch(actions.toggleAnnotationDisplay(windowId));
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('AnnotationSettings'));
var _default = exports["default"] = enhance(_AnnotationSettings.AnnotationSettings);