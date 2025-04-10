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
import cn from 'classnames';
import Paper from '@material-ui/core/Paper';
import { MosaicWindowContext } from 'react-mosaic-component/lib/contextTypes';
import ns from '../config/css-ns';
import WindowTopBar from '../containers/WindowTopBar';
import PrimaryWindow from '../containers/PrimaryWindow';
import CompanionArea from '../containers/CompanionArea';
import MinimalWindow from '../containers/MinimalWindow';
import ErrorContent from '../containers/ErrorContent';
import IIIFAuthentication from '../containers/IIIFAuthentication';
import { PluginHook } from './PluginHook';

/**
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
export var Window = /*#__PURE__*/function (_Component) {
  /** */
  function Window(props) {
    var _this;
    _classCallCheck(this, Window);
    _this = _callSuper(this, Window, [props]);
    _this.state = {};
    return _this;
  }

  /** */
  _inherits(Window, _Component);
  return _createClass(Window, [{
    key: "wrappedTopBar",
    value:
    /**
     * wrappedTopBar - will conditionally wrap a WindowTopBar for needed
     * additional functionality based on workspace type
     */
    function wrappedTopBar() {
      var _this$props = this.props,
        windowId = _this$props.windowId,
        workspaceType = _this$props.workspaceType,
        windowDraggable = _this$props.windowDraggable;
      var topBar = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(WindowTopBar, {
        windowId: windowId,
        windowDraggable: windowDraggable
      }), /*#__PURE__*/React.createElement(IIIFAuthentication, {
        windowId: windowId
      }));
      if (workspaceType === 'mosaic' && windowDraggable) {
        var mosaicWindowActions = this.context.mosaicWindowActions;
        return mosaicWindowActions.connectDragSource(topBar);
      }
      return topBar;
    }

    /**
     * Renders things
     */
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        focusWindow = _this$props2.focusWindow,
        label = _this$props2.label,
        isFetching = _this$props2.isFetching,
        maximized = _this$props2.maximized,
        sideBarOpen = _this$props2.sideBarOpen,
        view = _this$props2.view,
        windowId = _this$props2.windowId,
        classes = _this$props2.classes,
        t = _this$props2.t,
        manifestError = _this$props2.manifestError;
      var _this$state = this.state,
        error = _this$state.error,
        hasError = _this$state.hasError;
      if (hasError) {
        return /*#__PURE__*/React.createElement(MinimalWindow, {
          windowId: windowId
        }, /*#__PURE__*/React.createElement(ErrorContent, {
          error: error,
          windowId: windowId
        }));
      }
      return /*#__PURE__*/React.createElement(Paper, {
        onFocus: focusWindow,
        component: "section",
        elevation: 1,
        id: windowId,
        className: cn(classes.window, ns('window'), maximized ? classes.maximized : null),
        "aria-label": t('window', {
          label: label
        })
      }, this.wrappedTopBar(), manifestError && /*#__PURE__*/React.createElement(ErrorContent, {
        error: {
          stack: manifestError
        },
        windowId: windowId
      }), /*#__PURE__*/React.createElement("div", {
        className: classes.middle
      }, /*#__PURE__*/React.createElement("div", {
        className: classes.middleLeft
      }, /*#__PURE__*/React.createElement("div", {
        className: classes.primaryWindow
      }, /*#__PURE__*/React.createElement(PrimaryWindow, {
        view: view,
        windowId: windowId,
        isFetching: isFetching,
        sideBarOpen: sideBarOpen
      })), /*#__PURE__*/React.createElement("div", {
        className: classes.companionAreaBottom
      }, /*#__PURE__*/React.createElement(CompanionArea, {
        windowId: windowId,
        position: "bottom"
      }))), /*#__PURE__*/React.createElement("div", {
        className: classes.companionAreaRight
      }, /*#__PURE__*/React.createElement(CompanionArea, {
        windowId: windowId,
        position: "right"
      }), /*#__PURE__*/React.createElement(CompanionArea, {
        windowId: windowId,
        position: "far-right"
      }))), /*#__PURE__*/React.createElement(CompanionArea, {
        windowId: windowId,
        position: "far-bottom"
      }), /*#__PURE__*/React.createElement(PluginHook, this.props));
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return {
        error: error,
        hasError: true
      };
    }
  }]);
}(Component);
Window.contextType = MosaicWindowContext;
Window.defaultProps = {
  classes: {},
  focusWindow: function focusWindow() {},
  isFetching: false,
  label: null,
  manifestError: null,
  maximized: false,
  sideBarOpen: false,
  view: undefined,
  windowDraggable: null,
  workspaceType: null
};