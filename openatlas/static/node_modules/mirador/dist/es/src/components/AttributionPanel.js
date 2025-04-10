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
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Skeleton from '@material-ui/lab/Skeleton';
import { Img } from 'react-image';
import CompanionWindow from '../containers/CompanionWindow';
import { LabelValueMetadata } from './LabelValueMetadata';
import ns from '../config/css-ns';
import { PluginHook } from './PluginHook';

/**
 * WindowSideBarInfoPanel
 */
export var AttributionPanel = /*#__PURE__*/function (_Component) {
  function AttributionPanel() {
    _classCallCheck(this, AttributionPanel);
    return _callSuper(this, AttributionPanel, arguments);
  }
  _inherits(AttributionPanel, _Component);
  return _createClass(AttributionPanel, [{
    key: "render",
    value:
    /**
     * render
     * @return
     */
    function render() {
      var _this$props = this.props,
        manifestLogo = _this$props.manifestLogo,
        requiredStatement = _this$props.requiredStatement,
        rights = _this$props.rights,
        windowId = _this$props.windowId,
        id = _this$props.id,
        classes = _this$props.classes,
        t = _this$props.t;
      return /*#__PURE__*/React.createElement(CompanionWindow, {
        title: t('attributionTitle'),
        paperClassName: ns('attribution-panel'),
        windowId: windowId,
        id: id
      }, /*#__PURE__*/React.createElement("div", {
        className: classes.section
      }, requiredStatement && /*#__PURE__*/React.createElement(LabelValueMetadata, {
        labelValuePairs: requiredStatement,
        defaultLabel: t('attribution')
      }), rights && rights.length > 0 && /*#__PURE__*/React.createElement("dl", {
        className: ns('label-value-metadata')
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2",
        component: "dt"
      }, t('rights')), rights.map(function (v) {
        return /*#__PURE__*/React.createElement(Typography, {
          variant: "body1",
          component: "dd",
          key: v.toString()
        }, /*#__PURE__*/React.createElement(Link, {
          target: "_blank",
          rel: "noopener noreferrer",
          href: v
        }, v));
      }))), manifestLogo && /*#__PURE__*/React.createElement("div", {
        className: classes.section
      }, /*#__PURE__*/React.createElement(Img, {
        src: [manifestLogo],
        alt: "",
        role: "presentation",
        className: classes.logo,
        unloader: /*#__PURE__*/React.createElement(Skeleton, {
          className: classes.placeholder,
          variant: "rect",
          height: 60,
          width: 60
        })
      })), /*#__PURE__*/React.createElement(PluginHook, this.props));
    }
  }]);
}(Component);
AttributionPanel.defaultProps = {
  classes: {},
  manifestLogo: null,
  requiredStatement: null,
  rights: null,
  t: function t(key) {
    return key;
  }
};