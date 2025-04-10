"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasLayers = void 0;
var _react = _interopRequireWildcard(require("react"));
var _clsx2 = _interopRequireDefault(require("clsx"));
var _uuid = require("uuid");
var _Input = _interopRequireDefault(require("@material-ui/core/Input"));
var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));
var _List = _interopRequireDefault(require("@material-ui/core/List"));
var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));
var _Slider = _interopRequireDefault(require("@material-ui/core/Slider"));
var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));
var _DragHandleSharp = _interopRequireDefault(require("@material-ui/icons/DragHandleSharp"));
var _VerticalAlignTopSharp = _interopRequireDefault(require("@material-ui/icons/VerticalAlignTopSharp"));
var _VisibilitySharp = _interopRequireDefault(require("@material-ui/icons/VisibilitySharp"));
var _VisibilityOffSharp = _interopRequireDefault(require("@material-ui/icons/VisibilityOffSharp"));
var _OpacitySharp = _interopRequireDefault(require("@material-ui/icons/OpacitySharp"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _reactBeautifulDnd = require("react-beautiful-dnd");
var _MiradorMenuButton = _interopRequireDefault(require("../containers/MiradorMenuButton"));
var _IIIFThumbnail = _interopRequireDefault(require("../containers/IIIFThumbnail"));
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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/** */
var reorder = function reorder(list, startIndex, endIndex) {
  var result = Array.from(list);
  var _result$splice = result.splice(startIndex, 1),
    _result$splice2 = _slicedToArray(_result$splice, 1),
    removed = _result$splice2[0];
  result.splice(endIndex, 0, removed);
  return result;
};

/** */
var CanvasLayers = exports.CanvasLayers = /*#__PURE__*/function (_Component) {
  /** */
  function CanvasLayers(props) {
    var _this;
    _classCallCheck(this, CanvasLayers);
    _this = _callSuper(this, CanvasLayers, [props]);
    _this.droppableId = (0, _uuid.v4)();
    _this.onDragEnd = _this.onDragEnd.bind(_this);
    _this.handleOpacityChange = _this.handleOpacityChange.bind(_this);
    _this.setLayerVisibility = _this.setLayerVisibility.bind(_this);
    _this.moveToTop = _this.moveToTop.bind(_this);
    return _this;
  }

  /** */
  _inherits(CanvasLayers, _Component);
  return _createClass(CanvasLayers, [{
    key: "handleOpacityChange",
    value: function handleOpacityChange(layerId, value) {
      var _this$props = this.props,
        canvasId = _this$props.canvasId,
        updateLayers = _this$props.updateLayers,
        windowId = _this$props.windowId;
      var payload = _defineProperty({}, layerId, {
        opacity: value / 100.0
      });
      updateLayers(windowId, canvasId, payload);
    }

    /** */
  }, {
    key: "onDragEnd",
    value: function onDragEnd(result) {
      var _this$props2 = this.props,
        canvasId = _this$props2.canvasId,
        layers = _this$props2.layers,
        updateLayers = _this$props2.updateLayers,
        windowId = _this$props2.windowId;
      if (!result.destination) return;
      if (result.destination.droppableId !== this.droppableId) return;
      if (result.source.droppableId !== this.droppableId) return;
      var sortedLayers = reorder(layers.map(function (l) {
        return l.id;
      }), result.source.index, result.destination.index);
      var payload = layers.reduce(function (acc, layer) {
        acc[layer.id] = {
          index: sortedLayers.indexOf(layer.id)
        };
        return acc;
      }, {});
      updateLayers(windowId, canvasId, payload);
    }

    /** */
  }, {
    key: "setLayerVisibility",
    value: function setLayerVisibility(layerId, value) {
      var _this$props3 = this.props,
        canvasId = _this$props3.canvasId,
        updateLayers = _this$props3.updateLayers,
        windowId = _this$props3.windowId;
      var payload = _defineProperty({}, layerId, {
        visibility: value
      });
      updateLayers(windowId, canvasId, payload);
    }

    /** */
  }, {
    key: "moveToTop",
    value: function moveToTop(layerId) {
      var _this$props4 = this.props,
        canvasId = _this$props4.canvasId,
        layers = _this$props4.layers,
        updateLayers = _this$props4.updateLayers,
        windowId = _this$props4.windowId;
      var sortedLayers = reorder(layers.map(function (l) {
        return l.id;
      }), layers.findIndex(function (l) {
        return l.id === layerId;
      }), 0);
      var payload = layers.reduce(function (acc, layer) {
        acc[layer.id] = {
          index: sortedLayers.indexOf(layer.id)
        };
        return acc;
      }, {});
      updateLayers(windowId, canvasId, payload);
    }

    /** @private */
  }, {
    key: "renderLayer",
    value: function renderLayer(resource, index) {
      var _this2 = this;
      var _this$props5 = this.props,
        classes = _this$props5.classes,
        layerMetadata = _this$props5.layerMetadata,
        t = _this$props5.t;
      var _height$width = {
          height: undefined,
          width: 50
        },
        width = _height$width.width,
        height = _height$width.height;
      var layer = _objectSpread({
        opacity: 1,
        visibility: true
      }, (layerMetadata || {})[resource.id]);
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          alignItems: 'flex-start',
          display: 'flex'
        }
      }, /*#__PURE__*/_react["default"].createElement(_IIIFThumbnail["default"], {
        maxHeight: height,
        maxWidth: width,
        resource: resource,
        classes: {
          image: classes.image,
          root: classes.thumbnail
        }
      }), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        className: classes.label,
        component: "div",
        variant: "body1"
      }, CanvasLayers.getUseableLabel(resource, index), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t(layer.visibility ? 'layer_hide' : 'layer_show'),
        edge: "start",
        size: "small",
        onClick: function onClick() {
          _this2.setLayerVisibility(resource.id, !layer.visibility);
        }
      }, layer.visibility ? /*#__PURE__*/_react["default"].createElement(_VisibilitySharp["default"], null) : /*#__PURE__*/_react["default"].createElement(_VisibilityOffSharp["default"], null)), layer.index !== 0 && /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('layer_moveToTop'),
        size: "small",
        onClick: function onClick() {
          _this2.moveToTop(resource.id);
        }
      }, /*#__PURE__*/_react["default"].createElement(_VerticalAlignTopSharp["default"], null))))), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          alignItems: 'center',
          display: 'flex'
        }
      }, /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
        title: t('layer_opacity')
      }, /*#__PURE__*/_react["default"].createElement(_OpacitySharp["default"], {
        className: classes.opacityIcon,
        color: layer.visibility ? 'inherit' : 'disabled',
        fontSize: "small"
      })), /*#__PURE__*/_react["default"].createElement(_Input["default"], {
        classes: {
          input: classes.opacityInput
        },
        disabled: !layer.visibility,
        value: Math.round(layer.opacity * 100),
        type: "number",
        min: 0,
        max: 100,
        onChange: function onChange(e) {
          return _this2.handleOpacityChange(resource.id, e.target.value);
        },
        endAdornment: /*#__PURE__*/_react["default"].createElement(_InputAdornment["default"], {
          disableTypography: true,
          position: "end"
        }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
          variant: "caption"
        }, "%")),
        inputProps: {
          'aria-label': t('layer_opacity')
        }
      }), /*#__PURE__*/_react["default"].createElement(_Slider["default"], {
        className: classes.slider,
        disabled: !layer.visibility,
        value: layer.opacity * 100,
        onChange: function onChange(e, value) {
          return _this2.handleOpacityChange(resource.id, value);
        }
      })));
    }

    /** @private */
  }, {
    key: "renderDraggableLayer",
    value: function renderDraggableLayer(resource, index) {
      var _this3 = this;
      var _this$props6 = this.props,
        classes = _this$props6.classes,
        t = _this$props6.t;
      return /*#__PURE__*/_react["default"].createElement(_reactBeautifulDnd.Draggable, {
        key: resource.id,
        draggableId: resource.id,
        index: index
      }, function (provided, snapshot) {
        return /*#__PURE__*/_react["default"].createElement(_ListItem["default"], Object.assign({
          ref: provided.innerRef
        }, provided.draggableProps, {
          component: "li",
          className: (0, _clsx2["default"])(classes.listItem, _defineProperty({}, classes.dragging, snapshot.isDragging)),
          disableGutters: true,
          key: resource.id
        }), /*#__PURE__*/_react["default"].createElement("div", Object.assign({}, provided.dragHandleProps, {
          className: classes.dragHandle
        }), /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
          title: t('layer_move')
        }, /*#__PURE__*/_react["default"].createElement(_DragHandleSharp["default"], null))), _this3.renderLayer(resource, index));
      });
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var _this$props7 = this.props,
        classes = _this$props7.classes,
        index = _this$props7.index,
        label = _this$props7.label,
        layers = _this$props7.layers,
        t = _this$props7.t,
        totalSize = _this$props7.totalSize;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, totalSize > 1 && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        className: classes.sectionHeading,
        variant: "overline"
      }, t('annotationCanvasLabel', {
        context: "".concat(index + 1, "/").concat(totalSize),
        label: label
      })), /*#__PURE__*/_react["default"].createElement(_reactBeautifulDnd.DragDropContext, {
        onDragEnd: this.onDragEnd
      }, /*#__PURE__*/_react["default"].createElement(_reactBeautifulDnd.Droppable, {
        droppableId: this.droppableId
      }, function (provided, snapshot) {
        return /*#__PURE__*/_react["default"].createElement(_List["default"], Object.assign({
          className: classes.list
        }, provided.droppableProps, {
          ref: provided.innerRef
        }), layers && layers.map(function (r, i) {
          return _this4.renderDraggableLayer(r, i);
        }), provided.placeholder);
      })));
    }
  }], [{
    key: "getUseableLabel",
    value: /** */
    function getUseableLabel(resource, index) {
      return resource && resource.getLabel && resource.getLabel().length > 0 ? resource.getLabel().getValue() : String(index + 1);
    }
  }]);
}(_react.Component);
CanvasLayers.defaultProps = {
  classes: {},
  layerMetadata: undefined
};