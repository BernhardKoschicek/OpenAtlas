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
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ZoomControls from '../containers/ZoomControls';
import ViewerInfo from '../containers/ViewerInfo';
import ViewerNavigation from '../containers/ViewerNavigation';
import ns from '../config/css-ns';
import { PluginHook } from './PluginHook';

/**
 * Represents the viewer controls in the mirador workspace.
 */
export var WindowCanvasNavigationControls = /*#__PURE__*/function (_Component) {
  function WindowCanvasNavigationControls() {
    _classCallCheck(this, WindowCanvasNavigationControls);
    return _callSuper(this, WindowCanvasNavigationControls, arguments);
  }
  _inherits(WindowCanvasNavigationControls, _Component);
  return _createClass(WindowCanvasNavigationControls, [{
    key: "canvasNavControlsAreStacked",
    value:
    /**
     * Determine if canvasNavControls are stacked (based on a hard-coded width)
    */
    function canvasNavControlsAreStacked() {
      var size = this.props.size;
      return size && size.width && size.width <= 253;
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        visible = _this$props.visible,
        windowId = _this$props.windowId,
        zoomToWorld = _this$props.zoomToWorld;
      if (!visible) return /*#__PURE__*/React.createElement(Typography, {
        variant: "srOnly",
        component: "div"
      }, /*#__PURE__*/React.createElement(ViewerInfo, {
        windowId: windowId
      }));
      return /*#__PURE__*/React.createElement(Paper, {
        square: true,
        className: classNames(classes.controls, ns('canvas-nav'), classes.canvasNav, this.canvasNavControlsAreStacked() ? ns('canvas-nav-stacked') : null, this.canvasNavControlsAreStacked() ? classes.canvasNavStacked : null),
        elevation: 0
      }, /*#__PURE__*/React.createElement(ZoomControls, {
        displayDivider: !this.canvasNavControlsAreStacked(),
        windowId: windowId,
        zoomToWorld: zoomToWorld
      }), /*#__PURE__*/React.createElement(ViewerNavigation, {
        windowId: windowId
      }), /*#__PURE__*/React.createElement(ViewerInfo, {
        windowId: windowId
      }), /*#__PURE__*/React.createElement(PluginHook, this.props));
    }
  }]);
}(Component);
WindowCanvasNavigationControls.defaultProps = {
  classes: {},
  visible: true
};