"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanionWindowFactory = void 0;
var _react = _interopRequireWildcard(require("react"));
var _CompanionWindowRegistry = _interopRequireDefault(require("../lib/CompanionWindowRegistry"));
var _CompanionWindow = _interopRequireDefault(require("../containers/CompanionWindow"));
var _ErrorContent = _interopRequireDefault(require("../containers/ErrorContent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
 * Render a companion window using the appropriate component for the content
 */
var CompanionWindowFactory = exports.CompanionWindowFactory = /*#__PURE__*/function (_Component) {
  /** */
  function CompanionWindowFactory(props) {
    var _this;
    _classCallCheck(this, CompanionWindowFactory);
    _this = _callSuper(this, CompanionWindowFactory, [props]);
    _this.state = {};
    return _this;
  }

  /** */
  _inherits(CompanionWindowFactory, _Component);
  return _createClass(CompanionWindowFactory, [{
    key: "componentDidUpdate",
    value:
    /**
     * Clear the error state if the internal content changes; this is a rare
     * case, only when we reuse an existing companionWindow instance for
     * the left-anchored companion area (anti-pattern?)
     */
    function componentDidUpdate(prevProps) {
      var content = this.props.content;

      // Typical usage (don't forget to compare props):
      if (content !== prevProps.content) {
        this.setState({
          // eslint-disable-line react/no-did-update-set-state
          error: null,
          hasError: false
        });
      }
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        content = _this$props.content,
        windowId = _this$props.windowId,
        id = _this$props.id,
        t = _this$props.t;
      var _this$state = this.state,
        error = _this$state.error,
        hasError = _this$state.hasError;
      if (hasError) {
        return /*#__PURE__*/_react["default"].createElement(_CompanionWindow["default"], {
          title: t('error'),
          windowId: windowId,
          id: id
        }, /*#__PURE__*/_react["default"].createElement(_ErrorContent["default"], {
          error: error,
          windowId: windowId,
          companionWindowId: id
        }));
      }
      var type = _CompanionWindowRegistry["default"][content];
      if (!type) return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
      return /*#__PURE__*/_react["default"].createElement(type, {
        id: id,
        windowId: windowId
      });
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return {
        error: error,
        hasError: true
      };
    }
  }]);
}(_react.Component);
CompanionWindowFactory.defaultProps = {
  content: null,
  t: function t(key) {
    return key;
  }
};