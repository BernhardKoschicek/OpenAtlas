"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _reactI18next = require("react-i18next");
var _core = require("@material-ui/core");
var _withWidth = _interopRequireDefault(require("@material-ui/core/withWidth"));
var _withPlugins = require("../extend/withPlugins");
var actions = _interopRequireWildcard(require("../state/actions"));
var _selectors = require("../state/selectors");
var _WorkspaceAddButton = require("../components/WorkspaceAddButton");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var width = _ref.width;
  var _getWorkspace = (0, _selectors.getWorkspace)(state),
    isWorkspaceAddVisible = _getWorkspace.isWorkspaceAddVisible;
  return {
    isWorkspaceAddVisible: isWorkspaceAddVisible,
    useExtendedFab: width !== 'xs' && !isWorkspaceAddVisible && (0, _selectors.getWindowIds)(state).length === 0
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
var mapDispatchToProps = {
  setWorkspaceAddVisibility: actions.setWorkspaceAddVisibility
};

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
var styles = function styles(theme) {
  return {
    fab: {
      margin: theme.spacing(1)
    },
    fabPrimary: {
      '&:focus': {
        backgroundColor: theme.palette.primary.dark
      }
    },
    fabSecondary: {
      '&:focus': {
        backgroundColor: theme.palette.secondary.dark
      }
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _withWidth["default"])(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('WorkspaceAddButton'));
var _default = exports["default"] = enhance(_WorkspaceAddButton.WorkspaceAddButton);