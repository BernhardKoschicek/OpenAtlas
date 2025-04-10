"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * MiradorManifest - adds additional, testable logic around Manifesto's Manifest
 * https://iiif-commons.github.io/manifesto/classes/_canvas_.manifesto.canvas.html
 */
var MiradorManifest = exports["default"] = /*#__PURE__*/function () {
  /** */
  function MiradorManifest(manifest) {
    _classCallCheck(this, MiradorManifest);
    this.manifest = manifest;
  }

  /**
   * Returns the starting canvas specified in the manifest
   * @param {object} manifest manifesto instance
   * @param {number} canvasIndexFromState
   * @return {Canvas}
   */
  return _createClass(MiradorManifest, [{
    key: "startCanvas",
    get: function get() {
      var canvasId;
      var sequence = this.manifest.getSequences()[0];
      if (!sequence) return undefined;

      // IIIF v2
      canvasId = sequence.getProperty('startCanvas');
      if (!canvasId) {
        // IIIF v3
        var start = this.manifest.getProperty('start') || sequence.getProperty('start');
        canvasId = start && (start.id || start.source);
      }
      return canvasId && sequence.getCanvasById(canvasId) || undefined;
    }

    /** */
  }, {
    key: "canvasAt",
    value: function canvasAt(index) {
      var sequence = this.manifest.getSequences()[0];
      var canvases = sequence && sequence.getCanvases();
      return canvases && canvases[index];
    }
  }]);
}();