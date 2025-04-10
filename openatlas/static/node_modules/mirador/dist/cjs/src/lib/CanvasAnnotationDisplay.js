"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * CanvasAnnotationDisplay - class used to display a SVG and fragment based
 * annotations.
 */
var CanvasAnnotationDisplay = exports["default"] = /*#__PURE__*/function () {
  /** */
  function CanvasAnnotationDisplay(_ref) {
    var resource = _ref.resource,
      palette = _ref.palette,
      zoomRatio = _ref.zoomRatio,
      offset = _ref.offset,
      selected = _ref.selected,
      hovered = _ref.hovered;
    _classCallCheck(this, CanvasAnnotationDisplay);
    this.resource = resource;
    this.palette = palette;
    this.zoomRatio = zoomRatio;
    this.offset = offset;
    this.selected = selected;
    this.hovered = hovered;
  }

  /** */
  return _createClass(CanvasAnnotationDisplay, [{
    key: "toContext",
    value: function toContext(context) {
      this.context = context;
      if (this.resource.svgSelector) {
        this.svgContext();
      } else if (this.resource.fragmentSelector) {
        this.fragmentContext();
      }
    }

    /** */
  }, {
    key: "svgString",
    get: function get() {
      return this.resource.svgSelector.value;
    }

    /** */
  }, {
    key: "svgContext",
    value: function svgContext() {
      var _this = this;
      var currentPalette;
      if (this.hovered) {
        currentPalette = this.palette.hovered;
      } else if (this.selected) {
        currentPalette = this.palette.selected;
      } else {
        currentPalette = this.palette["default"];
      }
      if (currentPalette.globalAlpha === 0) return;
      _toConsumableArray(this.svgPaths).forEach(function (element) {
        /**
         *  Note: Path2D is not supported in IE11.
         *  TODO: Support multi canvas offset
         *  One example: https://developer.mozilla.org/en-US/docs/Web/API/Path2D/addPath
         */
        _this.context.save();
        _this.context.translate(_this.offset.x, _this.offset.y);
        var p = new Path2D(element.attributes.d.nodeValue);

        // Setup styling from SVG -> Canvas
        _this.context.strokeStyle = _this.color;
        if (element.attributes['stroke-dasharray']) {
          _this.context.setLineDash(element.attributes['stroke-dasharray'].nodeValue.split(','));
        }
        var svgToCanvasMap = {
          fill: 'fillStyle',
          stroke: 'strokeStyle',
          'stroke-dashoffset': 'lineDashOffset',
          'stroke-linecap': 'lineCap',
          'stroke-linejoin': 'lineJoin',
          'stroke-miterlimit': 'miterlimit',
          'stroke-width': 'lineWidth'
        };
        Object.keys(svgToCanvasMap).forEach(function (key) {
          if (element.attributes[key]) {
            _this.context[svgToCanvasMap[key]] = element.attributes[key].nodeValue;
          }
        });

        // Resize the stroke based off of the zoomRatio (currentZoom / maxZoom)
        _this.context.lineWidth /= _this.zoomRatio;

        // Reset the color if it is selected or hovered on
        if (_this.selected || _this.hovered) {
          _this.context.strokeStyle = currentPalette.strokeStyle || currentPalette.fillStyle;
        }
        if (element.attributes['stroke-opacity']) {
          _this.context.globalAlpha = currentPalette.globalAlpha * element.attributes['stroke-opacity'].nodeValue;
        } else {
          _this.context.globalAlpha = currentPalette.globalAlpha;
        }
        _this.context.stroke(p);

        // Wait to set the fill, so we can adjust the globalAlpha value if we need to
        if (element.attributes.fill && element.attributes.fill.nodeValue !== 'none') {
          if (element.attributes['fill-opacity']) {
            _this.context.globalAlpha = currentPalette.globalAlpha * element.attributes['fill-opacity'].nodeValue;
          } else {
            _this.context.globalAlpha = currentPalette.globalAlpha;
          }
          _this.context.fill(p);
        }
        _this.context.restore();
      });
    }

    /** */
  }, {
    key: "fragmentContext",
    value: function fragmentContext() {
      var _this2 = this;
      var fragment = this.resource.fragmentSelector;
      fragment[0] += this.offset.x;
      fragment[1] += this.offset.y;
      var currentPalette;
      if (this.selected) {
        currentPalette = this.palette.selected;
      } else if (this.hovered) {
        currentPalette = this.palette.hovered;
      } else {
        currentPalette = this.palette["default"];
      }
      this.context.save();
      Object.keys(currentPalette).forEach(function (key) {
        _this2.context[key] = currentPalette[key];
      });
      if (currentPalette.globalAlpha === 0) return;
      if (currentPalette.fillStyle) {
        var _this$context;
        (_this$context = this.context).fillRect.apply(_this$context, _toConsumableArray(fragment));
      } else {
        var _this$context2;
        this.context.lineWidth = 1 / this.zoomRatio;
        (_this$context2 = this.context).strokeRect.apply(_this$context2, _toConsumableArray(fragment));
      }
      this.context.restore();
    }

    /** */
  }, {
    key: "svgPaths",
    get: function get() {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(this.svgString, 'text/xml');
      return xmlDoc.getElementsByTagName('path');
    }
  }]);
}();