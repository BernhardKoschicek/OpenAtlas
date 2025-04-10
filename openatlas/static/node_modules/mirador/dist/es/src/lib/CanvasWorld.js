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
import normalizeUrl from 'normalize-url';
import MiradorCanvas from './MiradorCanvas';

/**
 * CanvasWorld
 */
var CanvasWorld = /*#__PURE__*/function () {
  /**
   * @param {Array} canvases - Array of Manifesto:Canvas objects to create a
   * world from.
   */
  function CanvasWorld(canvases, layers) {
    var viewingDirection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left-to-right';
    _classCallCheck(this, CanvasWorld);
    this.canvases = canvases.map(function (c) {
      return new MiradorCanvas(c);
    });
    this.layers = layers;
    this.viewingDirection = viewingDirection;
    this._canvasDimensions = null; // eslint-disable-line no-underscore-dangle
  }

  /** */
  return _createClass(CanvasWorld, [{
    key: "canvasIds",
    get: function get() {
      return this.canvases.map(function (canvas) {
        return canvas.id;
      });
    }

    /** */
  }, {
    key: "canvasDimensions",
    get: function get() {
      if (this._canvasDimensions) {
        // eslint-disable-line no-underscore-dangle
        return this._canvasDimensions; // eslint-disable-line no-underscore-dangle
      }
      var _this$canvasDirection = _slicedToArray(this.canvasDirection, 2),
        dirX = _this$canvasDirection[0],
        dirY = _this$canvasDirection[1];
      var scale = dirY === 0 ? Math.min.apply(Math, _toConsumableArray(this.canvases.map(function (c) {
        return c.getHeight();
      }))) : Math.min.apply(Math, _toConsumableArray(this.canvases.map(function (c) {
        return c.getWidth();
      })));
      var incX = 0;
      var incY = 0;
      var canvasDims = this.canvases.reduce(function (acc, canvas) {
        var canvasHeight = 0;
        var canvasWidth = 0;
        if (!isNaN(canvas.aspectRatio)) {
          if (dirY === 0) {
            // constant height
            canvasHeight = scale;
            canvasWidth = Math.floor(scale * canvas.aspectRatio);
          } else {
            // constant width
            canvasWidth = scale;
            canvasHeight = Math.floor(scale * (1 / canvas.aspectRatio));
          }
        }
        acc.push({
          canvas: canvas,
          height: canvasHeight,
          width: canvasWidth,
          x: incX,
          y: incY
        });
        incX += dirX * canvasWidth;
        incY += dirY * canvasHeight;
        return acc;
      }, []);
      var worldHeight = dirY === 0 ? scale : Math.abs(incY);
      var worldWidth = dirX === 0 ? scale : Math.abs(incX);
      this._canvasDimensions = canvasDims // eslint-disable-line no-underscore-dangle
      .reduce(function (acc, dims) {
        acc.push(_objectSpread(_objectSpread({}, dims), {}, {
          x: dirX === -1 ? dims.x + worldWidth - dims.width : dims.x,
          y: dirY === -1 ? dims.y + worldHeight - dims.height : dims.y
        }));
        return acc;
      }, []);
      return this._canvasDimensions; // eslint-disable-line no-underscore-dangle
    }

    /**
     * contentResourceToWorldCoordinates - calculates the contentResource coordinates
     * respective to the world.
     */
  }, {
    key: "contentResourceToWorldCoordinates",
    value: function contentResourceToWorldCoordinates(contentResource) {
      var miradorCanvasIndex = this.canvases.findIndex(function (c) {
        return c.imageResources.find(function (r) {
          return r.id === contentResource.id;
        });
      });
      var canvas = this.canvases[miradorCanvasIndex];
      if (!canvas) return [];
      var _this$canvasToWorldCo = this.canvasToWorldCoordinates(canvas.id),
        _this$canvasToWorldCo2 = _slicedToArray(_this$canvasToWorldCo, 4),
        x = _this$canvasToWorldCo2[0],
        y = _this$canvasToWorldCo2[1],
        w = _this$canvasToWorldCo2[2],
        h = _this$canvasToWorldCo2[3];
      var fragmentOffset = canvas.onFragment(contentResource.id);
      if (fragmentOffset) {
        return [x + fragmentOffset[0], y + fragmentOffset[1], fragmentOffset[2], fragmentOffset[3]];
      }
      return [x, y, w, h];
    }

    /** */
  }, {
    key: "canvasToWorldCoordinates",
    value: function canvasToWorldCoordinates(canvasId) {
      var canvasDimensions = this.canvasDimensions.find(function (c) {
        return c.canvas.id === canvasId;
      });
      return [canvasDimensions.x, canvasDimensions.y, canvasDimensions.width, canvasDimensions.height];
    }

    /** */
  }, {
    key: "canvasDirection",
    get: function get() {
      switch (this.viewingDirection) {
        case 'left-to-right':
          return [1, 0];
        case 'right-to-left':
          return [-1, 0];
        case 'top-to-bottom':
          return [0, 1];
        case 'bottom-to-top':
          return [0, -1];
        default:
          return [1, 0];
      }
    }

    /** Get the IIIF content resource for an image */
  }, {
    key: "contentResource",
    value: function contentResource(infoResponseId) {
      var miradorCanvas = this.canvases.find(function (c) {
        return c.imageServiceIds.some(function (id) {
          return normalizeUrl(id, {
            stripAuthentication: false
          }) === normalizeUrl(infoResponseId, {
            stripAuthentication: false
          });
        });
      });
      if (!miradorCanvas) return undefined;
      return miradorCanvas.imageResources.find(function (r) {
        return normalizeUrl(r.getServices()[0].id, {
          stripAuthentication: false
        }) === normalizeUrl(infoResponseId, {
          stripAuthentication: false
        });
      });
    }

    /** @private */
  }, {
    key: "getLayerMetadata",
    value: function getLayerMetadata(contentResource) {
      if (!this.layers) return undefined;
      var miradorCanvas = this.canvases.find(function (c) {
        return c.imageResources.find(function (r) {
          return r.id === contentResource.id;
        });
      });
      if (!miradorCanvas) return undefined;
      var resourceIndex = miradorCanvas.imageResources.findIndex(function (r) {
        return r.id === contentResource.id;
      });
      var layer = this.layers[miradorCanvas.canvas.id];
      var imageResourceLayer = layer && layer[contentResource.id];
      return _objectSpread({
        index: resourceIndex,
        opacity: 1,
        total: miradorCanvas.imageResources.length,
        visibility: true
      }, imageResourceLayer);
    }

    /** */
  }, {
    key: "layerOpacityOfImageResource",
    value: function layerOpacityOfImageResource(contentResource) {
      var layer = this.getLayerMetadata(contentResource);
      if (!layer) return 1;
      if (!layer.visibility) return 0;
      return layer.opacity;
    }

    /** */
  }, {
    key: "layerIndexOfImageResource",
    value: function layerIndexOfImageResource(contentResource) {
      var layer = this.getLayerMetadata(contentResource);
      if (!layer) return undefined;
      return layer.total - layer.index - 1;
    }

    /**
     * offsetByCanvas - calculates the offset for a given canvas target. Currently
     * assumes a horrizontal only layout.
     */
  }, {
    key: "offsetByCanvas",
    value: function offsetByCanvas(canvasTarget) {
      var coordinates = this.canvasToWorldCoordinates(canvasTarget);
      return {
        x: coordinates[0],
        y: coordinates[1]
      };
    }

    /**
     * worldBounds - calculates the "World" bounds. World in this case is canvases
     * lined up horizontally starting from left to right.
     */
  }, {
    key: "worldBounds",
    value: function worldBounds() {
      var worldWidth = Math.max.apply(Math, _toConsumableArray(this.canvasDimensions.map(function (c) {
        return c.x + c.width;
      })));
      var worldHeight = Math.max.apply(Math, _toConsumableArray(this.canvasDimensions.map(function (c) {
        return c.y + c.height;
      })));
      return [0, 0, worldWidth, worldHeight];
    }

    /** */
  }, {
    key: "canvasAtPoint",
    value: function canvasAtPoint(point) {
      var canvasDimensions = this.canvasDimensions.find(function (c) {
        return c.x <= point.x && point.x <= c.x + c.width && c.y <= point.y && point.y <= c.y + c.height;
      });
      return canvasDimensions && canvasDimensions.canvas;
    }
  }]);
}();
export { CanvasWorld as default };