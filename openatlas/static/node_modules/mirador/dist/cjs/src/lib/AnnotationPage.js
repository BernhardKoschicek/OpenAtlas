"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _flatten = _interopRequireDefault(require("lodash/flatten"));
var _AnnotationItem = _interopRequireDefault(require("./AnnotationItem"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Annotation representation for IIIF Presentation v3
 * https://iiif.io/api/presentation/3.0/#55-annotation-page
 */
var AnnotationPage = exports["default"] = /*#__PURE__*/function () {
  /** */
  function AnnotationPage(json, target) {
    _classCallCheck(this, AnnotationPage);
    this.json = json;
    this.target = target;
  }

  /** */
  return _createClass(AnnotationPage, [{
    key: "id",
    get: function get() {
      return this.json.id;
    }

    /** */
  }, {
    key: "present",
    value: function present() {
      return this.items && this.items.length > 0;
    }

    /** */
  }, {
    key: "items",
    get: function get() {
      var _this = this;
      this._items = this._items || function () {
        // eslint-disable-line no-underscore-dangle
        if (!_this.json || !_this.json.items) return [];
        return (0, _flatten["default"])([_this.json.items]).map(function (resource) {
          return new _AnnotationItem["default"](resource);
        });
      }();
      return this._items; // eslint-disable-line no-underscore-dangle
    }

    /**
     * Alias to items for compatibility for right now.
     */
  }, {
    key: "resources",
    get: function get() {
      return this.items;
    }
  }]);
}();