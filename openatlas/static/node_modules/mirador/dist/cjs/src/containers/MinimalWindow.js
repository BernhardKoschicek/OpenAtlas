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
var actions = _interopRequireWildcard(require("../state/actions"));
var _MinimalWindow = require("../components/MinimalWindow");
var _selectors = require("../state/selectors");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** mapStateToProps */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    allowClose: (0, _selectors.getWindowConfig)(state, {
      windowId: windowId
    }).allowClose,
    allowWindowSideBar: (0, _selectors.getWindowConfig)(state, {
      windowId: windowId
    }).allowWindowSideBar
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
    removeWindow: function removeWindow() {
      return dispatch(actions.removeWindow(windowId));
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
    button: {
      marginLeft: 'auto'
    },
    title: _objectSpread(_objectSpread({}, theme.typography.h6), {}, {
      flexGrow: 1,
      paddingLeft: theme.spacing(0.5)
    }),
    window: {
      backgroundColor: theme.palette.shades.dark,
      borderRadius: 0,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      overflow: 'hidden',
      width: '100%'
    },
    windowTopBarStyle: {
      backgroundColor: theme.palette.shades.main,
      borderTop: '2px solid transparent',
      minHeight: 32,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5)
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('MinimalWindow'));
var _default = exports["default"] = enhance(_MinimalWindow.MinimalWindow);