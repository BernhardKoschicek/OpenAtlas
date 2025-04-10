"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _compact = _interopRequireDefault(require("lodash/compact"));
var _flatten = _interopRequireDefault(require("lodash/flatten"));
var _uuid = require("uuid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * A modeled WebAnnotation item
 */
var AnnotationItem = exports["default"] = /*#__PURE__*/function () {
  /** */
  function AnnotationItem() {
    var resource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, AnnotationItem);
    this.resource = resource;
  }

  /** */
  return _createClass(AnnotationItem, [{
    key: "isOnlyTag",
    value: function isOnlyTag() {
      return this.motivations.length === 1 && this.motivations[0] === 'tagging';
    }

    /** */
  }, {
    key: "id",
    get: function get() {
      this._id = this._id || this.resource.id || (0, _uuid.v4)(); // eslint-disable-line no-underscore-dangle
      return this._id; // eslint-disable-line no-underscore-dangle
    }

    /** */
  }, {
    key: "targetId",
    get: function get() {
      var target = this.target[0];
      switch (typeof target) {
        case 'string':
          return target.replace(/#?xywh=(.*)$/, '');
        case 'object':
          return target.source && target.source.id || target.source || target.id;
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
      return (0, _flatten["default"])((0, _compact["default"])(new Array(this.resource.motivation)));
    }

    /** */
  }, {
    key: "body",
    get: function get() {
      return (0, _flatten["default"])((0, _compact["default"])(new Array(this.resource.body)));
    }

    /** */
  }, {
    key: "resources",
    get: function get() {
      return this.body;
    }

    /** */
  }, {
    key: "tags",
    get: function get() {
      if (this.isOnlyTag()) {
        return this.body.map(function (r) {
          return r.value;
        });
      }
      return this.body.filter(function (r) {
        return r.purpose === 'tagging';
      }).map(function (r) {
        return r.value;
      });
    }

    /** */
  }, {
    key: "target",
    get: function get() {
      return (0, _flatten["default"])((0, _compact["default"])(new Array(this.resource.target)));
    }

    /** */
  }, {
    key: "chars",
    get: function get() {
      if (this.isOnlyTag()) return null;
      return this.body.filter(function (r) {
        return r.purpose !== 'tagging';
      }).map(function (r) {
        return r.value;
      }).join(' ');
    }

    /** */
  }, {
    key: "selector",
    get: function get() {
      var target = this.target[0];
      switch (typeof target) {
        case 'string':
          return target;
        case 'object':
          return (0, _flatten["default"])((0, _compact["default"])(new Array(target.selector)));
        default:
          return null;
      }
    }

    /** */
  }, {
    key: "svgSelector",
    get: function get() {
      var selector = this.selector;
      switch (typeof selector) {
        case 'string':
          return null;
        case 'object':
          return selector.find(function (s) {
            return s.type && s.type === 'SvgSelector';
          });
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
      var fragmentSelector;
      switch (typeof selector) {
        case 'string':
          match = selector.match(/xywh=(.*)$/);
          break;
        case 'object':
          fragmentSelector = selector.find(function (s) {
            return s.type && s.type === 'FragmentSelector';
          });
          match = fragmentSelector && fragmentSelector.value.match(/xywh=(.*)$/);
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