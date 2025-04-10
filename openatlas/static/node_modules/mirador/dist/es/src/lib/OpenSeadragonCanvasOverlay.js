function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import OpenSeadragon from 'openseadragon';

/**
 * OpenSeadragonCanvasOverlay - adapted from https://github.com/altert/OpenSeadragonCanvasOverlay
 * used rather than an "onRedraw" function we tap into our own method. Existing
 * repository is not published as an npm package.
 * Code ported from https://github.com/altert/OpenSeadragonCanvasOverlay
 * carries a BSD 3-Clause license originally authored by @altert from
 * https://github.com/altert/OpenseadragonFabricjsOverlay
 */
var OpenSeadragonCanvasOverlay = /*#__PURE__*/function () {
  /**
   * constructor - sets up the Canvas overlay container
   */
  function OpenSeadragonCanvasOverlay(viewer, ref) {
    _classCallCheck(this, OpenSeadragonCanvasOverlay);
    this.viewer = viewer;
    this.ref = ref;
    this.containerWidth = 0;
    this.containerHeight = 0;
    this.imgAspectRatio = 1;
  }

  /** */
  return _createClass(OpenSeadragonCanvasOverlay, [{
    key: "canvas",
    get: function get() {
      return this.canvasDiv.firstElementChild;
    }

    /** */
  }, {
    key: "canvasDiv",
    get: function get() {
      return this.ref.current;
    }

    /** */
  }, {
    key: "context2d",
    get: function get() {
      return this.canvas.getContext('2d');
    }

    /** */
  }, {
    key: "clear",
    value: function clear() {
      this.context2d.clearRect(0, 0, this.containerWidth, this.containerHeight);
    }

    /**
     * resize - resizes the added Canvas overlay.
     */
  }, {
    key: "resize",
    value: function resize() {
      if (this.containerWidth !== this.viewer.container.clientWidth) {
        this.containerWidth = this.viewer.container.clientWidth;
        this.canvasDiv.setAttribute('width', this.containerWidth);
        this.canvas.setAttribute('width', this.containerWidth);
      }
      if (this.containerHeight !== this.viewer.container.clientHeight) {
        this.containerHeight = this.viewer.container.clientHeight;
        this.canvasDiv.setAttribute('height', this.containerHeight);
        this.canvas.setAttribute('height', this.containerHeight);
      }
      this.viewportOrigin = new OpenSeadragon.Point(0, 0);
      var boundsRect = this.viewer.viewport.getBoundsNoRotateWithMargins(true);
      this.viewportOrigin.x = boundsRect.x;
      this.viewportOrigin.y = boundsRect.y * this.imgAspectRatio;
      this.viewportWidth = boundsRect.width;
      this.viewportHeight = boundsRect.height * this.imgAspectRatio;
      var image1 = this.viewer.world.getItemAt(0);
      if (!image1) return;
      this.imgWidth = image1.source.dimensions.x;
      this.imgHeight = image1.source.dimensions.y;
      this.imgAspectRatio = this.imgWidth / this.imgHeight;
    }

    /**
     * canvasUpdate - sets up the dimensions for the canvas update to mimick image
     * 0 dimensions. Then call provided update function.
     * @param {Function} update
     */
  }, {
    key: "canvasUpdate",
    value: function canvasUpdate(update) {
      var viewportZoom = this.viewer.viewport.getZoom(true);
      var image1 = this.viewer.world.getItemAt(0);
      if (!image1) return;
      var zoom = image1.viewportToImageZoom(viewportZoom);
      var x = (this.viewportOrigin.x / this.imgWidth - this.viewportOrigin.x) / this.viewportWidth * this.containerWidth;
      var y = (this.viewportOrigin.y / this.imgHeight - this.viewportOrigin.y) / this.viewportHeight * this.containerHeight;
      if (this.clearBeforeRedraw) this.clear();
      this.context2d.translate(x, y);
      this.context2d.scale(zoom, zoom);
      var center = this.viewer.viewport.getCenter();
      var flip = this.viewer.viewport.getFlip();
      if (flip) {
        this.context2d.translate(center.x * 2, 0);
        this.context2d.scale(-1, 1);
      }
      var rotation = this.viewer.viewport.getRotation();
      if (rotation !== 0) {
        this.context2d.translate(center.x, center.y);
        this.context2d.rotate(rotation * Math.PI / 180);
        this.context2d.translate(-1 * center.x, -1 * center.y);
      }
      update();
      this.context2d.setTransform(1, 0, 0, 1, 0, 0);
    }
  }]);
}();
export { OpenSeadragonCanvasOverlay as default };