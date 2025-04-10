"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowTopBar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _MenuSharp = _interopRequireDefault(require("@material-ui/icons/MenuSharp"));
var _CloseSharp = _interopRequireDefault(require("@material-ui/icons/CloseSharp"));
var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));
var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));
var _classnames = _interopRequireDefault(require("classnames"));
var _WindowTopMenuButton = _interopRequireDefault(require("../containers/WindowTopMenuButton"));
var _WindowTopBarPluginArea = _interopRequireDefault(require("../containers/WindowTopBarPluginArea"));
var _WindowTopBarPluginMenu = _interopRequireDefault(require("../containers/WindowTopBarPluginMenu"));
var _WindowTopBarTitle = _interopRequireDefault(require("../containers/WindowTopBarTitle"));
var _MiradorMenuButton = _interopRequireDefault(require("../containers/MiradorMenuButton"));
var _FullScreenButton = _interopRequireDefault(require("../containers/FullScreenButton"));
var _WindowMaxIcon = _interopRequireDefault(require("./icons/WindowMaxIcon"));
var _WindowMinIcon = _interopRequireDefault(require("./icons/WindowMinIcon"));
var _cssNs = _interopRequireDefault(require("../config/css-ns"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == typeof e || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * WindowTopBar
 */
var WindowTopBar = exports.WindowTopBar = /*#__PURE__*/function (_Component) {
  function WindowTopBar() {
    _classCallCheck(this, WindowTopBar);
    return _callSuper(this, WindowTopBar, arguments);
  }
  _inherits(WindowTopBar, _Component);
  return _createClass(WindowTopBar, [{
    key: "render",
    value:
    /**
     * render
     * @return
     */
    function render() {
      var _this$props = this.props,
        removeWindow = _this$props.removeWindow,
        windowId = _this$props.windowId,
        classes = _this$props.classes,
        toggleWindowSideBar = _this$props.toggleWindowSideBar,
        t = _this$props.t,
        windowDraggable = _this$props.windowDraggable,
        maximizeWindow = _this$props.maximizeWindow,
        maximized = _this$props.maximized,
        minimizeWindow = _this$props.minimizeWindow,
        focused = _this$props.focused,
        allowClose = _this$props.allowClose,
        allowMaximize = _this$props.allowMaximize,
        focusWindow = _this$props.focusWindow,
        allowFullscreen = _this$props.allowFullscreen,
        allowTopMenuButton = _this$props.allowTopMenuButton,
        allowWindowSideBar = _this$props.allowWindowSideBar;
      return /*#__PURE__*/_react["default"].createElement(_AppBar["default"], {
        position: "relative",
        color: "default"
      }, /*#__PURE__*/_react["default"].createElement("nav", {
        "aria-label": t('windowNavigation')
      }, /*#__PURE__*/_react["default"].createElement(_Toolbar["default"], {
        disableGutters: true,
        onMouseDown: focusWindow,
        className: (0, _classnames["default"])(classes.windowTopBarStyle, windowDraggable ? classes.windowTopBarStyleDraggable : null, focused ? classes.focused : null, (0, _cssNs["default"])('window-top-bar')),
        variant: "dense"
      }, allowWindowSideBar && /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('toggleWindowSideBar'),
        onClick: toggleWindowSideBar
      }, /*#__PURE__*/_react["default"].createElement(_MenuSharp["default"], null)), /*#__PURE__*/_react["default"].createElement(_WindowTopBarTitle["default"], {
        windowId: windowId
      }), allowTopMenuButton && /*#__PURE__*/_react["default"].createElement(_WindowTopMenuButton["default"], {
        className: (0, _cssNs["default"])('window-menu-btn'),
        windowId: windowId
      }), /*#__PURE__*/_react["default"].createElement(_WindowTopBarPluginArea["default"], {
        windowId: windowId
      }), /*#__PURE__*/_react["default"].createElement(_WindowTopBarPluginMenu["default"], {
        windowId: windowId
      }), allowMaximize && /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": maximized ? t('minimizeWindow') : t('maximizeWindow'),
        className: (0, _cssNs["default"])('window-maximize'),
        onClick: maximized ? minimizeWindow : maximizeWindow
      }, maximized ? /*#__PURE__*/_react["default"].createElement(_WindowMinIcon["default"], null) : /*#__PURE__*/_react["default"].createElement(_WindowMaxIcon["default"], null)), allowFullscreen && /*#__PURE__*/_react["default"].createElement(_FullScreenButton["default"], null), allowClose && /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('closeWindow'),
        className: (0, _cssNs["default"])('window-close'),
        onClick: removeWindow
      }, /*#__PURE__*/_react["default"].createElement(_CloseSharp["default"], null)))));
    }
  }]);
}(_react.Component);
WindowTopBar.defaultProps = {
  allowClose: true,
  allowFullscreen: false,
  allowMaximize: true,
  allowTopMenuButton: true,
  allowWindowSideBar: true,
  focused: false,
  focusWindow: function focusWindow() {},
  maximized: false,
  maximizeWindow: function maximizeWindow() {},
  minimizeWindow: function minimizeWindow() {},
  t: function t(key) {
    return key;
  },
  windowDraggable: true
};