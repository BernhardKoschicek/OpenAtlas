function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
import ReactDOM from 'react-dom';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';
import xor from 'lodash/xor';
import OpenSeadragonCanvasOverlay from '../lib/OpenSeadragonCanvasOverlay';
import CanvasWorld from '../lib/CanvasWorld';
import CanvasAnnotationDisplay from '../lib/CanvasAnnotationDisplay';

/**
 * Represents a OpenSeadragonViewer in the mirador workspace. Responsible for mounting
 * and rendering OSD.
 */
export var AnnotationsOverlay = /*#__PURE__*/function (_Component) {
  /**
   * @param {Object} props
   */
  function AnnotationsOverlay(props) {
    var _this;
    _classCallCheck(this, AnnotationsOverlay);
    _this = _callSuper(this, AnnotationsOverlay, [props]);
    _this.ref = /*#__PURE__*/React.createRef();
    _this.osdCanvasOverlay = null;
    // An initial value for the updateCanvas method
    _this.updateCanvas = function () {};
    _this.onUpdateViewport = _this.onUpdateViewport.bind(_this);
    _this.onCanvasClick = _this.onCanvasClick.bind(_this);
    _this.onCanvasMouseMove = debounce(_this.onCanvasMouseMove.bind(_this), 10);
    _this.onCanvasExit = _this.onCanvasExit.bind(_this);
    return _this;
  }

  /**
   * React lifecycle event
   */
  _inherits(AnnotationsOverlay, _Component);
  return _createClass(AnnotationsOverlay, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initializeViewer();
    }

    /**
     * When the tileSources change, make sure to close the OSD viewer.
     * When the annotations change, reset the updateCanvas method to make sure
     * they are added.
     * When the viewport state changes, pan or zoom the OSD viewer as appropriate
     */
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
        drawAnnotations = _this$props.drawAnnotations,
        drawSearchAnnotations = _this$props.drawSearchAnnotations,
        annotations = _this$props.annotations,
        searchAnnotations = _this$props.searchAnnotations,
        hoveredAnnotationIds = _this$props.hoveredAnnotationIds,
        selectedAnnotationId = _this$props.selectedAnnotationId,
        highlightAllAnnotations = _this$props.highlightAllAnnotations,
        viewer = _this$props.viewer;
      this.initializeViewer();
      var annotationsUpdated = !AnnotationsOverlay.annotationsMatch(annotations, prevProps.annotations);
      var searchAnnotationsUpdated = !AnnotationsOverlay.annotationsMatch(searchAnnotations, prevProps.searchAnnotations);
      var hoveredAnnotationsUpdated = xor(hoveredAnnotationIds, prevProps.hoveredAnnotationIds).length > 0;
      if (this.osdCanvasOverlay && hoveredAnnotationsUpdated) {
        if (hoveredAnnotationIds.length > 0) {
          this.osdCanvasOverlay.canvasDiv.style.cursor = 'pointer';
        } else {
          this.osdCanvasOverlay.canvasDiv.style.cursor = '';
        }
      }
      var selectedAnnotationsUpdated = selectedAnnotationId !== prevProps.selectedAnnotationId;
      var redrawAnnotations = drawAnnotations !== prevProps.drawAnnotations || drawSearchAnnotations !== prevProps.drawSearchAnnotations || highlightAllAnnotations !== prevProps.highlightAllAnnotations;
      if (searchAnnotationsUpdated || annotationsUpdated || selectedAnnotationsUpdated || hoveredAnnotationsUpdated || redrawAnnotations) {
        this.updateCanvas = this.canvasUpdateCallback();
        viewer.forceRedraw();
      }
    }

    /**
     */
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var viewer = this.props.viewer;
      viewer.removeHandler('canvas-click', this.onCanvasClick);
      viewer.removeHandler('canvas-exit', this.onCanvasExit);
      viewer.removeHandler('update-viewport', this.onUpdateViewport);
      viewer.removeHandler('mouse-move', this.onCanvasMouseMove);
    }

    /** */
  }, {
    key: "onCanvasClick",
    value: function onCanvasClick(event) {
      var _this2 = this;
      var canvasWorld = this.props.canvasWorld;
      var webPosition = event.position,
        viewport = event.eventSource.viewport;
      var point = viewport.pointFromPixel(webPosition);
      var canvas = canvasWorld.canvasAtPoint(point);
      if (!canvas) return;
      var _canvasWorld$canvasTo = canvasWorld.canvasToWorldCoordinates(canvas.id),
        _canvasWorld$canvasTo2 = _slicedToArray(_canvasWorld$canvasTo, 4),
        _canvasX = _canvasWorld$canvasTo2[0],
        _canvasY = _canvasWorld$canvasTo2[1],
        canvasWidth = _canvasWorld$canvasTo2[2],
        canvasHeight // eslint-disable-line no-unused-vars
        = _canvasWorld$canvasTo2[3];

      // get all the annotations that contain the click
      var annos = this.annotationsAtPoint(canvas, point);
      if (annos.length > 0) {
        event.preventDefaultAction = true; // eslint-disable-line no-param-reassign
      }
      if (annos.length === 1) {
        this.toggleAnnotation(annos[0].id);
      } else if (annos.length > 0) {
        /**
         * Try to find the "right" annotation to select after a click.
         *
         * This is perhaps a naive method, but seems to deal with rectangles and SVG shapes:
         *
         * - figure out how many points around a circle are inside the annotation shape
         * - if there's a shape with the fewest interior points, it's probably the one
         *       with the closest boundary?
         * - if there's a tie, make the circle bigger and try again.
         */
        var annosWithClickScore = function annosWithClickScore(radius) {
          var degreesToRadians = Math.PI / 180;
          return function (anno) {
            var score = 0;
            for (var degrees = 0; degrees < 360; degrees += 1) {
              var x = Math.cos(degrees * degreesToRadians) * radius + point.x;
              var y = Math.sin(degrees * degreesToRadians) * radius + point.y;
              if (_this2.isAnnotationAtPoint(anno, canvas, {
                x: x,
                y: y
              })) score += 1;
            }
            return {
              anno: anno,
              score: score
            };
          };
        };
        var annosWithScore = [];
        var radius = 1;
        annosWithScore = sortBy(annos.map(annosWithClickScore(radius)), 'score');
        while (radius < Math.max(canvasWidth, canvasHeight) && annosWithScore[0].score === annosWithScore[1].score) {
          radius *= 2;
          annosWithScore = sortBy(annos.map(annosWithClickScore(radius)), 'score');
        }
        this.toggleAnnotation(annosWithScore[0].anno.id);
      }
    }

    /** */
  }, {
    key: "onCanvasMouseMove",
    value: function onCanvasMouseMove(event) {
      var _this$props2 = this.props,
        annotations = _this$props2.annotations,
        canvasWorld = _this$props2.canvasWorld,
        hoverAnnotation = _this$props2.hoverAnnotation,
        hoveredAnnotationIds = _this$props2.hoveredAnnotationIds,
        searchAnnotations = _this$props2.searchAnnotations,
        viewer = _this$props2.viewer,
        windowId = _this$props2.windowId;
      if (annotations.length === 0 && searchAnnotations.length === 0) return;
      var webPosition = event.position;
      var point = viewer.viewport.pointFromPixel(webPosition);
      var canvas = canvasWorld.canvasAtPoint(point);
      if (!canvas) {
        hoverAnnotation(windowId, []);
        return;
      }
      var annos = this.annotationsAtPoint(canvas, point);
      if (xor(hoveredAnnotationIds, annos.map(function (a) {
        return a.id;
      })).length > 0) {
        hoverAnnotation(windowId, annos.map(function (a) {
          return a.id;
        }));
      }
    }

    /** If the cursor leaves the canvas, wipe out highlights */
  }, {
    key: "onCanvasExit",
    value: function onCanvasExit(event) {
      var _this$props3 = this.props,
        hoverAnnotation = _this$props3.hoverAnnotation,
        windowId = _this$props3.windowId;

      // a move event may be queued up by the debouncer
      this.onCanvasMouseMove.cancel();
      hoverAnnotation(windowId, []);
    }

    /**
     * onUpdateViewport - fires during OpenSeadragon render method.
     */
  }, {
    key: "onUpdateViewport",
    value: function onUpdateViewport(event) {
      this.updateCanvas();
    }

    /** @private */
  }, {
    key: "initializeViewer",
    value: function initializeViewer() {
      var viewer = this.props.viewer;
      if (!viewer) return;
      if (this.osdCanvasOverlay) return;
      this.osdCanvasOverlay = new OpenSeadragonCanvasOverlay(viewer, this.ref);
      viewer.addHandler('canvas-click', this.onCanvasClick);
      viewer.addHandler('canvas-exit', this.onCanvasExit);
      viewer.addHandler('update-viewport', this.onUpdateViewport);
      viewer.addHandler('mouse-move', this.onCanvasMouseMove);
      this.updateCanvas = this.canvasUpdateCallback();
    }

    /** */
  }, {
    key: "canvasUpdateCallback",
    value: function canvasUpdateCallback() {
      var _this3 = this;
      return function () {
        _this3.osdCanvasOverlay.clear();
        _this3.osdCanvasOverlay.resize();
        _this3.osdCanvasOverlay.canvasUpdate(_this3.renderAnnotations.bind(_this3));
      };
    }

    /** @private */
  }, {
    key: "isAnnotationAtPoint",
    value: function isAnnotationAtPoint(resource, canvas, point) {
      var canvasWorld = this.props.canvasWorld;
      var _canvasWorld$canvasTo3 = canvasWorld.canvasToWorldCoordinates(canvas.id),
        _canvasWorld$canvasTo4 = _slicedToArray(_canvasWorld$canvasTo3, 2),
        canvasX = _canvasWorld$canvasTo4[0],
        canvasY = _canvasWorld$canvasTo4[1];
      var relativeX = point.x - canvasX;
      var relativeY = point.y - canvasY;
      if (resource.svgSelector) {
        var context = this.osdCanvasOverlay.context2d;
        var _CanvasAnnotationDisp = new CanvasAnnotationDisplay({
            resource: resource
          }),
          svgPaths = _CanvasAnnotationDisp.svgPaths;
        return _toConsumableArray(svgPaths).some(function (path) {
          return context.isPointInPath(new Path2D(path.attributes.d.nodeValue), relativeX, relativeY);
        });
      }
      if (resource.fragmentSelector) {
        var _resource$fragmentSel = _slicedToArray(resource.fragmentSelector, 4),
          x = _resource$fragmentSel[0],
          y = _resource$fragmentSel[1],
          w = _resource$fragmentSel[2],
          h = _resource$fragmentSel[3];
        return x <= relativeX && relativeX <= x + w && y <= relativeY && relativeY <= y + h;
      }
      return false;
    }

    /** @private */
  }, {
    key: "annotationsAtPoint",
    value: function annotationsAtPoint(canvas, point) {
      var _this4 = this;
      var _this$props4 = this.props,
        annotations = _this$props4.annotations,
        searchAnnotations = _this$props4.searchAnnotations;
      var lists = [].concat(_toConsumableArray(annotations), _toConsumableArray(searchAnnotations));
      var annos = flatten(lists.map(function (l) {
        return l.resources;
      })).filter(function (resource) {
        if (canvas.id !== resource.targetId) return false;
        return _this4.isAnnotationAtPoint(resource, canvas, point);
      });
      return annos;
    }

    /** */
  }, {
    key: "toggleAnnotation",
    value: function toggleAnnotation(id) {
      var _this$props5 = this.props,
        selectedAnnotationId = _this$props5.selectedAnnotationId,
        selectAnnotation = _this$props5.selectAnnotation,
        deselectAnnotation = _this$props5.deselectAnnotation,
        windowId = _this$props5.windowId;
      if (selectedAnnotationId === id) {
        deselectAnnotation(windowId, id);
      } else {
        selectAnnotation(windowId, id);
      }
    }

    /**
     * annotationsToContext - converts anontations to a canvas context
     */
  }, {
    key: "annotationsToContext",
    value: function annotationsToContext(annotations, palette) {
      var _this$props6 = this.props,
        highlightAllAnnotations = _this$props6.highlightAllAnnotations,
        hoveredAnnotationIds = _this$props6.hoveredAnnotationIds,
        selectedAnnotationId = _this$props6.selectedAnnotationId,
        canvasWorld = _this$props6.canvasWorld,
        viewer = _this$props6.viewer;
      var context = this.osdCanvasOverlay.context2d;
      var zoomRatio = viewer.viewport.getZoom(true) / viewer.viewport.getMaxZoom();
      annotations.forEach(function (annotation) {
        annotation.resources.forEach(function (resource) {
          if (!canvasWorld.canvasIds.includes(resource.targetId)) return;
          var offset = canvasWorld.offsetByCanvas(resource.targetId);
          var canvasAnnotationDisplay = new CanvasAnnotationDisplay({
            hovered: hoveredAnnotationIds.includes(resource.id),
            offset: offset,
            palette: _objectSpread(_objectSpread({}, palette), {}, {
              "default": _objectSpread(_objectSpread({}, palette["default"]), !highlightAllAnnotations && palette.hidden)
            }),
            resource: resource,
            selected: selectedAnnotationId === resource.id,
            zoomRatio: zoomRatio
          });
          canvasAnnotationDisplay.toContext(context);
        });
      });
    }

    /** */
  }, {
    key: "renderAnnotations",
    value: function renderAnnotations() {
      var _this$props7 = this.props,
        annotations = _this$props7.annotations,
        drawAnnotations = _this$props7.drawAnnotations,
        drawSearchAnnotations = _this$props7.drawSearchAnnotations,
        searchAnnotations = _this$props7.searchAnnotations,
        palette = _this$props7.palette;
      if (drawSearchAnnotations) {
        this.annotationsToContext(searchAnnotations, palette.search);
      }
      if (drawAnnotations) {
        this.annotationsToContext(annotations, palette.annotations);
      }
    }

    /**
     * Renders things
     */
  }, {
    key: "render",
    value: function render() {
      var viewer = this.props.viewer;
      if (!viewer) return /*#__PURE__*/React.createElement(React.Fragment, null);
      return /*#__PURE__*/ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
        ref: this.ref,
        style: {
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%'
        }
      }, /*#__PURE__*/React.createElement("canvas", null)), viewer.canvas);
    }
  }], [{
    key: "annotationsMatch",
    value:
    /**
     * annotationsMatch - compares previous annotations to current to determine
     * whether to add a new updateCanvas method to draw annotations
     * @param  {Array} currentAnnotations
     * @param  {Array} prevAnnotations
     * @return {Boolean}
     */
    function annotationsMatch(currentAnnotations, prevAnnotations) {
      if (!currentAnnotations && !prevAnnotations) return true;
      if (currentAnnotations && !prevAnnotations || !currentAnnotations && prevAnnotations) return false;
      if (currentAnnotations.length === 0 && prevAnnotations.length === 0) return true;
      if (currentAnnotations.length !== prevAnnotations.length) return false;
      return currentAnnotations.every(function (annotation, index) {
        var newIds = annotation.resources.map(function (r) {
          return r.id;
        });
        var prevIds = prevAnnotations[index].resources.map(function (r) {
          return r.id;
        });
        if (newIds.length === 0 && prevIds.length === 0) return true;
        if (newIds.length !== prevIds.length) return false;
        if (annotation.id === prevAnnotations[index].id && isEqual(newIds, prevIds)) {
          return true;
        }
        return false;
      });
    }
  }]);
}(Component);
AnnotationsOverlay.defaultProps = {
  annotations: [],
  deselectAnnotation: function deselectAnnotation() {},
  drawAnnotations: true,
  drawSearchAnnotations: true,
  highlightAllAnnotations: false,
  hoverAnnotation: function hoverAnnotation() {},
  hoveredAnnotationIds: [],
  palette: {},
  searchAnnotations: [],
  selectAnnotation: function selectAnnotation() {},
  selectedAnnotationId: undefined,
  viewer: null
};