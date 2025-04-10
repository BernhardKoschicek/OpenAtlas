"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinimalWindow = void 0;
var _react = _interopRequireWildcard(require("react"));
var _MenuSharp = _interopRequireDefault(require("@material-ui/icons/MenuSharp"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));
var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));
var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _CloseSharp = _interopRequireDefault(require("@material-ui/icons/CloseSharp"));
var _MiradorMenuButton = _interopRequireDefault(require("../containers/MiradorMenuButton"));
var _cssNs = _interopRequireDefault(require("../config/css-ns"));
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
/** */
var MinimalWindow = exports.MinimalWindow = /*#__PURE__*/function (_Component) {
  function MinimalWindow() {
    _classCallCheck(this, MinimalWindow);
    return _callSuper(this, MinimalWindow, arguments);
  }
  _inherits(MinimalWindow, _Component);
  return _createClass(MinimalWindow, [{
    key: "render",
    value: /** */
    function render() {
      var _this$props = this.props,
        allowClose = _this$props.allowClose,
        allowWindowSideBar = _this$props.allowWindowSideBar,
        ariaLabel = _this$props.ariaLabel,
        children = _this$props.children,
        classes = _this$props.classes,
        label = _this$props.label,
        removeWindow = _this$props.removeWindow,
        t = _this$props.t,
        windowId = _this$props.windowId;
      return /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
        component: "section",
        elevation: 1,
        id: windowId,
        className: (0, _classnames["default"])(classes.window, (0, _cssNs["default"])('placeholder-window')),
        "aria-label": label && ariaLabel ? t('window', {
          label: label
        }) : null
      }, /*#__PURE__*/_react["default"].createElement(_AppBar["default"], {
        position: "relative",
        color: "default"
      }, /*#__PURE__*/_react["default"].createElement(_Toolbar["default"], {
        disableGutters: true,
        className: (0, _classnames["default"])(classes.windowTopBarStyle, (0, _cssNs["default"])('window-top-bar')),
        variant: "dense"
      }, allowWindowSideBar && /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('toggleWindowSideBar'),
        disabled: true
      }, /*#__PURE__*/_react["default"].createElement(_MenuSharp["default"], null)), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "h2",
        noWrap: true,
        color: "inherit",
        className: classes.title
      }, label), allowClose && removeWindow && /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('closeWindow'),
        className: (0, _classnames["default"])(classes.button, (0, _cssNs["default"])('window-close')),
        onClick: removeWindow,
        TooltipProps: {
          tabIndex: ariaLabel ? '0' : '-1'
        }
      }, /*#__PURE__*/_react["default"].createElement(_CloseSharp["default"], null)))), children);
    }
  }]);
}(_react.Component);
MinimalWindow.defaultProps = {
  allowClose: true,
  allowWindowSideBar: true,
  ariaLabel: true,
  children: null,
  classes: {},
  label: '',
  removeWindow: function removeWindow() {},
  t: function t(key) {
    return key;
  }
};