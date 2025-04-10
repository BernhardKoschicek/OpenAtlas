"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccessTokenSender = void 0;
var _react = _interopRequireWildcard(require("react"));
var _icomcomReact = _interopRequireDefault(require("icomcom-react"));
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
 * Opens a new window for click
 */
var AccessTokenSender = exports.AccessTokenSender = /*#__PURE__*/function (_Component) {
  /** */
  function AccessTokenSender(props) {
    var _this;
    _classCallCheck(this, AccessTokenSender);
    _this = _callSuper(this, AccessTokenSender, [props]);
    _this.onReceiveAccessTokenMessage = _this.onReceiveAccessTokenMessage.bind(_this);
    return _this;
  }

  /** @private */
  _inherits(AccessTokenSender, _Component);
  return _createClass(AccessTokenSender, [{
    key: "onReceiveAccessTokenMessage",
    value: function onReceiveAccessTokenMessage(e) {
      var _this$props = this.props,
        handleAccessTokenMessage = _this$props.handleAccessTokenMessage,
        url = _this$props.url;
      if (e.data && e.data.messageId && e.data.messageId === url) handleAccessTokenMessage(e.data);
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var url = this.props.url;
      if (!url) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);

      /**
      login, clickthrough/kiosk open @id, wait for close
      external, no-op
      */
      return /*#__PURE__*/_react["default"].createElement(_icomcomReact["default"], {
        attributes: {
          'aria-hidden': true,
          height: 1,
          src: "".concat(url, "?origin=").concat(window.origin, "&messageId=").concat(url),
          style: {
            visibility: 'hidden'
          },
          width: 1
        },
        handleReceiveMessage: this.onReceiveAccessTokenMessage
      });
    }
  }]);
}(_react.Component);
AccessTokenSender.defaultProps = {
  url: undefined
};