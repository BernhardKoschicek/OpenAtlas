"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _reactRedux = require("react-redux");
var _App = _interopRequireDefault(require("../components/App"));
var _pluginPreprocessing = require("../extend/pluginPreprocessing");
var _createPluggableStore = _interopRequireDefault(require("../state/createPluggableStore"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Default Mirador instantiation
 */
var MiradorViewer = /*#__PURE__*/function () {
  /**
   */
  function MiradorViewer(config) {
    var viewerConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, MiradorViewer);
    this.plugins = (0, _pluginPreprocessing.filterValidPlugins)(viewerConfig.plugins || []);
    this.config = config;
    this.store = viewerConfig.store || (0, _createPluggableStore["default"])(this.config, this.plugins);
    if (config.id) {
      this.container = document.getElementById(config.id);
      config.id && _reactDom["default"].render(this.render(), this.container);
    }
  }

  /**
   * Render the mirador viewer
   */
  return _createClass(MiradorViewer, [{
    key: "render",
    value: function render() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
        store: this.store
      }, /*#__PURE__*/_react["default"].createElement(_App["default"], Object.assign({
        plugins: this.plugins
      }, props)));
    }

    /**
     * Cleanup method to unmount Mirador from the dom
     */
  }, {
    key: "unmount",
    value: function unmount() {
      this.container && _reactDom["default"].unmountComponentAtNode(this.container);
    }
  }]);
}();
var _default = exports["default"] = MiradorViewer;