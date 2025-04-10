"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowSideBarButtons = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Badge = _interopRequireDefault(require("@material-ui/core/Badge"));
var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));
var _Tab = _interopRequireDefault(require("@material-ui/core/Tab"));
var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));
var _InfoSharp = _interopRequireDefault(require("@material-ui/icons/InfoSharp"));
var _CommentSharp = _interopRequireDefault(require("@material-ui/icons/CommentSharp"));
var _CopyrightSharp = _interopRequireDefault(require("@material-ui/icons/CopyrightSharp"));
var _LayersSharp = _interopRequireDefault(require("@material-ui/icons/LayersSharp"));
var _SearchSharp = _interopRequireDefault(require("@material-ui/icons/SearchSharp"));
var _CanvasIndexIcon = _interopRequireDefault(require("./icons/CanvasIndexIcon"));
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
 *
 */
var WindowSideBarButtons = exports.WindowSideBarButtons = /*#__PURE__*/function (_Component) {
  /** */
  function WindowSideBarButtons(props) {
    var _this;
    _classCallCheck(this, WindowSideBarButtons);
    _this = _callSuper(this, WindowSideBarButtons, [props]);
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  /**
   * @param {object} event the change event
   * @param {string} value the tab's value
  */
  _inherits(WindowSideBarButtons, _Component);
  return _createClass(WindowSideBarButtons, [{
    key: "handleChange",
    value: function handleChange(event, value) {
      var addCompanionWindow = this.props.addCompanionWindow;
      addCompanionWindow(value);
    }

    /**
     * render
     *
     * @return {type}  description
     */
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        hasAnnotations = _this$props.hasAnnotations,
        hasAnyAnnotations = _this$props.hasAnyAnnotations,
        hasAnyLayers = _this$props.hasAnyLayers,
        hasCurrentLayers = _this$props.hasCurrentLayers,
        hasSearchResults = _this$props.hasSearchResults,
        hasSearchService = _this$props.hasSearchService,
        panels = _this$props.panels,
        PluginComponents = _this$props.PluginComponents,
        sideBarPanel = _this$props.sideBarPanel,
        t = _this$props.t;

      /** */
      var TabButton = function TabButton(props) {
        return /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
          title: t('openCompanionWindow', {
            context: props.value
          })
        }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], Object.assign({}, props, {
          classes: {
            root: classes.tab,
            selected: classes.tabSelected
          },
          "aria-label": t('openCompanionWindow', {
            context: props.value
          }),
          disableRipple: true,
          onKeyUp: _this2.handleKeyUp
        })));
      };
      return /*#__PURE__*/_react["default"].createElement(_Tabs["default"], {
        classes: {
          flexContainer: classes.tabsFlexContainer,
          indicator: classes.tabsIndicator
        },
        value: sideBarPanel === 'closed' ? false : sideBarPanel,
        onChange: this.handleChange,
        variant: "fullWidth",
        indicatorColor: "primary",
        textColor: "primary",
        orientation: "vertical",
        "aria-orientation": "vertical",
        "aria-label": t('sidebarPanelsNavigation')
      }, panels.info && /*#__PURE__*/_react["default"].createElement(TabButton, {
        value: "info",
        icon: /*#__PURE__*/_react["default"].createElement(_InfoSharp["default"], null)
      }), panels.attribution && /*#__PURE__*/_react["default"].createElement(TabButton, {
        value: "attribution",
        icon: /*#__PURE__*/_react["default"].createElement(_CopyrightSharp["default"], null)
      }), panels.canvas && /*#__PURE__*/_react["default"].createElement(TabButton, {
        value: "canvas",
        icon: /*#__PURE__*/_react["default"].createElement(_CanvasIndexIcon["default"], null)
      }), panels.annotations && (hasAnnotations || hasAnyAnnotations) && /*#__PURE__*/_react["default"].createElement(TabButton, {
        value: "annotations",
        icon: /*#__PURE__*/_react["default"].createElement(_Badge["default"], {
          classes: {
            badge: classes.badge
          },
          invisible: !hasAnnotations,
          variant: "dot"
        }, /*#__PURE__*/_react["default"].createElement(_CommentSharp["default"], null))
      }), panels.search && hasSearchService && /*#__PURE__*/_react["default"].createElement(TabButton, {
        value: "search",
        icon: /*#__PURE__*/_react["default"].createElement(_Badge["default"], {
          classes: {
            badge: classes.badge
          },
          invisible: !hasSearchResults,
          variant: "dot"
        }, /*#__PURE__*/_react["default"].createElement(_SearchSharp["default"], null))
      }), panels.layers && hasAnyLayers && /*#__PURE__*/_react["default"].createElement(TabButton, {
        value: "layers",
        icon: /*#__PURE__*/_react["default"].createElement(_Badge["default"], {
          classes: {
            badge: classes.badge
          },
          invisible: !hasCurrentLayers,
          variant: "dot"
        }, /*#__PURE__*/_react["default"].createElement(_LayersSharp["default"], null))
      }), PluginComponents && PluginComponents.map(function (PluginComponent) {
        return /*#__PURE__*/_react["default"].createElement(TabButton, {
          key: PluginComponent.value,
          value: PluginComponent.value,
          icon: /*#__PURE__*/_react["default"].createElement(PluginComponent, null)
        });
      }));
    }
  }]);
}(_react.Component);
WindowSideBarButtons.defaultProps = {
  classes: {},
  hasAnnotations: false,
  hasAnyAnnotations: false,
  hasAnyLayers: false,
  hasCurrentLayers: false,
  hasSearchResults: false,
  hasSearchService: false,
  panels: [],
  PluginComponents: null,
  sideBarPanel: 'closed',
  t: function t(key) {
    return key;
  }
};