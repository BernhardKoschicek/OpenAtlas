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
var actions = _interopRequireWildcard(require("../state/actions"));
var _selectors = require("../state/selectors");
var _ChangeThemeDialog = require("../components/ChangeThemeDialog");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ChangeThemeDialog
 * @private
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref) {
  var windowId = _ref.windowId;
  return {
    setSelectedTheme: function setSelectedTheme(theme) {
      return dispatch(actions.updateConfig({
        selectedTheme: theme
      }));
    }
  };
};

/**
 * mapStateToProps - to hook up connect
 * @memberof ChangeThemeDialog
 * @private
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    selectedTheme: (0, _selectors.getConfig)(state).selectedTheme,
    themeIds: (0, _selectors.getThemeIds)(state)
  };
};

/** */
var styles = function styles(theme) {
  return {
    dark: {
      color: '#000000'
    },
    dialogContent: {
      padding: 0
    },
    light: {
      color: '#BDBDBD'
    },
    listitem: {
      '&:focus': {
        backgroundColor: theme.palette.action.focus
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      },
      cursor: 'pointer'
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('ChangeThemeDialog'));
var _default = exports["default"] = enhance(_ChangeThemeDialog.ChangeThemeDialog);