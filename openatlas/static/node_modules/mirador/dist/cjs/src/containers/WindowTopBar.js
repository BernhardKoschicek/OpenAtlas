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
var actions = _interopRequireWildcard(require("../state/actions"));
var _selectors = require("../state/selectors");
var _WindowTopBar = require("../components/WindowTopBar");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/** mapStateToProps */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  var config = (0, _selectors.getWindowConfig)(state, {
    windowId: windowId
  });
  return {
    allowClose: config.allowClose,
    allowFullscreen: config.allowFullscreen,
    allowMaximize: config.allowMaximize,
    allowTopMenuButton: config.allowTopMenuButton,
    allowWindowSideBar: config.allowWindowSideBar,
    focused: (0, _selectors.isFocused)(state, {
      windowId: windowId
    }),
    maximized: config.maximized
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    focusWindow: function focusWindow() {
      return dispatch(actions.focusWindow(windowId));
    },
    maximizeWindow: function maximizeWindow() {
      return dispatch(actions.maximizeWindow(windowId));
    },
    minimizeWindow: function minimizeWindow() {
      return dispatch(actions.minimizeWindow(windowId));
    },
    removeWindow: function removeWindow() {
      return dispatch(actions.removeWindow(windowId));
    },
    toggleWindowSideBar: function toggleWindowSideBar() {
      return dispatch(actions.toggleWindowSideBar(windowId));
    }
  };
};

/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */
var styles = function styles(theme) {
  return {
    focused: {},
    windowTopBarStyle: {
      '&$focused': {
        borderTop: "2px solid ".concat(theme.palette.primary.main)
      },
      backgroundColor: theme.palette.shades.main,
      borderTop: '2px solid transparent',
      minHeight: 32,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5)
    },
    windowTopBarStyleDraggable: {
      cursor: 'move'
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('WindowTopBar'));
var _default = exports["default"] = enhance(_WindowTopBar.WindowTopBar);