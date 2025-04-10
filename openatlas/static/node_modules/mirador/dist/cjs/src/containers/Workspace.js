"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var _styles = require("@material-ui/core/styles");
var _withPlugins = require("../extend/withPlugins");
var _Workspace = require("../components/Workspace");
var _selectors = require("../state/selectors");
var actions = _interopRequireWildcard(require("../state/actions"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    allowNewWindows: (0, _selectors.getConfig)(state).workspace.allowNewWindows,
    isWorkspaceControlPanelVisible: (0, _selectors.getConfig)(state).workspaceControlPanel.enabled,
    maximizedWindowIds: (0, _selectors.getMaximizedWindowsIds)(state),
    windowIds: (0, _selectors.getWindowIds)(state),
    workspaceId: (0, _selectors.getWorkspace)(state).id,
    workspaceType: (0, _selectors.getWorkspaceType)(state)
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
var mapDispatchToProps = {
  addWindow: actions.addWindow
};

/**
 * @param theme
 */
var styles = function styles(theme) {
  return {
    workspaceViewport: {
      bottom: 0,
      left: 0,
      margin: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 0
    },
    workspaceWithControlPanel: {
      paddingTop: 74
    },
    // injection order matters here
    // eslint-disable-next-line sort-keys
    '@media (min-width: 600px)': {
      workspaceWithControlPanel: {
        paddingLeft: 68,
        paddingTop: 0
      }
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('Workspace')
// further HOC go here
);
var _default = exports["default"] = enhance(_Workspace.Workspace);