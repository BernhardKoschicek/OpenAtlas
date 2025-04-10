"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewerNavigation = void 0;
var _react = _interopRequireWildcard(require("react"));
var _PlayCircleOutlineSharp = _interopRequireDefault(require("@material-ui/icons/PlayCircleOutlineSharp"));
var _classnames = _interopRequireDefault(require("classnames"));
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
/**
 */
var ViewerNavigation = exports.ViewerNavigation = /*#__PURE__*/function (_Component) {
  function ViewerNavigation() {
    _classCallCheck(this, ViewerNavigation);
    return _callSuper(this, ViewerNavigation, arguments);
  }
  _inherits(ViewerNavigation, _Component);
  return _createClass(ViewerNavigation, [{
    key: "render",
    value:
    /**
     * Renders things
     */
    function render() {
      var _this$props = this.props,
        hasNextCanvas = _this$props.hasNextCanvas,
        hasPreviousCanvas = _this$props.hasPreviousCanvas,
        setNextCanvas = _this$props.setNextCanvas,
        setPreviousCanvas = _this$props.setPreviousCanvas,
        t = _this$props.t,
        classes = _this$props.classes,
        viewingDirection = _this$props.viewingDirection;
      var htmlDir = 'ltr';
      var previousIconStyle = {};
      var nextIconStyle = {};
      switch (viewingDirection) {
        case 'top-to-bottom':
          previousIconStyle = {
            transform: 'rotate(270deg)'
          };
          nextIconStyle = {
            transform: 'rotate(90deg)'
          };
          break;
        case 'bottom-to-top':
          previousIconStyle = {
            transform: 'rotate(90deg)'
          };
          nextIconStyle = {
            transform: 'rotate(270deg)'
          };
          break;
        case 'right-to-left':
          htmlDir = 'rtl';
          previousIconStyle = {};
          nextIconStyle = {
            transform: 'rotate(180deg)'
          };
          break;
        default:
          previousIconStyle = {
            transform: 'rotate(180deg)'
          };
          nextIconStyle = {};
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])((0, _cssNs["default"])('osd-navigation'), classes.osdNavigation),
        dir: htmlDir
      }, /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('previousCanvas'),
        className: (0, _cssNs["default"])('previous-canvas-button'),
        disabled: !hasPreviousCanvas,
        onClick: function onClick() {
          hasPreviousCanvas && setPreviousCanvas();
        }
      }, /*#__PURE__*/_react["default"].createElement(_PlayCircleOutlineSharp["default"], {
        style: previousIconStyle
      })), /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('nextCanvas'),
        className: (0, _cssNs["default"])('next-canvas-button'),
        disabled: !hasNextCanvas,
        onClick: function onClick() {
          hasNextCanvas && setNextCanvas();
        }
      }, /*#__PURE__*/_react["default"].createElement(_PlayCircleOutlineSharp["default"], {
        style: nextIconStyle
      })));
    }
  }]);
}(_react.Component);
ViewerNavigation.defaultProps = {
  hasNextCanvas: false,
  hasPreviousCanvas: false,
  setNextCanvas: function setNextCanvas() {},
  setPreviousCanvas: function setPreviousCanvas() {},
  viewingDirection: ''
};