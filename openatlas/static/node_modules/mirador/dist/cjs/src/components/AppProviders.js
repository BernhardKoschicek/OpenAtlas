"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppProviders = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactFullScreen = _interopRequireDefault(require("react-full-screen"));
var _reactI18next = require("react-i18next");
var _reactAriaLive = require("react-aria-live");
var _styles = require("@material-ui/core/styles");
var _reactDnd = require("react-dnd");
var _reactDndMultiBackend = _interopRequireDefault(require("react-dnd-multi-backend"));
var _HTML5toTouch = _interopRequireDefault(require("react-dnd-multi-backend/dist/cjs/HTML5toTouch"));
var _jss = require("jss");
var _jssRtl = _interopRequireDefault(require("jss-rtl"));
var _i18n = _interopRequireDefault(require("../i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == typeof e || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * Allow applications to opt-out of (or provide their own) drag and drop context
 */
var MaybeDndProvider = function MaybeDndProvider(props) {
  var dndManager = props.dndManager,
    children = props.children;
  if (dndManager === false) {
    return children;
  }
  if (dndManager === undefined) {
    return /*#__PURE__*/_react["default"].createElement(_reactDnd.DndProvider, {
      backend: _reactDndMultiBackend["default"],
      options: _HTML5toTouch["default"]
    }, children);
  }
  return /*#__PURE__*/_react["default"].createElement(_reactDnd.DndContext.Provider, {
    value: dndManager
  }, children);
};
/**
 * This component adds viewer-specific providers.
 * @prop {Object} manifests
 */
var AppProviders = exports.AppProviders = /*#__PURE__*/function (_Component) {
  /** */
  function AppProviders(props) {
    var _this;
    _classCallCheck(this, AppProviders);
    _this = _callSuper(this, AppProviders, [props]);
    _this.i18n = (0, _i18n["default"])();
    return _this;
  }

  /**
   * Set i18n language on component mount
   */
  _inherits(AppProviders, _Component);
  return _createClass(AppProviders, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var language = this.props.language;
      this.i18n.changeLanguage(language);
    }

    /**
     * Update the i18n language if it is changed
     */
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var language = this.props.language;
      if (prevProps.language !== language) {
        this.i18n.changeLanguage(language);
      }
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        children = _this$props.children,
        createGenerateClassNameOptions = _this$props.createGenerateClassNameOptions,
        isFullscreenEnabled = _this$props.isFullscreenEnabled,
        setWorkspaceFullscreen = _this$props.setWorkspaceFullscreen,
        theme = _this$props.theme,
        translations = _this$props.translations,
        dndManager = _this$props.dndManager;
      var generateClassName = (0, _styles.createGenerateClassName)(createGenerateClassNameOptions);
      Object.keys(translations).forEach(function (lng) {
        _this2.i18n.addResourceBundle(lng, 'translation', translations[lng], true, true);
      });
      return /*#__PURE__*/_react["default"].createElement(_reactFullScreen["default"], {
        enabled: isFullscreenEnabled,
        onChange: setWorkspaceFullscreen
      }, /*#__PURE__*/_react["default"].createElement(_reactI18next.I18nextProvider, {
        i18n: this.i18n
      }, /*#__PURE__*/_react["default"].createElement(_reactAriaLive.LiveAnnouncer, null, /*#__PURE__*/_react["default"].createElement(_styles.ThemeProvider, {
        theme: (0, _styles.createTheme)(theme)
      }, /*#__PURE__*/_react["default"].createElement(_styles.StylesProvider, {
        jss: (0, _jss.create)({
          plugins: [].concat(_toConsumableArray((0, _styles.jssPreset)().plugins), [(0, _jssRtl["default"])()])
        }),
        generateClassName: generateClassName
      }, /*#__PURE__*/_react["default"].createElement(MaybeDndProvider, {
        dndManager: dndManager
      }, children))))));
    }
  }]);
}(_react.Component);
AppProviders.defaultProps = {
  children: null,
  createGenerateClassNameOptions: {},
  dndManager: undefined,
  isFullscreenEnabled: false
};