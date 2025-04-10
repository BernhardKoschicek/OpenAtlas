"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Window = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));
var _contextTypes = require("react-mosaic-component/lib/contextTypes");
var _cssNs = _interopRequireDefault(require("../config/css-ns"));
var _WindowTopBar = _interopRequireDefault(require("../containers/WindowTopBar"));
var _PrimaryWindow = _interopRequireDefault(require("../containers/PrimaryWindow"));
var _CompanionArea = _interopRequireDefault(require("../containers/CompanionArea"));
var _MinimalWindow = _interopRequireDefault(require("../containers/MinimalWindow"));
var _ErrorContent = _interopRequireDefault(require("../containers/ErrorContent"));
var _IIIFAuthentication = _interopRequireDefault(require("../containers/IIIFAuthentication"));
var _PluginHook = require("./PluginHook");
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
 * Represents a Window in the mirador workspace
 * @param {object} window
 */
var Window = exports.Window = /*#__PURE__*/function (_Component) {
  /** */
  function Window(props) {
    var _this;
    _classCallCheck(this, Window);
    _this = _callSuper(this, Window, [props]);
    _this.state = {};
    return _this;
  }

  /** */
  _inherits(Window, _Component);
  return _createClass(Window, [{
    key: "wrappedTopBar",
    value:
    /**
     * wrappedTopBar - will conditionally wrap a WindowTopBar for needed
     * additional functionality based on workspace type
     */
    function wrappedTopBar() {
      var _this$props = this.props,
        windowId = _this$props.windowId,
        workspaceType = _this$props.workspaceType,
        windowDraggable = _this$props.windowDraggable;
      var topBar = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_WindowTopBar["default"], {
        windowId: windowId,
        windowDraggable: windowDraggable
      }), /*#__PURE__*/_react["default"].createElement(_IIIFAuthentication["default"], {
        windowId: windowId
      }));
      if (workspaceType === 'mosaic' && windowDraggable) {
        var mosaicWindowActions = this.context.mosaicWindowActions;
        return mosaicWindowActions.connectDragSource(topBar);
      }
      return topBar;
    }

    /**
     * Renders things
     */
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        focusWindow = _this$props2.focusWindow,
        label = _this$props2.label,
        isFetching = _this$props2.isFetching,
        maximized = _this$props2.maximized,
        sideBarOpen = _this$props2.sideBarOpen,
        view = _this$props2.view,
        windowId = _this$props2.windowId,
        classes = _this$props2.classes,
        t = _this$props2.t,
        manifestError = _this$props2.manifestError;
      var _this$state = this.state,
        error = _this$state.error,
        hasError = _this$state.hasError;
      if (hasError) {
        return /*#__PURE__*/_react["default"].createElement(_MinimalWindow["default"], {
          windowId: windowId
        }, /*#__PURE__*/_react["default"].createElement(_ErrorContent["default"], {
          error: error,
          windowId: windowId
        }));
      }
      return /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
        onFocus: focusWindow,
        component: "section",
        elevation: 1,
        id: windowId,
        className: (0, _classnames["default"])(classes.window, (0, _cssNs["default"])('window'), maximized ? classes.maximized : null),
        "aria-label": t('window', {
          label: label
        })
      }, this.wrappedTopBar(), manifestError && /*#__PURE__*/_react["default"].createElement(_ErrorContent["default"], {
        error: {
          stack: manifestError
        },
        windowId: windowId
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.middle
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.middleLeft
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.primaryWindow
      }, /*#__PURE__*/_react["default"].createElement(_PrimaryWindow["default"], {
        view: view,
        windowId: windowId,
        isFetching: isFetching,
        sideBarOpen: sideBarOpen
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.companionAreaBottom
      }, /*#__PURE__*/_react["default"].createElement(_CompanionArea["default"], {
        windowId: windowId,
        position: "bottom"
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.companionAreaRight
      }, /*#__PURE__*/_react["default"].createElement(_CompanionArea["default"], {
        windowId: windowId,
        position: "right"
      }), /*#__PURE__*/_react["default"].createElement(_CompanionArea["default"], {
        windowId: windowId,
        position: "far-right"
      }))), /*#__PURE__*/_react["default"].createElement(_CompanionArea["default"], {
        windowId: windowId,
        position: "far-bottom"
      }), /*#__PURE__*/_react["default"].createElement(_PluginHook.PluginHook, this.props));
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
Window.contextType = _contextTypes.MosaicWindowContext;
Window.defaultProps = {
  classes: {},
  focusWindow: function focusWindow() {},
  isFetching: false,
  label: null,
  manifestError: null,
  maximized: false,
  sideBarOpen: false,
  view: undefined,
  windowDraggable: null,
  workspaceType: null
};