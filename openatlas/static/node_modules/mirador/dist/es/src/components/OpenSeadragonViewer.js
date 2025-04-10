function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import OpenSeadragon from 'openseadragon';
import classNames from 'classnames';
import ns from '../config/css-ns';
import AnnotationsOverlay from '../containers/AnnotationsOverlay';
import CanvasWorld from '../lib/CanvasWorld';
import { PluginHook } from './PluginHook';
import { OSDReferences } from '../plugins/OSDReferences';

/**
 * Represents a OpenSeadragonViewer in the mirador workspace. Responsible for mounting
 * and rendering OSD.
 */
export var OpenSeadragonViewer = /*#__PURE__*/function (_Component) {
  /**
   * @param {Object} props
   */
  function OpenSeadragonViewer(props) {
    var _this;
    _classCallCheck(this, OpenSeadragonViewer);
    _this = _callSuper(this, OpenSeadragonViewer, [props]);
    _this.state = {
      viewer: undefined
    };
    _this.ref = /*#__PURE__*/React.createRef();
    _this.apiRef = /*#__PURE__*/React.createRef();
    OSDReferences.set(props.windowId, _this.apiRef);
    _this.onCanvasMouseMove = debounce(_this.onCanvasMouseMove.bind(_this), 10);
    _this.onViewportChange = _this.onViewportChange.bind(_this);
    _this.zoomToWorld = _this.zoomToWorld.bind(_this);
    return _this;
  }

  /**
   * React lifecycle event
   */
  _inherits(OpenSeadragonViewer, _Component);
  return _createClass(OpenSeadragonViewer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
        osdConfig = _this$props.osdConfig,
        t = _this$props.t,
        windowId = _this$props.windowId;
      if (!this.ref.current) {
        return;
      }
      var viewer = new OpenSeadragon(_objectSpread({
        id: this.ref.current.id
      }, osdConfig));
      var canvas = viewer.canvas && viewer.canvas.firstElementChild;
      if (canvas) {
        canvas.setAttribute('role', 'img');
        canvas.setAttribute('aria-label', t('digitizedView'));
        canvas.setAttribute('aria-describedby', "".concat(windowId, "-osd"));
      }
      this.apiRef.current = viewer;
      this.setState({
        viewer: viewer
      });
      viewer.addHandler('animation-finish', this.onViewportChange);
      if (viewer.innerTracker) {
        viewer.innerTracker.moveHandler = this.onCanvasMouseMove;
      }
    }

    /**
     * When the tileSources change, make sure to close the OSD viewer.
     * When the annotations change, reset the updateCanvas method to make sure
     * they are added.
     * When the viewport state changes, pan or zoom the OSD viewer as appropriate
     */
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props2 = this.props,
        viewerConfig = _this$props2.viewerConfig,
        canvasWorld = _this$props2.canvasWorld;
      var viewer = this.state.viewer;
      this.apiRef.current = viewer;
      if (prevState.viewer === undefined) {
        if (viewerConfig) {
          viewerConfig.zoom = viewerConfig.zoom || viewer.viewport.imageToViewportZoom(1);
          viewer.viewport.panTo(viewerConfig, true);
          viewer.viewport.zoomTo(viewerConfig.zoom, viewerConfig, true);
          viewerConfig.degrees !== undefined && viewer.viewport.setRotation(viewerConfig.degrees);
          viewerConfig.flip !== undefined && viewer.viewport.setFlip(viewerConfig.flip);
        }
        this.addAllImageSources(!viewerConfig);
        return;
      }
      if (!this.infoResponsesMatch(prevProps.infoResponses) || !this.nonTiledImagedMatch(prevProps.nonTiledImages)) {
        viewer.close();
        var canvasesChanged = !isEqual(canvasWorld.canvasIds, prevProps.canvasWorld.canvasIds);
        if (canvasesChanged && viewer.preserveViewport) {
          // Do not reset the zoom after add
          this.addAllImageSources(false);
        } else {
          // Reset the zoom if the canvas has changed or if there is no viewerConfig
          this.addAllImageSources(canvasesChanged || !viewerConfig);
        }
      } else if (!isEqual(canvasWorld.layers, prevProps.canvasWorld.layers)) {
        this.refreshTileProperties();
      } else if (viewerConfig && viewerConfig !== prevProps.viewerConfig) {
        var viewport = viewer.viewport;
        if (viewerConfig.x !== viewport.centerSpringX.target.value || viewerConfig.y !== viewport.centerSpringY.target.value) {
          viewport.panTo(viewerConfig, false);
        }
        if (viewerConfig.zoom !== viewport.zoomSpring.target.value) {
          viewport.zoomTo(viewerConfig.zoom, viewerConfig, false);
        }
        if (viewerConfig.rotation !== viewport.getRotation()) {
          viewport.setRotation(viewerConfig.rotation);
        }
        if (viewerConfig.flip !== viewport.getFlip()) {
          viewport.setFlip(viewerConfig.flip);
        }
      }
    }

    /**
     */
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var viewer = this.state.viewer;
      if (viewer.innerTracker && viewer.innerTracker.moveHandler === this.onCanvasMouseMove) {
        viewer.innerTracker.moveHandler = null;
      }
      viewer.removeAllHandlers();
      this.apiRef.current = undefined;
    }

    /** Shim to provide a mouse-move event coming from the viewer */
  }, {
    key: "onCanvasMouseMove",
    value: function onCanvasMouseMove(event) {
      var viewer = this.state.viewer;
      viewer.raiseEvent('mouse-move', event);
    }

    /**
     * Forward OSD state to redux
     */
  }, {
    key: "onViewportChange",
    value: function onViewportChange(event) {
      var _this$props3 = this.props,
        updateViewport = _this$props3.updateViewport,
        windowId = _this$props3.windowId;
      var viewport = event.eventSource.viewport;
      updateViewport(windowId, {
        flip: viewport.getFlip(),
        rotation: viewport.getRotation(),
        x: Math.round(viewport.centerSpringX.target.value),
        y: Math.round(viewport.centerSpringY.target.value),
        zoom: viewport.zoomSpring.target.value
      });
    }

    /** */
  }, {
    key: "addAllImageSources",
    value: function addAllImageSources() {
      var _this2 = this;
      var zoomAfterAdd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var _this$props4 = this.props,
        nonTiledImages = _this$props4.nonTiledImages,
        infoResponses = _this$props4.infoResponses;
      Promise.all(infoResponses.map(function (infoResponse) {
        return _this2.addTileSource(infoResponse);
      }), nonTiledImages.map(function (image) {
        return _this2.addNonTiledImage(image);
      })).then(function () {
        if (infoResponses[0] || nonTiledImages[0]) {
          if (zoomAfterAdd) _this2.zoomToWorld();
          _this2.refreshTileProperties();
        }
      });
    }

    /** */
  }, {
    key: "addNonTiledImage",
    value: function addNonTiledImage(contentResource) {
      var canvasWorld = this.props.canvasWorld;
      var viewer = this.state.viewer;
      var type = contentResource.getProperty('type');
      var format = contentResource.getProperty('format') || '';
      if (!(type === 'Image' || type === 'dctypes:Image' || format.startsWith('image/'))) return Promise.resolve();
      return new Promise(function (resolve, reject) {
        if (!viewer) {
          reject();
        }
        viewer.addSimpleImage({
          error: function error(event) {
            return reject(event);
          },
          fitBounds: _construct(OpenSeadragon.Rect, _toConsumableArray(canvasWorld.contentResourceToWorldCoordinates(contentResource))),
          index: canvasWorld.layerIndexOfImageResource(contentResource),
          opacity: canvasWorld.layerOpacityOfImageResource(contentResource),
          success: function success(event) {
            return resolve(event);
          },
          url: contentResource.id
        });
      });
    }

    /**
     */
  }, {
    key: "addTileSource",
    value: function addTileSource(infoResponse) {
      var canvasWorld = this.props.canvasWorld;
      var viewer = this.state.viewer;
      return new Promise(function (resolve, reject) {
        if (!viewer) {
          reject();
        }

        // OSD mutates this object, so we give it a shallow copy
        var tileSource = _objectSpread({}, infoResponse.json);
        var contentResource = canvasWorld.contentResource(infoResponse.id);
        if (!contentResource) return;
        viewer.addTiledImage({
          error: function error(event) {
            return reject(event);
          },
          fitBounds: _construct(OpenSeadragon.Rect, _toConsumableArray(canvasWorld.contentResourceToWorldCoordinates(contentResource))),
          index: canvasWorld.layerIndexOfImageResource(contentResource),
          opacity: canvasWorld.layerOpacityOfImageResource(contentResource),
          success: function success(event) {
            return resolve(event);
          },
          tileSource: tileSource
        });
      });
    }

    /** */
  }, {
    key: "refreshTileProperties",
    value: function refreshTileProperties() {
      var canvasWorld = this.props.canvasWorld;
      var world = this.state.viewer.world;
      var items = [];
      for (var i = 0; i < world.getItemCount(); i += 1) {
        items.push(world.getItemAt(i));
      }
      items.forEach(function (item, i) {
        var contentResource = canvasWorld.contentResource(item.source['@id'] || item.source.id);
        if (!contentResource) return;
        var newIndex = canvasWorld.layerIndexOfImageResource(contentResource);
        if (i !== newIndex) world.setItemIndex(item, newIndex);
        item.setOpacity(canvasWorld.layerOpacityOfImageResource(contentResource));
      });
    }

    /**
     */
  }, {
    key: "fitBounds",
    value: function fitBounds(x, y, w, h) {
      var immediately = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var viewer = this.state.viewer;
      viewer.viewport.fitBounds(new OpenSeadragon.Rect(x, y, w, h), immediately);
    }

    /**
     * infoResponsesMatch - compares previous tileSources to current to determine
     * whether a refresh of the OSD viewer is needed.
     * @param  {Array} prevTileSources
     * @return {Boolean}
     */
  }, {
    key: "infoResponsesMatch",
    value: function infoResponsesMatch(prevInfoResponses) {
      var infoResponses = this.props.infoResponses;
      if (infoResponses.length === 0 && prevInfoResponses.length === 0) return true;
      if (infoResponses.length !== prevInfoResponses.length) return false;
      return infoResponses.every(function (infoResponse, index) {
        if (!prevInfoResponses[index]) {
          return false;
        }
        if (!infoResponse.json || !prevInfoResponses[index].json) {
          return false;
        }
        if (infoResponse.tokenServiceId !== prevInfoResponses[index].tokenServiceId) {
          return false;
        }
        if (infoResponse.json['@id'] && infoResponse.json['@id'] === prevInfoResponses[index].json['@id']) {
          return true;
        }
        if (infoResponse.json.id && infoResponse.json.id === prevInfoResponses[index].json.id) {
          return true;
        }
        return false;
      });
    }

    /**
     * nonTiledImagedMatch - compares previous images to current to determin
     * whether a refresh of the OSD viewer is needed
     */
  }, {
    key: "nonTiledImagedMatch",
    value: function nonTiledImagedMatch(prevNonTiledImages) {
      var nonTiledImages = this.props.nonTiledImages;
      if (nonTiledImages.length === 0 && prevNonTiledImages.length === 0) return true;
      return nonTiledImages.some(function (image, index) {
        if (!prevNonTiledImages[index]) {
          return false;
        }
        if (image.id === prevNonTiledImages[index].id) {
          return true;
        }
        return false;
      });
    }

    /**
     * zoomToWorld - zooms the viewer to the extent of the canvas world
     */
  }, {
    key: "zoomToWorld",
    value: function zoomToWorld() {
      var immediately = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var canvasWorld = this.props.canvasWorld;
      this.fitBounds.apply(this, _toConsumableArray(canvasWorld.worldBounds()).concat([immediately]));
    }

    /**
     * Renders things
     */
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props5 = this.props,
        children = _this$props5.children,
        classes = _this$props5.classes,
        label = _this$props5.label,
        t = _this$props5.t,
        windowId = _this$props5.windowId,
        drawAnnotations = _this$props5.drawAnnotations;
      var viewer = this.state.viewer;
      var enhancedChildren = React.Children.map(children, function (child) {
        return /*#__PURE__*/React.cloneElement(child, {
          zoomToWorld: _this3.zoomToWorld
        });
      });
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
        className: classNames(ns('osd-container'), classes.osdContainer),
        id: "".concat(windowId, "-osd"),
        ref: this.ref,
        "aria-label": t('item', {
          label: label
        }),
        "aria-live": "polite"
      }, drawAnnotations && /*#__PURE__*/React.createElement(AnnotationsOverlay, {
        viewer: viewer,
        windowId: windowId
      }), enhancedChildren, /*#__PURE__*/React.createElement(PluginHook, Object.assign({
        viewer: viewer
      }, _objectSpread(_objectSpread({}, this.props), {}, {
        children: null
      })))));
    }
  }]);
}(Component);
OpenSeadragonViewer.defaultProps = {
  children: null,
  drawAnnotations: false,
  infoResponses: [],
  label: null,
  nonTiledImages: [],
  osdConfig: {},
  viewerConfig: null
};