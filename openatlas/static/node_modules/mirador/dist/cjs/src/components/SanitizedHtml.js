"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SanitizedHtml = void 0;
var _react = _interopRequireWildcard(require("react"));
var _dompurify = _interopRequireDefault(require("dompurify"));
var _cssNs = _interopRequireDefault(require("../config/css-ns"));
var _htmlRules = _interopRequireDefault(require("../lib/htmlRules"));
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
*/
var SanitizedHtml = exports.SanitizedHtml = /*#__PURE__*/function (_Component) {
  function SanitizedHtml() {
    _classCallCheck(this, SanitizedHtml);
    return _callSuper(this, SanitizedHtml, arguments);
  }
  _inherits(SanitizedHtml, _Component);
  return _createClass(SanitizedHtml, [{
    key: "render",
    value:
    /**
    */
    function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        htmlString = _this$props.htmlString,
        ruleSet = _this$props.ruleSet;

      // Add a hook to make all links open a new window
      _dompurify["default"].addHook('afterSanitizeAttributes', function (node) {
        // set all elements owning target to target=_blank
        if ('target' in node) {
          node.setAttribute('target', '_blank');
          // prevent https://www.owasp.org/index.php/Reverse_Tabnabbing
          node.setAttribute('rel', 'noopener noreferrer');
        }
      });
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: [classes.root, (0, _cssNs["default"])('third-party-html')].join(' '),
        dangerouslySetInnerHTML: {
          // eslint-disable-line react/no-danger
          __html: _dompurify["default"].sanitize(htmlString, _htmlRules["default"][ruleSet])
        }
      });
    }
  }]);
}(_react.Component);
SanitizedHtml.defaultProps = {
  classes: {}
};