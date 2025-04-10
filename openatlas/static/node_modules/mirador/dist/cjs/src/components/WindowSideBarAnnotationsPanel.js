"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowSideBarAnnotationsPanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _AnnotationSettings = _interopRequireDefault(require("../containers/AnnotationSettings"));
var _CanvasAnnotations = _interopRequireDefault(require("../containers/CanvasAnnotations"));
var _CompanionWindow = _interopRequireDefault(require("../containers/CompanionWindow"));
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
 * WindowSideBarAnnotationsPanel ~
*/
var WindowSideBarAnnotationsPanel = exports.WindowSideBarAnnotationsPanel = /*#__PURE__*/function (_Component) {
  /** */
  function WindowSideBarAnnotationsPanel(props) {
    var _this;
    _classCallCheck(this, WindowSideBarAnnotationsPanel);
    _this = _callSuper(this, WindowSideBarAnnotationsPanel, [props]);
    _this.containerRef = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  /**
   * Returns the rendered component
  */
  _inherits(WindowSideBarAnnotationsPanel, _Component);
  return _createClass(WindowSideBarAnnotationsPanel, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        annotationCount = _this$props.annotationCount,
        classes = _this$props.classes,
        canvasIds = _this$props.canvasIds,
        t = _this$props.t,
        windowId = _this$props.windowId,
        id = _this$props.id;
      return /*#__PURE__*/_react["default"].createElement(_CompanionWindow["default"], {
        title: t('annotations'),
        paperClassName: (0, _cssNs["default"])('window-sidebar-annotation-panel'),
        windowId: windowId,
        id: id,
        ref: this.containerRef,
        otherRef: this.containerRef,
        titleControls: /*#__PURE__*/_react["default"].createElement(_AnnotationSettings["default"], {
          windowId: windowId
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.section
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        component: "p",
        variant: "subtitle2"
      }, t('showingNumAnnotations', {
        count: annotationCount,
        number: annotationCount
      }))), canvasIds.map(function (canvasId, index) {
        return /*#__PURE__*/_react["default"].createElement(_CanvasAnnotations["default"], {
          canvasId: canvasId,
          containerRef: _this2.containerRef,
          key: canvasId,
          index: index,
          totalSize: canvasIds.length,
          windowId: windowId
        });
      }));
    }
  }]);
}(_react.Component);
WindowSideBarAnnotationsPanel.defaultProps = {
  canvasIds: [],
  t: function t(key) {
    return key;
  }
};