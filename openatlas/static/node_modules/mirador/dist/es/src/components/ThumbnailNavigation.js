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
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import classNames from 'classnames';
import CanvasWorld from '../lib/CanvasWorld';
import ThumbnailCanvasGrouping from '../containers/ThumbnailCanvasGrouping';
import ns from '../config/css-ns';

/**
 */
export var ThumbnailNavigation = /*#__PURE__*/function (_Component) {
  /**
   */
  function ThumbnailNavigation(props) {
    var _this;
    _classCallCheck(this, ThumbnailNavigation);
    _this = _callSuper(this, ThumbnailNavigation, [props]);
    _this.scrollbarSize = 15;
    _this.spacing = 8; // 2 * (2px margin + 2px border + 2px padding + 2px padding)
    _this.calculateScaledSize = _this.calculateScaledSize.bind(_this);
    _this.itemCount = _this.itemCount.bind(_this);
    _this.handleKeyUp = _this.handleKeyUp.bind(_this);
    _this.nextCanvas = _this.nextCanvas.bind(_this);
    _this.previousCanvas = _this.previousCanvas.bind(_this);
    _this.gridRef = /*#__PURE__*/React.createRef();
    return _this;
  }

  /**
   * If the view has changed and the thumbnailNavigation is open, recompute all
   * of the grids
   */
  _inherits(ThumbnailNavigation, _Component);
  return _createClass(ThumbnailNavigation, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
        canvasIndex = _this$props.canvasIndex,
        position = _this$props.position,
        view = _this$props.view;
      if (prevProps.view !== view && position !== 'off') {
        this.gridRef.current.resetAfterIndex(0);
      }
      if (prevProps.canvasIndex !== canvasIndex) {
        var index = canvasIndex;
        if (view === 'book') index = Math.ceil(index / 2);
        this.gridRef.current.scrollToItem(index, 'center');
      }
    }

    /** */
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(e) {
      var position = this.props.position;
      var nextKey = 'ArrowRight';
      var previousKey = 'ArrowLeft';
      if (position === 'far-right') {
        nextKey = 'ArrowDown';
        previousKey = 'ArrowUp';
      }
      switch (e.key) {
        case nextKey:
          this.nextCanvas();
          break;
        case previousKey:
          this.previousCanvas();
          break;
        default:
          break;
      }
    }

    /**
     * When on right, row height
     * When on bottom, column width
     */
  }, {
    key: "calculateScaledSize",
    value: function calculateScaledSize(index) {
      var _this$props2 = this.props,
        thumbnailNavigation = _this$props2.thumbnailNavigation,
        canvasGroupings = _this$props2.canvasGroupings,
        position = _this$props2.position;
      var canvases = canvasGroupings[index] || [];
      var world = new CanvasWorld(canvases);
      var bounds = world.worldBounds();
      switch (position) {
        case 'far-right':
          {
            var calc = Math.floor(this.calculatingWidth(canvases.length) * bounds[3] / bounds[2]);
            if (!Number.isInteger(calc)) return thumbnailNavigation.width + this.spacing;
            return calc + this.spacing;
          }
        // Default case bottom
        default:
          {
            if (bounds[3] === 0) return thumbnailNavigation.width + this.spacing;
            var _calc = Math.ceil((thumbnailNavigation.height - this.scrollbarSize - this.spacing - 4) * bounds[2] / bounds[3]);
            return _calc;
          }
      }
    }

    /** */
  }, {
    key: "calculatingWidth",
    value: function calculatingWidth(canvasesLength) {
      var thumbnailNavigation = this.props.thumbnailNavigation;
      if (canvasesLength === 1) {
        return thumbnailNavigation.width;
      }
      return thumbnailNavigation.width * 2;
    }

    /** */
  }, {
    key: "rightWidth",
    value: function rightWidth() {
      var _this$props3 = this.props,
        view = _this$props3.view,
        thumbnailNavigation = _this$props3.thumbnailNavigation;
      switch (view) {
        case 'book':
          return thumbnailNavigation.width * 2;
        default:
          return thumbnailNavigation.width;
      }
    }

    /** */
  }, {
    key: "style",
    value: function style() {
      var _this$props4 = this.props,
        position = _this$props4.position,
        thumbnailNavigation = _this$props4.thumbnailNavigation;
      switch (position) {
        case 'far-right':
          return {
            height: '100%',
            minHeight: 0,
            width: "".concat(this.rightWidth() + this.scrollbarSize + this.spacing, "px")
          };
        // Default case bottom
        default:
          return {
            height: "".concat(thumbnailNavigation.height, "px"),
            width: '100%'
          };
      }
    }

    /** */
  }, {
    key: "areaHeight",
    value: function areaHeight(height) {
      var _this$props5 = this.props,
        position = _this$props5.position,
        thumbnailNavigation = _this$props5.thumbnailNavigation;
      switch (position) {
        case 'far-right':
          return height;
        // Default case bottom
        default:
          return thumbnailNavigation.height;
      }
    }

    /** */
  }, {
    key: "itemCount",
    value: function itemCount() {
      var canvasGroupings = this.props.canvasGroupings;
      return canvasGroupings.length;
    }

    /**
     */
  }, {
    key: "nextCanvas",
    value: function nextCanvas() {
      var _this$props6 = this.props,
        hasNextCanvas = _this$props6.hasNextCanvas,
        setNextCanvas = _this$props6.setNextCanvas;
      if (hasNextCanvas) {
        setNextCanvas();
      }
    }

    /**
     */
  }, {
    key: "previousCanvas",
    value: function previousCanvas() {
      var _this$props7 = this.props,
        hasPreviousCanvas = _this$props7.hasPreviousCanvas,
        setPreviousCanvas = _this$props7.setPreviousCanvas;
      if (hasPreviousCanvas) {
        setPreviousCanvas();
      }
    }

    /**
     * Renders things
     */
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props8 = this.props,
        t = _this$props8.t,
        canvasGroupings = _this$props8.canvasGroupings,
        classes = _this$props8.classes,
        position = _this$props8.position,
        thumbnailNavigation = _this$props8.thumbnailNavigation,
        viewingDirection = _this$props8.viewingDirection,
        windowId = _this$props8.windowId;
      if (position === 'off') {
        return /*#__PURE__*/React.createElement(React.Fragment, null);
      }
      var htmlDir = viewingDirection === 'right-to-left' ? 'rtl' : 'ltr';
      var itemData = {
        canvasGroupings: canvasGroupings,
        height: thumbnailNavigation.height - this.spacing - this.scrollbarSize,
        position: position,
        windowId: windowId
      };
      return /*#__PURE__*/React.createElement(Paper, {
        className: classNames(ns('thumb-navigation'), classes.thumbNavigation),
        "aria-label": t('thumbnailNavigation'),
        square: true,
        elevation: 0,
        style: this.style(),
        tabIndex: 0,
        onKeyUp: this.handleKeyUp,
        role: "grid"
      }, /*#__PURE__*/React.createElement("div", {
        role: "row",
        style: {
          height: '100%',
          width: '100%'
        }
      }, /*#__PURE__*/React.createElement(AutoSizer, {
        defaultHeight: 100,
        defaultWidth: 400
      }, function (_ref) {
        var height = _ref.height,
          width = _ref.width;
        return /*#__PURE__*/React.createElement(List, {
          direction: htmlDir,
          height: _this2.areaHeight(height),
          itemCount: _this2.itemCount(),
          itemSize: _this2.calculateScaledSize,
          width: width,
          layout: position === 'far-bottom' ? 'horizontal' : 'vertical',
          itemData: itemData,
          ref: _this2.gridRef
        }, ThumbnailCanvasGrouping);
      })));
    }
  }]);
}(Component);
ThumbnailNavigation.defaultProps = {
  hasNextCanvas: false,
  hasPreviousCanvas: false,
  setNextCanvas: function setNextCanvas() {},
  setPreviousCanvas: function setPreviousCanvas() {},
  view: undefined,
  viewingDirection: ''
};