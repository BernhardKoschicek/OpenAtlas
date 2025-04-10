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
import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/MenuSharp';
import CloseIcon from '@material-ui/icons/CloseSharp';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import WindowTopMenuButton from '../containers/WindowTopMenuButton';
import WindowTopBarPluginArea from '../containers/WindowTopBarPluginArea';
import WindowTopBarPluginMenu from '../containers/WindowTopBarPluginMenu';
import WindowTopBarTitle from '../containers/WindowTopBarTitle';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import FullScreenButton from '../containers/FullScreenButton';
import WindowMaxIcon from './icons/WindowMaxIcon';
import WindowMinIcon from './icons/WindowMinIcon';
import ns from '../config/css-ns';

/**
 * WindowTopBar
 */
export var WindowTopBar = /*#__PURE__*/function (_Component) {
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
      return /*#__PURE__*/React.createElement(AppBar, {
        position: "relative",
        color: "default"
      }, /*#__PURE__*/React.createElement("nav", {
        "aria-label": t('windowNavigation')
      }, /*#__PURE__*/React.createElement(Toolbar, {
        disableGutters: true,
        onMouseDown: focusWindow,
        className: classNames(classes.windowTopBarStyle, windowDraggable ? classes.windowTopBarStyleDraggable : null, focused ? classes.focused : null, ns('window-top-bar')),
        variant: "dense"
      }, allowWindowSideBar && /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t('toggleWindowSideBar'),
        onClick: toggleWindowSideBar
      }, /*#__PURE__*/React.createElement(MenuIcon, null)), /*#__PURE__*/React.createElement(WindowTopBarTitle, {
        windowId: windowId
      }), allowTopMenuButton && /*#__PURE__*/React.createElement(WindowTopMenuButton, {
        className: ns('window-menu-btn'),
        windowId: windowId
      }), /*#__PURE__*/React.createElement(WindowTopBarPluginArea, {
        windowId: windowId
      }), /*#__PURE__*/React.createElement(WindowTopBarPluginMenu, {
        windowId: windowId
      }), allowMaximize && /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": maximized ? t('minimizeWindow') : t('maximizeWindow'),
        className: ns('window-maximize'),
        onClick: maximized ? minimizeWindow : maximizeWindow
      }, maximized ? /*#__PURE__*/React.createElement(WindowMinIcon, null) : /*#__PURE__*/React.createElement(WindowMaxIcon, null)), allowFullscreen && /*#__PURE__*/React.createElement(FullScreenButton, null), allowClose && /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t('closeWindow'),
        className: ns('window-close'),
        onClick: removeWindow
      }, /*#__PURE__*/React.createElement(CloseIcon, null)))));
    }
  }]);
}(Component);
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