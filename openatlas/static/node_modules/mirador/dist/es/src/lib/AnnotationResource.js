function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import { v4 as uuid } from 'uuid';

/** */
var AnnotationResource = /*#__PURE__*/function () {
  /** */
  function AnnotationResource() {
    var resource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, AnnotationResource);
    this.resource = resource;
  }

  /** */
  return _createClass(AnnotationResource, [{
    key: "isOnlyTag",
    value: function isOnlyTag() {
      return this.motivations.length === 1 && this.motivations[0] === 'oa:tagging';
    }

    /** */
  }, {
    key: "id",
    get: function get() {
      this._id = this._id || this.resource['@id'] || this.resources[0] && this.resources[0]['@id'] || uuid();
      return this._id; // eslint-disable-line no-underscore-dangle
    }

    /** */
  }, {
    key: "targetId",
    get: function get() {
      var on = this.on[0];
      switch (typeof on) {
        case 'string':
          return on.replace(/#?xywh=(.*)$/, '');
        case 'object':
          return on.full.replace(/#?xywh=(.*)$/, '');
        default:
          return null;
      }
    }

    /**
     * @return {[Array]}
     */
  }, {
    key: "motivations",
    get: function get() {
      return flatten(compact(new Array(this.resource.motivation)));
    }

    /** */
  }, {
    key: "resources",
    get: function get() {
      return flatten(compact(new Array(this.resource.resource)));
    }

    /** */
  }, {
    key: "on",
    get: function get() {
      return flatten(compact(new Array(this.resource.on)));
    }

    /** */
  }, {
    key: "tags",
    get: function get() {
      if (this.isOnlyTag()) {
        return this.resources.map(function (r) {
          return r.chars;
        });
      }
      return this.resources.filter(function (r) {
        return r['@type'] === 'oa:Tag';
      }).map(function (r) {
        return r.chars;
      });
    }

    /** */
  }, {
    key: "chars",
    get: function get() {
      return this.resources.filter(function (r) {
        return r['@type'] !== 'oa:Tag';
      }).map(function (r) {
        return r.chars;
      }).join(' ');
    }

    /** */
  }, {
    key: "selector",
    get: function get() {
      var on = this.on[0];
      switch (typeof on) {
        case 'string':
          return on;
        case 'object':
          // For choices, just return the default for now. FIXME: enhance for SVG
          // selectors
          if (on.selector['@type'] === 'oa:Choice') {
            return on.selector["default"];
          }
          return on.selector;
        default:
          return null;
      }
    }

    /** */
  }, {
    key: "svgSelector",
    get: function get() {
      var on = this.on[0];
      switch (typeof on) {
        case 'string':
          return null;
        case 'object':
          if (on.selector && on.selector.item && on.selector.item['@type'] === 'oa:SvgSelector') {
            return on.selector.item;
          }
          return null;
        default:
          return null;
      }
    }

    /** */
  }, {
    key: "fragmentSelector",
    get: function get() {
      var selector = this.selector;
      var match;
      switch (typeof selector) {
        case 'string':
          match = selector.match(/xywh=(.*)$/);
          break;
        case 'object':
          match = selector.value.match(/xywh=(.*)$/);
          break;
        default:
          return null;
      }
      return match && match[1].split(',').map(function (str) {
        return parseInt(str, 10);
      });
    }
  }]);
}();
export { AnnotationResource as default };