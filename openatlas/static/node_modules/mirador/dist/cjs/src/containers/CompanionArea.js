"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _core = require("@material-ui/core");
var _reactI18next = require("react-i18next");
var _withPlugins = require("../extend/withPlugins");
var _selectors = require("../state/selectors");
var actions = _interopRequireWildcard(require("../state/actions"));
var _CompanionArea = require("../components/CompanionArea");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/** */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId,
    position = _ref.position;
  return {
    companionAreaOpen: (0, _selectors.getCompanionAreaVisibility)(state, {
      position: position,
      windowId: windowId
    }),
    companionWindowIds: (0, _selectors.getCompanionWindowIdsForPosition)(state, {
      position: position,
      windowId: windowId
    }),
    direction: (0, _selectors.getThemeDirection)(state),
    sideBarOpen: ((0, _selectors.getWindow)(state, {
      windowId: windowId
    }) || {}).sideBarOpen
  };
};
var mapDispatchToProps = {
  setCompanionAreaOpen: actions.setCompanionAreaOpen
};

/** */
var styles = function styles(theme) {
  return {
    horizontal: {
      flexDirection: 'column',
      width: '100%'
    },
    left: {
      minWidth: 235
    },
    root: {
      display: 'flex',
      minHeight: 0,
      position: 'relative',
      zIndex: theme.zIndex.appBar - 2
    },
    toggle: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid ".concat(theme.palette.shades.dark),
      borderRadius: 0,
      height: '48px',
      left: '100%',
      marginTop: '1rem',
      padding: 2,
      position: 'absolute',
      width: '23px',
      zIndex: theme.zIndex.drawer
    },
    toggleButton: {
      marginBottom: 12,
      marginTop: 12,
      padding: 0
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('CompanionArea'));
var _default = exports["default"] = enhance(_CompanionArea.CompanionArea);