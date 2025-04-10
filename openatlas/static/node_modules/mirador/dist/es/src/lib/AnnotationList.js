function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import flatten from 'lodash/flatten';
import AnnotationResource from './AnnotationResource';
/** */
var AnnotationList = /*#__PURE__*/function () {
  /** */
  function AnnotationList(json, target) {
    _classCallCheck(this, AnnotationList);
    this.json = json;
    this.target = target;
  }

  /** */
  return _createClass(AnnotationList, [{
    key: "id",
    get: function get() {
      return this.json['@id'];
    }

    /** */
  }, {
    key: "present",
    value: function present() {
      return this.resources && this.resources.length > 0;
    }

    /** */
  }, {
    key: "resources",
    get: function get() {
      var _this = this;
      this._resources = this._resources || function () {
        // eslint-disable-line no-underscore-dangle
        if (!_this.json || !_this.json.resources) return [];
        return flatten([_this.json.resources]).map(function (resource) {
          return new AnnotationResource(resource);
        });
      }();
      return this._resources; // eslint-disable-line no-underscore-dangle
    }
  }]);
}();
export { AnnotationList as default };