"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IIIFAuthentication = void 0;
var _react = _interopRequireWildcard(require("react"));
var _AccessTokenSender = require("./AccessTokenSender");
var _NewWindow = require("./NewWindow");
var _WindowAuthenticationBar = _interopRequireDefault(require("../containers/WindowAuthenticationBar"));
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
var IIIFAuthentication = exports.IIIFAuthentication = /*#__PURE__*/function (_Component) {
  /** */
  function IIIFAuthentication(props) {
    var _this;
    _classCallCheck(this, IIIFAuthentication);
    _this = _callSuper(this, IIIFAuthentication, [props]);
    _this.performLogout = _this.performLogout.bind(_this);
    _this.onReceiveAccessTokenMessage = _this.onReceiveAccessTokenMessage.bind(_this);
    return _this;
  }

  /** */
  _inherits(IIIFAuthentication, _Component);
  return _createClass(IIIFAuthentication, [{
    key: "onReceiveAccessTokenMessage",
    value: function onReceiveAccessTokenMessage(payload) {
      var _this$props = this.props,
        authServiceId = _this$props.authServiceId,
        accessTokenServiceId = _this$props.accessTokenServiceId,
        resolveAccessTokenRequest = _this$props.resolveAccessTokenRequest;
      resolveAccessTokenRequest(authServiceId, accessTokenServiceId, payload);
    }

    /** */
  }, {
    key: "defaultAuthBarProps",
    value: function defaultAuthBarProps() {
      var _this$props2 = this.props,
        authServiceId = _this$props2.authServiceId,
        windowId = _this$props2.windowId,
        status = _this$props2.status,
        logoutServiceId = _this$props2.logoutServiceId;
      return {
        authServiceId: authServiceId,
        hasLogoutService: !!logoutServiceId,
        status: status,
        windowId: windowId
      };
    }

    /** handle the IIIF logout workflow */
  }, {
    key: "performLogout",
    value: function performLogout() {
      var _this$props3 = this.props,
        accessTokenServiceId = _this$props3.accessTokenServiceId,
        authServiceId = _this$props3.authServiceId,
        features = _this$props3.features,
        logoutServiceId = _this$props3.logoutServiceId,
        resetAuthenticationState = _this$props3.resetAuthenticationState,
        openWindow = _this$props3.openWindow;
      openWindow(logoutServiceId, undefined, features);
      resetAuthenticationState({
        authServiceId: authServiceId,
        tokenServiceId: accessTokenServiceId
      });
    }

    /** Render the auth bar for logged in users */
  }, {
    key: "renderLoggedIn",
    value: function renderLoggedIn() {
      var _this$props4 = this.props,
        isInteractive = _this$props4.isInteractive,
        logoutConfirm = _this$props4.logoutConfirm,
        t = _this$props4.t;
      if (!isInteractive) return null;
      return /*#__PURE__*/_react["default"].createElement(_WindowAuthenticationBar["default"], Object.assign({
        confirmButton: logoutConfirm || t('logout'),
        onConfirm: this.performLogout
      }, this.defaultAuthBarProps()));
    }

    /** Render whatever shows up after the interactive login attempt fails */
  }, {
    key: "renderFailure",
    value: function renderFailure() {
      var _this$props5 = this.props,
        handleAuthInteraction = _this$props5.handleAuthInteraction,
        header = _this$props5.failureHeader,
        description = _this$props5.failureDescription,
        t = _this$props5.t,
        authServiceId = _this$props5.authServiceId,
        windowId = _this$props5.windowId;
      return /*#__PURE__*/_react["default"].createElement(_WindowAuthenticationBar["default"], Object.assign({
        header: header,
        description: description,
        confirmButton: t('retry'),
        onConfirm: function onConfirm() {
          return handleAuthInteraction(windowId, authServiceId);
        }
      }, this.defaultAuthBarProps()));
    }

    /** Render the login bar after we're logging in */
  }, {
    key: "renderLoggingInCookie",
    value: function renderLoggingInCookie() {
      var _this$props6 = this.props,
        accessTokenServiceId = _this$props6.accessTokenServiceId,
        authServiceId = _this$props6.authServiceId,
        resolveAuthenticationRequest = _this$props6.resolveAuthenticationRequest,
        features = _this$props6.features;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, this.renderLogin(), /*#__PURE__*/_react["default"].createElement(_NewWindow.NewWindow, {
        name: "IiifLoginSender",
        url: "".concat(authServiceId, "?origin=").concat(window.origin),
        features: features,
        onClose: function onClose() {
          return resolveAuthenticationRequest(authServiceId, accessTokenServiceId);
        }
      }));
    }

    /** Render the login bar after we're logging in */
  }, {
    key: "renderLoggingInToken",
    value: function renderLoggingInToken() {
      var accessTokenServiceId = this.props.accessTokenServiceId;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, this.renderLogin(), /*#__PURE__*/_react["default"].createElement(_AccessTokenSender.AccessTokenSender, {
        handleAccessTokenMessage: this.onReceiveAccessTokenMessage,
        url: accessTokenServiceId
      }));
    }

    /** Render a login bar */
  }, {
    key: "renderLogin",
    value: function renderLogin() {
      var _this$props7 = this.props,
        confirm = _this$props7.confirm,
        description = _this$props7.description,
        handleAuthInteraction = _this$props7.handleAuthInteraction,
        header = _this$props7.header,
        isInteractive = _this$props7.isInteractive,
        label = _this$props7.label,
        authServiceId = _this$props7.authServiceId,
        windowId = _this$props7.windowId;
      if (!isInteractive) return null;
      return /*#__PURE__*/_react["default"].createElement(_WindowAuthenticationBar["default"], Object.assign({
        header: header,
        description: description,
        label: label,
        confirmButton: confirm,
        onConfirm: function onConfirm() {
          return handleAuthInteraction(windowId, authServiceId);
        }
      }, this.defaultAuthBarProps()));
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this$props8 = this.props,
        authServiceId = _this$props8.authServiceId,
        status = _this$props8.status;
      if (!authServiceId) return null;
      if (status === null) return this.renderLogin();
      if (status === 'cookie') return this.renderLoggingInCookie();
      if (status === 'token') return this.renderLoggingInToken();
      if (status === 'failed') return this.renderFailure();
      if (status === 'ok') return this.renderLoggedIn();
      return null;
    }
  }]);
}(_react.Component);
IIIFAuthentication.defaultProps = {
  confirm: undefined,
  description: undefined,
  failureDescription: undefined,
  failureHeader: undefined,
  features: 'centerscreen',
  header: undefined,
  isInteractive: true,
  label: undefined,
  logoutConfirm: undefined,
  logoutServiceId: undefined,
  openWindow: window.open,
  status: null,
  t: function t(k) {
    return k;
  }
};