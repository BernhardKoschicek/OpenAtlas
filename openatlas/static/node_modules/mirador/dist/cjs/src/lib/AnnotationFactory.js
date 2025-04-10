"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _AnnotationList = _interopRequireDefault(require("./AnnotationList"));
var _AnnotationPage = _interopRequireDefault(require("./AnnotationPage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Used to determine the type of Annotation supported by a version of the IIIF
 * Presentation API.
 */
var AnnotationFactory = exports["default"] = /*#__PURE__*/function () {
  function AnnotationFactory() {
    _classCallCheck(this, AnnotationFactory);
  }
  return _createClass(AnnotationFactory, null, [{
    key: "determineAnnotation",
    value: /** */
    function determineAnnotation(json, target) {
      if (!json) {
        return null;
      }

      // IIIF Presentation API v3. AnnotationPage
      if (json.type === 'AnnotationPage') {
        return new _AnnotationPage["default"](json, target);
      }

      // IIIF Presentation API v2. OpenAnnotation and SharedCanvas models
      return new _AnnotationList["default"](json, target);
    }
  }]);
}();