"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasAnnotations = void 0;
var _react = _interopRequireWildcard(require("react"));
var _clsx2 = _interopRequireDefault(require("clsx"));
var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));
var _MenuList = _interopRequireDefault(require("@material-ui/core/MenuList"));
var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));
var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _SanitizedHtml = _interopRequireDefault(require("../containers/SanitizedHtml"));
var _ScrollTo = require("./ScrollTo");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
/**
 * CanvasAnnotations ~
*/
var CanvasAnnotations = exports.CanvasAnnotations = /*#__PURE__*/function (_Component) {
  /**
   * constructor -
   */
  function CanvasAnnotations(props) {
    var _this;
    _classCallCheck(this, CanvasAnnotations);
    _this = _callSuper(this, CanvasAnnotations, [props]);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleAnnotationHover = _this.handleAnnotationHover.bind(_this);
    _this.handleAnnotationBlur = _this.handleAnnotationBlur.bind(_this);
    return _this;
  }

  /**
   * Handle click event of an annotation.
  */
  _inherits(CanvasAnnotations, _Component);
  return _createClass(CanvasAnnotations, [{
    key: "handleClick",
    value: function handleClick(event, annotation) {
      var _this$props = this.props,
        deselectAnnotation = _this$props.deselectAnnotation,
        selectAnnotation = _this$props.selectAnnotation,
        selectedAnnotationId = _this$props.selectedAnnotationId,
        windowId = _this$props.windowId;
      if (selectedAnnotationId === annotation.id) {
        deselectAnnotation(windowId, annotation.id);
      } else {
        selectAnnotation(windowId, annotation.id);
      }
    }

    /** */
  }, {
    key: "handleAnnotationHover",
    value: function handleAnnotationHover(annotation) {
      var _this$props2 = this.props,
        hoverAnnotation = _this$props2.hoverAnnotation,
        windowId = _this$props2.windowId;
      hoverAnnotation(windowId, [annotation.id]);
    }

    /** */
  }, {
    key: "handleAnnotationBlur",
    value: function handleAnnotationBlur() {
      var _this$props3 = this.props,
        hoverAnnotation = _this$props3.hoverAnnotation,
        windowId = _this$props3.windowId;
      hoverAnnotation(windowId, []);
    }

    /**
     * Returns the rendered component
    */
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props4 = this.props,
        annotations = _this$props4.annotations,
        classes = _this$props4.classes,
        index = _this$props4.index,
        label = _this$props4.label,
        selectedAnnotationId = _this$props4.selectedAnnotationId,
        t = _this$props4.t,
        totalSize = _this$props4.totalSize,
        listContainerComponent = _this$props4.listContainerComponent,
        htmlSanitizationRuleSet = _this$props4.htmlSanitizationRuleSet,
        hoveredAnnotationIds = _this$props4.hoveredAnnotationIds,
        containerRef = _this$props4.containerRef;
      if (annotations.length === 0) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        className: classes.sectionHeading,
        variant: "overline"
      }, t('annotationCanvasLabel', {
        context: "".concat(index + 1, "/").concat(totalSize),
        label: label
      })), /*#__PURE__*/_react["default"].createElement(_MenuList["default"], {
        autoFocusItem: true,
        variant: "selectedMenu"
      }, annotations.map(function (annotation) {
        return /*#__PURE__*/_react["default"].createElement(_ScrollTo.ScrollTo, {
          containerRef: containerRef,
          key: "".concat(annotation.id, "-scroll"),
          offsetTop: 96 // offset for the height of the form above
          ,
          scrollTo: selectedAnnotationId === annotation.id
        }, /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
          button: true,
          component: listContainerComponent,
          className: (0, _clsx2["default"])(classes.annotationListItem, _defineProperty({}, classes.hovered, hoveredAnnotationIds.includes(annotation.id))),
          key: annotation.id,
          annotationid: annotation.id,
          selected: selectedAnnotationId === annotation.id,
          onClick: function onClick(e) {
            return _this2.handleClick(e, annotation);
          },
          onFocus: function onFocus() {
            return _this2.handleAnnotationHover(annotation);
          },
          onBlur: _this2.handleAnnotationBlur,
          onMouseEnter: function onMouseEnter() {
            return _this2.handleAnnotationHover(annotation);
          },
          onMouseLeave: _this2.handleAnnotationBlur
        }, /*#__PURE__*/_react["default"].createElement(_ListItemText["default"], {
          primaryTypographyProps: {
            variant: 'body2'
          }
        }, /*#__PURE__*/_react["default"].createElement(_SanitizedHtml["default"], {
          ruleSet: htmlSanitizationRuleSet,
          htmlString: annotation.content
        }), /*#__PURE__*/_react["default"].createElement("div", null, annotation.tags.map(function (tag) {
          return /*#__PURE__*/_react["default"].createElement(_Chip["default"], {
            size: "small",
            variant: "outlined",
            label: tag,
            id: tag,
            className: classes.chip,
            key: tag.toString()
          });
        })))));
      })));
    }
  }]);
}(_react.Component);
CanvasAnnotations.defaultProps = {
  annotations: [],
  classes: {},
  containerRef: undefined,
  hoveredAnnotationIds: [],
  htmlSanitizationRuleSet: 'iiif',
  listContainerComponent: 'li',
  selectedAnnotationId: undefined
};