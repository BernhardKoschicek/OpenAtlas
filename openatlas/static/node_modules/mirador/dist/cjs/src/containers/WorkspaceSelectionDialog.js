"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var _core = require("@material-ui/core");
var _withPlugins = require("../extend/withPlugins");
var _WorkspaceSelectionDialog = require("../components/WorkspaceSelectionDialog");
var actions = _interopRequireWildcard(require("../state/actions"));
var _selectors = require("../state/selectors");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
var mapDispatchToProps = {
  updateWorkspace: actions.updateWorkspace
};

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    workspaceType: (0, _selectors.getWorkspaceType)(state)
  };
};

/** */
var styles = function styles(theme) {
  return {
    card: {
      backgroundColor: 'transparent',
      borderRadius: '0',
      boxShadow: '0 0 transparent',
      display: 'flex'
    },
    content: {
      flex: '1 0 auto'
    },
    details: {
      display: 'flex',
      flexDirection: 'column'
    },
    headline: {
      paddingBottom: '6px'
    },
    list: {
      '&active': {
        outline: 'none'
      },
      '&focus': {
        outline: 'none'
      },
      outline: 'none'
    },
    media: {
      flex: '0 0 120px',
      height: '90px'
    },
    menuItem: {
      height: 'auto',
      overflow: 'auto',
      whiteSpace: 'inherit'
    },
    root: {
      '&:last-child': {
        paddingBottom: '12px'
      },
      paddingBottom: 0,
      paddingTop: 0,
      textAlign: 'left'
    },
    svgIcon: {
      flexShrink: 0,
      height: '90px',
      width: '120px'
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('WorkspaceSelectionDialog'));
var _default = exports["default"] = enhance(_WorkspaceSelectionDialog.WorkspaceSelectionDialog);