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
import classNames from 'classnames';
import CollapsibleSection from '../containers/CollapsibleSection';
import ns from '../config/css-ns';
import { PluginHook } from './PluginHook';

/**
 * ManifestRelatedLinks
 */
export var ManifestRelatedLinks = /*#__PURE__*/function (_Component) {
  function ManifestRelatedLinks() {
    _classCallCheck(this, ManifestRelatedLinks);
    return _callSuper(this, ManifestRelatedLinks, arguments);
  }
  _inherits(ManifestRelatedLinks, _Component);
  return _createClass(ManifestRelatedLinks, [{
    key: "render",
    value:
    /**
     * render
     * @return
     */
    function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        homepage = _this$props.homepage,
        manifestUrl = _this$props.manifestUrl,
        renderings = _this$props.renderings,
        seeAlso = _this$props.seeAlso,
        id = _this$props.id,
        t = _this$props.t;
      return /*#__PURE__*/React.createElement(CollapsibleSection, {
        id: "".concat(id, "-related"),
        label: t('related')
      }, /*#__PURE__*/React.createElement(Typography, {
        "aria-labelledby": "".concat(id, "-related ").concat(id, "-related-heading"),
        id: "".concat(id, "-related-heading"),
        variant: "h4",
        component: "h5"
      }, t('links')), /*#__PURE__*/React.createElement("dl", {
        className: classNames(ns('label-value-metadata'), classes.labelValueMetadata)
      }, homepage && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2",
        component: "dt"
      }, t('iiif_homepage')), homepage.map(function (page) {
        return /*#__PURE__*/React.createElement(Typography, {
          key: page.value,
          variant: "body1",
          component: "dd"
        }, /*#__PURE__*/React.createElement(Link, {
          target: "_blank",
          rel: "noopener noreferrer",
          href: page.value
        }, page.label || page.value));
      })), renderings && renderings.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2",
        component: "dt"
      }, t('iiif_renderings')), renderings.map(function (rendering) {
        return /*#__PURE__*/React.createElement(Typography, {
          key: rendering.value,
          variant: "body1",
          component: "dd"
        }, /*#__PURE__*/React.createElement(Link, {
          target: "_blank",
          rel: "noopener noreferrer",
          href: rendering.value
        }, rendering.label || rendering.value));
      })), seeAlso && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2",
        component: "dt"
      }, t('iiif_seeAlso')), seeAlso.map(function (related) {
        return /*#__PURE__*/React.createElement(Typography, {
          key: related.value,
          variant: "body1",
          component: "dd"
        }, /*#__PURE__*/React.createElement(Link, {
          target: "_blank",
          rel: "noopener noreferrer",
          href: related.value
        }, related.label || related.value), related.format && /*#__PURE__*/React.createElement(Typography, {
          component: "span"
        }, " (".concat(related.format, ")")));
      })), manifestUrl && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2",
        component: "dt"
      }, t('iiif_manifest')), /*#__PURE__*/React.createElement(Typography, {
        variant: "body1",
        component: "dd"
      }, /*#__PURE__*/React.createElement(Link, {
        target: "_blank",
        rel: "noopener noreferrer",
        href: manifestUrl
      }, manifestUrl)))), /*#__PURE__*/React.createElement(PluginHook, this.props));
    }
  }]);
}(Component);
ManifestRelatedLinks.defaultProps = {
  homepage: null,
  manifestUrl: null,
  renderings: null,
  seeAlso: null,
  t: function t(key) {
    return key;
  }
};