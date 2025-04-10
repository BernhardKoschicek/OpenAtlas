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
import React, { Component } from 'react';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import DragHandleIcon from '@material-ui/icons/DragHandleSharp';
import MoveToTopIcon from '@material-ui/icons/VerticalAlignTopSharp';
import VisibilityIcon from '@material-ui/icons/VisibilitySharp';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffSharp';
import OpacityIcon from '@material-ui/icons/OpacitySharp';
import Typography from '@material-ui/core/Typography';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import IIIFThumbnail from '../containers/IIIFThumbnail';

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
export var CanvasLayers = /*#__PURE__*/function (_Component) {
  /** */
  function CanvasLayers(props) {
    var _this;
    _classCallCheck(this, CanvasLayers);
    _this = _callSuper(this, CanvasLayers, [props]);
    _this.droppableId = uuid();
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
      return /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          alignItems: 'flex-start',
          display: 'flex'
        }
      }, /*#__PURE__*/React.createElement(IIIFThumbnail, {
        maxHeight: height,
        maxWidth: width,
        resource: resource,
        classes: {
          image: classes.image,
          root: classes.thumbnail
        }
      }), /*#__PURE__*/React.createElement(Typography, {
        className: classes.label,
        component: "div",
        variant: "body1"
      }, CanvasLayers.getUseableLabel(resource, index), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t(layer.visibility ? 'layer_hide' : 'layer_show'),
        edge: "start",
        size: "small",
        onClick: function onClick() {
          _this2.setLayerVisibility(resource.id, !layer.visibility);
        }
      }, layer.visibility ? /*#__PURE__*/React.createElement(VisibilityIcon, null) : /*#__PURE__*/React.createElement(VisibilityOffIcon, null)), layer.index !== 0 && /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t('layer_moveToTop'),
        size: "small",
        onClick: function onClick() {
          _this2.moveToTop(resource.id);
        }
      }, /*#__PURE__*/React.createElement(MoveToTopIcon, null))))), /*#__PURE__*/React.createElement("div", {
        style: {
          alignItems: 'center',
          display: 'flex'
        }
      }, /*#__PURE__*/React.createElement(Tooltip, {
        title: t('layer_opacity')
      }, /*#__PURE__*/React.createElement(OpacityIcon, {
        className: classes.opacityIcon,
        color: layer.visibility ? 'inherit' : 'disabled',
        fontSize: "small"
      })), /*#__PURE__*/React.createElement(Input, {
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
        endAdornment: /*#__PURE__*/React.createElement(InputAdornment, {
          disableTypography: true,
          position: "end"
        }, /*#__PURE__*/React.createElement(Typography, {
          variant: "caption"
        }, "%")),
        inputProps: {
          'aria-label': t('layer_opacity')
        }
      }), /*#__PURE__*/React.createElement(Slider, {
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
      return /*#__PURE__*/React.createElement(Draggable, {
        key: resource.id,
        draggableId: resource.id,
        index: index
      }, function (provided, snapshot) {
        return /*#__PURE__*/React.createElement(ListItem, Object.assign({
          ref: provided.innerRef
        }, provided.draggableProps, {
          component: "li",
          className: clsx(classes.listItem, _defineProperty({}, classes.dragging, snapshot.isDragging)),
          disableGutters: true,
          key: resource.id
        }), /*#__PURE__*/React.createElement("div", Object.assign({}, provided.dragHandleProps, {
          className: classes.dragHandle
        }), /*#__PURE__*/React.createElement(Tooltip, {
          title: t('layer_move')
        }, /*#__PURE__*/React.createElement(DragHandleIcon, null))), _this3.renderLayer(resource, index));
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
      return /*#__PURE__*/React.createElement(React.Fragment, null, totalSize > 1 && /*#__PURE__*/React.createElement(Typography, {
        className: classes.sectionHeading,
        variant: "overline"
      }, t('annotationCanvasLabel', {
        context: "".concat(index + 1, "/").concat(totalSize),
        label: label
      })), /*#__PURE__*/React.createElement(DragDropContext, {
        onDragEnd: this.onDragEnd
      }, /*#__PURE__*/React.createElement(Droppable, {
        droppableId: this.droppableId
      }, function (provided, snapshot) {
        return /*#__PURE__*/React.createElement(List, Object.assign({
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
}(Component);
CanvasLayers.defaultProps = {
  classes: {},
  layerMetadata: undefined
};