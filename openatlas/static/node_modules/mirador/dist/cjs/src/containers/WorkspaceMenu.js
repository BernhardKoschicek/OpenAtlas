"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var _withPlugins = require("../extend/withPlugins");
var actions = _interopRequireWildcard(require("../state/actions"));
var _selectors = require("../state/selectors");
var _WorkspaceMenu = require("../components/WorkspaceMenu");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WorkspaceMenu
 * @private
 */
var mapDispatchToProps = {
  toggleZoomControls: actions.toggleZoomControls
};

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    containerId: (0, _selectors.getContainerId)(state),
    isWorkspaceAddVisible: (0, _selectors.getWorkspace)(state).isWorkspaceAddVisible,
    showThemePicker: (0, _selectors.getThemeIds)(state).length > 0,
    showZoomControls: (0, _selectors.getShowZoomControlsConfig)(state)
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('WorkspaceMenu'));
var _default = exports["default"] = enhance(_WorkspaceMenu.WorkspaceMenu);