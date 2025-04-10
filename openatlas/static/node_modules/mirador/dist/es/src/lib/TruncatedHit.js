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
/** */
var TruncatedHit = /*#__PURE__*/function () {
  /** */
  function TruncatedHit(hit) {
    var annotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$maxChars = _ref.maxChars,
      maxChars = _ref$maxChars === void 0 ? 200 : _ref$maxChars,
      _ref$minimum = _ref.minimum,
      minimum = _ref$minimum === void 0 ? 20 : _ref$minimum;
    _classCallCheck(this, TruncatedHit);
    this.hit = hit;
    this.annotation = annotation;
    this.maxChars = maxChars || 200;
    this.minimum = minimum || 20;
  }

  /** */
  return _createClass(TruncatedHit, [{
    key: "match",
    get: function get() {
      return this.hit.match || this.annotation && this.annotation.resource.resource.chars || '-';
    }

    /** */
  }, {
    key: "charsOnSide",
    get: function get() {
      var resultingChars = (this.maxChars - this.match.length) / 2;
      var measured = [(this.hit.before || '').length, (this.hit.after || '').length].filter(function (length) {
        return length > 0;
      });
      return Math.max(Math.min.apply(Math, [resultingChars].concat(_toConsumableArray(measured))), this.minimum);
    }

    /** */
  }, {
    key: "before",
    get: function get() {
      if (!this.hit.before) return '';
      return this.hit.before.substring(this.hit.before.length - this.charsOnSide, this.hit.before.length);
    }

    /** */
  }, {
    key: "after",
    get: function get() {
      if (!this.hit.after) return '';
      return this.hit.after.substring(0, Math.min(this.hit.after.length, this.charsOnSide));
    }
  }]);
}();
export { TruncatedHit as default };