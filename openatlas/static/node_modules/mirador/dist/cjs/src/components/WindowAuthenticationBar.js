"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowAuthenticationBar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));
var _Collapse = _interopRequireDefault(require("@material-ui/core/Collapse"));
var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _LockSharp = _interopRequireDefault(require("@material-ui/icons/LockSharp"));
var _SanitizedHtml = _interopRequireDefault(require("../containers/SanitizedHtml"));
var _PluginHook = require("./PluginHook");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
/** */
var WindowAuthenticationBar = exports.WindowAuthenticationBar = /*#__PURE__*/function (_Component) {
  /** */
  function WindowAuthenticationBar(props) {
    var _this;
    _classCallCheck(this, WindowAuthenticationBar);
    _this = _callSuper(this, WindowAuthenticationBar, [props]);
    _this.state = {
      open: false
    };
    _this.setOpen = _this.setOpen.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    return _this;
  }

  /** */
  _inherits(WindowAuthenticationBar, _Component);
  return _createClass(WindowAuthenticationBar, [{
    key: "onSubmit",
    value: function onSubmit() {
      var onConfirm = this.props.onConfirm;
      this.setOpen(false);
      onConfirm();
    }

    /** Toggle the full description */
  }, {
    key: "setOpen",
    value: function setOpen(open) {
      this.setState(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          open: open
        });
      });
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        confirmButton = _this$props.confirmButton,
        continueLabel = _this$props.continueLabel,
        header = _this$props.header,
        description = _this$props.description,
        icon = _this$props.icon,
        label = _this$props.label,
        t = _this$props.t,
        ruleSet = _this$props.ruleSet,
        hasLogoutService = _this$props.hasLogoutService,
        status = _this$props.status,
        ConfirmProps = _this$props.ConfirmProps;
      if (status === 'ok' && !hasLogoutService) return null;
      var open = this.state.open;
      var button = /*#__PURE__*/_react["default"].createElement(_Button["default"], Object.assign({
        onClick: this.onSubmit,
        className: classes.buttonInvert,
        color: "secondary"
      }, ConfirmProps), confirmButton || t('login'));
      if (!description && !header) {
        return /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
          square: true,
          elevation: 4,
          color: "secondary",
          classes: {
            root: classes.paper
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: classes.topBar
        }, icon || /*#__PURE__*/_react["default"].createElement(_LockSharp["default"], {
          className: classes.icon
        }), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
          className: classes.label,
          component: "h3",
          variant: "body1",
          color: "inherit"
        }, ruleSet ? /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
          htmlString: label,
          ruleSet: ruleSet
        }) : label), /*#__PURE__*/_react["default"].createElement(_PluginHook.PluginHook, this.props), button));
      }
      return /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
        square: true,
        elevation: 4,
        color: "secondary",
        classes: {
          root: classes.paper
        }
      }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        fullWidth: true,
        className: classes.topBar,
        onClick: function onClick() {
          return _this2.setOpen(true);
        },
        component: "div",
        color: "inherit"
      }, icon || /*#__PURE__*/_react["default"].createElement(_LockSharp["default"], {
        className: classes.icon
      }), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        className: classes.label,
        component: "h3",
        variant: "body1",
        color: "inherit"
      }, ruleSet ? /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
        htmlString: label,
        ruleSet: ruleSet
      }) : label), /*#__PURE__*/_react["default"].createElement(_PluginHook.PluginHook, this.props), /*#__PURE__*/_react["default"].createElement("span", {
        className: classes.fauxButton
      }, !open && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "button",
        color: "inherit"
      }, continueLabel || t('continue')))), /*#__PURE__*/_react["default"].createElement(_Collapse["default"], {
        "in": open,
        onClose: function onClose() {
          return _this2.setOpen(false);
        }
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "body1",
        color: "inherit",
        className: classes.expanded
      }, ruleSet ? /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
        htmlString: header,
        ruleSet: ruleSet
      }) : header, header && description ? ': ' : '', ruleSet ? /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
        htmlString: description,
        ruleSet: ruleSet
      }) : description), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        onClick: function onClick() {
          return _this2.setOpen(false);
        },
        color: "inherit"
      }, t('cancel')), button)));
    }
  }]);
}(_react.Component);
WindowAuthenticationBar.defaultProps = {
  confirmButton: undefined,
  ConfirmProps: {},
  continueLabel: undefined,
  description: undefined,
  hasLogoutService: true,
  header: undefined,
  icon: undefined,
  ruleSet: 'iiif',
  status: undefined,
  t: function t(k) {
    return k;
  }
};