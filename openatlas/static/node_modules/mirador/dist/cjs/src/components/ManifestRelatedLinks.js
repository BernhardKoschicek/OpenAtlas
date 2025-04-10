"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManifestRelatedLinks = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _Link = _interopRequireDefault(require("@material-ui/core/Link"));
var _classnames = _interopRequireDefault(require("classnames"));
var _CollapsibleSection = _interopRequireDefault(require("../containers/CollapsibleSection"));
var _cssNs = _interopRequireDefault(require("../config/css-ns"));
var _PluginHook = require("./PluginHook");
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
 * ManifestRelatedLinks
 */
var ManifestRelatedLinks = exports.ManifestRelatedLinks = /*#__PURE__*/function (_Component) {
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
      return /*#__PURE__*/_react["default"].createElement(_CollapsibleSection["default"], {
        id: "".concat(id, "-related"),
        label: t('related')
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        "aria-labelledby": "".concat(id, "-related ").concat(id, "-related-heading"),
        id: "".concat(id, "-related-heading"),
        variant: "h4",
        component: "h5"
      }, t('links')), /*#__PURE__*/_react["default"].createElement("dl", {
        className: (0, _classnames["default"])((0, _cssNs["default"])('label-value-metadata'), classes.labelValueMetadata)
      }, homepage && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "subtitle2",
        component: "dt"
      }, t('iiif_homepage')), homepage.map(function (page) {
        return /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
          key: page.value,
          variant: "body1",
          component: "dd"
        }, /*#__PURE__*/_react["default"].createElement(_Link["default"], {
          target: "_blank",
          rel: "noopener noreferrer",
          href: page.value
        }, page.label || page.value));
      })), renderings && renderings.length > 0 && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "subtitle2",
        component: "dt"
      }, t('iiif_renderings')), renderings.map(function (rendering) {
        return /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
          key: rendering.value,
          variant: "body1",
          component: "dd"
        }, /*#__PURE__*/_react["default"].createElement(_Link["default"], {
          target: "_blank",
          rel: "noopener noreferrer",
          href: rendering.value
        }, rendering.label || rendering.value));
      })), seeAlso && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "subtitle2",
        component: "dt"
      }, t('iiif_seeAlso')), seeAlso.map(function (related) {
        return /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
          key: related.value,
          variant: "body1",
          component: "dd"
        }, /*#__PURE__*/_react["default"].createElement(_Link["default"], {
          target: "_blank",
          rel: "noopener noreferrer",
          href: related.value
        }, related.label || related.value), related.format && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
          component: "span"
        }, " (".concat(related.format, ")")));
      })), manifestUrl && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "subtitle2",
        component: "dt"
      }, t('iiif_manifest')), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "body1",
        component: "dd"
      }, /*#__PURE__*/_react["default"].createElement(_Link["default"], {
        target: "_blank",
        rel: "noopener noreferrer",
        href: manifestUrl
      }, manifestUrl)))), /*#__PURE__*/_react["default"].createElement(_PluginHook.PluginHook, this.props));
    }
  }]);
}(_react.Component);
ManifestRelatedLinks.defaultProps = {
  homepage: null,
  manifestUrl: null,
  renderings: null,
  seeAlso: null,
  t: function t(key) {
    return key;
  }
};