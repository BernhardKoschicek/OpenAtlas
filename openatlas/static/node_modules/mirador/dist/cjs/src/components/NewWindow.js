"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewWindow = void 0;
var _react = require("react");
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == typeof e || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * Opens a new window for click
 */
var NewWindow = exports.NewWindow = /*#__PURE__*/function (_Component) {
  /** */
  function NewWindow(props) {
    var _this;
    _classCallCheck(this, NewWindow);
    _this = _callSuper(this, NewWindow, [props]);
    _this.released = undefined;
    _this.window = null;
    _this.checkIfWindowClosed = null;
    return _this;
  }

  /** */
  _inherits(NewWindow, _Component);
  return _createClass(NewWindow, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.openWindow();
    }

    /**
     * Close the opened window we unmount
     */
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.window) {
        this.window.close();
      }
    }

    /** @private */
  }, {
    key: "onClose",
    value: function onClose() {
      var _this$props = this.props,
        onClose = _this$props.onClose,
        url = _this$props.url;
      if (this.released) return;
      this.released = true;
      clearInterval(this.checkIfWindowClosed);
      onClose(url);
    }

    /** */
  }, {
    key: "openWindow",
    value: function openWindow() {
      var _this2 = this;
      var _this$props2 = this.props,
        depWindow = _this$props2.depWindow,
        features = _this$props2.features,
        name = _this$props2.name,
        url = _this$props2.url;
      this.window = (depWindow || window).open(url, name, features);
      this.released = false;
      this.checkIfWindowClosed = setInterval(function () {
        if (!_this2.window || _this2.window.closed) {
          _this2.onClose();
        }
      }, 250);
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
}(_react.Component);
NewWindow.defaultProps = {
  depWindow: undefined,
  features: undefined,
  name: undefined
};