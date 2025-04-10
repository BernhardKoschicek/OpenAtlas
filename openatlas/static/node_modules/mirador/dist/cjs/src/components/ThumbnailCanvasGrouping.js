"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThumbnailCanvasGrouping = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _IIIFThumbnail = _interopRequireDefault(require("../containers/IIIFThumbnail"));
var _cssNs = _interopRequireDefault(require("../config/css-ns"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
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
var ThumbnailCanvasGrouping = exports.ThumbnailCanvasGrouping = /*#__PURE__*/function (_PureComponent) {
  /** */
  function ThumbnailCanvasGrouping(props) {
    var _this;
    _classCallCheck(this, ThumbnailCanvasGrouping);
    _this = _callSuper(this, ThumbnailCanvasGrouping, [props]);
    _this.setCanvas = _this.setCanvas.bind(_this);
    return _this;
  }

  /** */
  _inherits(ThumbnailCanvasGrouping, _PureComponent);
  return _createClass(ThumbnailCanvasGrouping, [{
    key: "setCanvas",
    value: function setCanvas(e) {
      var setCanvas = this.props.setCanvas;
      setCanvas(e.currentTarget.dataset.canvasId);
    }

    /**
     * Determines whether the current index is the rendered canvas, providing
     * a useful class.
     */
  }, {
    key: "currentCanvasClass",
    value: function currentCanvasClass(canvasIndices) {
      var index = this.props.index;
      if (canvasIndices.includes(index)) return 'current-canvas-grouping';
      return '';
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        index = _this$props.index,
        style = _this$props.style,
        data = _this$props.data,
        classes = _this$props.classes,
        currentCanvasId = _this$props.currentCanvasId;
      var canvasGroupings = data.canvasGroupings,
        position = data.position,
        height = data.height;
      var currentGroupings = canvasGroupings[index];
      var SPACING = 8;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: _objectSpread(_objectSpread({}, style), {}, {
          boxSizing: 'content-box',
          height: Number.isInteger(style.height) ? style.height - SPACING : null,
          left: Number.isInteger(style.left) ? style.left + SPACING : null,
          top: style.top + SPACING,
          width: Number.isInteger(style.width) ? style.width - SPACING : null
        }),
        className: (0, _cssNs["default"])('thumbnail-nav-container'),
        role: "gridcell",
        "aria-colindex": index + 1
      }, /*#__PURE__*/_react["default"].createElement("div", {
        role: "button",
        "data-canvas-id": currentGroupings[0].id,
        "data-canvas-index": currentGroupings[0].index,
        onKeyUp: this.setCanvas,
        onClick: this.setCanvas,
        tabIndex: -1,
        style: {
          height: position === 'far-right' ? 'auto' : "".concat(height - SPACING, "px"),
          width: position === 'far-bottom' ? 'auto' : "".concat(style.width, "px")
        },
        className: (0, _classnames["default"])((0, _cssNs["default"])(['thumbnail-nav-canvas', "thumbnail-nav-canvas-".concat(index), this.currentCanvasClass(currentGroupings.map(function (canvas) {
          return canvas.index;
        }))]), classes.canvas, _defineProperty({}, classes.currentCanvas, currentGroupings.map(function (canvas) {
          return canvas.id;
        }).includes(currentCanvasId)))
      }, currentGroupings.map(function (canvas, i) {
        return /*#__PURE__*/_react["default"].createElement(_IIIFThumbnail["default"], {
          key: canvas.id,
          resource: canvas,
          labelled: true,
          maxHeight: position === 'far-right' ? style.height - 1.5 * SPACING : height - 1.5 * SPACING,
          variant: "inside"
        });
      })));
    }
  }]);
}(_react.PureComponent);