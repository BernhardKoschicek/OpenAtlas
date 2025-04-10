"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowListButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _BookmarksSharp = _interopRequireDefault(require("@material-ui/icons/BookmarksSharp"));
var _classnames = _interopRequireDefault(require("classnames"));
var _WindowList = _interopRequireDefault(require("../containers/WindowList"));
var _MiradorMenuButton = _interopRequireDefault(require("../containers/MiradorMenuButton"));
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
 * WindowListButton ~
*/
var WindowListButton = exports.WindowListButton = /*#__PURE__*/function (_Component) {
  /** */
  function WindowListButton(props) {
    var _this;
    _classCallCheck(this, WindowListButton);
    _this = _callSuper(this, WindowListButton, [props]);
    _this.state = {
      windowListAnchor: null
    };
    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleOpen = _this.handleOpen.bind(_this);
    return _this;
  }

  /** Set the windowListAnchor to null on window close */
  _inherits(WindowListButton, _Component);
  return _createClass(WindowListButton, [{
    key: "handleClose",
    value: function handleClose() {
      this.setState({
        windowListAnchor: null
      });
    }

    /** Set the windowListAnchor to the event's current target  */
  }, {
    key: "handleOpen",
    value: function handleOpen(event) {
      this.setState({
        windowListAnchor: event.currentTarget
      });
    }

    /**
     * Returns the rendered component
    */
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        disabled = _this$props.disabled,
        t = _this$props.t,
        windowCount = _this$props.windowCount;
      var windowListAnchor = this.state.windowListAnchor;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-haspopup": "true",
        "aria-label": t('listAllOpenWindows'),
        "aria-owns": windowListAnchor ? 'window-list' : null,
        className: (0, _classnames["default"])(classes.ctrlBtn, windowListAnchor ? classes.ctrlBtnSelected : null),
        disabled: disabled,
        badge: true,
        BadgeProps: {
          badgeContent: windowCount,
          classes: {
            badge: classes.badge
          }
        },
        onClick: function onClick(e) {
          return _this2.handleOpen(e);
        }
      }, /*#__PURE__*/_react["default"].createElement(_BookmarksSharp["default"], null)), Boolean(windowListAnchor) && /*#__PURE__*/_react["default"].createElement(_WindowList["default"], {
        anchorEl: windowListAnchor,
        id: "window-list",
        open: Boolean(windowListAnchor),
        handleClose: this.handleClose
      }));
    }
  }]);
}(_react.Component);
WindowListButton.defaultProps = {
  classes: {},
  disabled: false
};