"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowSideBarInfoPanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _CompanionWindow = _interopRequireDefault(require("../containers/CompanionWindow"));
var _CanvasInfo = _interopRequireDefault(require("../containers/CanvasInfo"));
var _LocalePicker = _interopRequireDefault(require("../containers/LocalePicker"));
var _ManifestInfo = _interopRequireDefault(require("../containers/ManifestInfo"));
var _CollectionInfo = _interopRequireDefault(require("../containers/CollectionInfo"));
var _ManifestRelatedLinks = _interopRequireDefault(require("../containers/ManifestRelatedLinks"));
var _cssNs = _interopRequireDefault(require("../config/css-ns"));
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
 * WindowSideBarInfoPanel
 */
var WindowSideBarInfoPanel = exports.WindowSideBarInfoPanel = /*#__PURE__*/function (_Component) {
  function WindowSideBarInfoPanel() {
    _classCallCheck(this, WindowSideBarInfoPanel);
    return _callSuper(this, WindowSideBarInfoPanel, arguments);
  }
  _inherits(WindowSideBarInfoPanel, _Component);
  return _createClass(WindowSideBarInfoPanel, [{
    key: "render",
    value:
    /**
     * render
     * @return
     */
    function render() {
      var _this$props = this.props,
        windowId = _this$props.windowId,
        id = _this$props.id,
        canvasIds = _this$props.canvasIds,
        classes = _this$props.classes,
        collectionPath = _this$props.collectionPath,
        t = _this$props.t,
        locale = _this$props.locale,
        setLocale = _this$props.setLocale,
        availableLocales = _this$props.availableLocales,
        showLocalePicker = _this$props.showLocalePicker;
      return /*#__PURE__*/_react["default"].createElement(_CompanionWindow["default"], {
        title: t('aboutThisItem'),
        paperClassName: (0, _cssNs["default"])('window-sidebar-info-panel'),
        windowId: windowId,
        id: id,
        titleControls: showLocalePicker && /*#__PURE__*/_react["default"].createElement(_LocalePicker["default"], {
          locale: locale,
          setLocale: setLocale,
          availableLocales: availableLocales
        })
      }, canvasIds.map(function (canvasId, index) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: canvasId,
          className: classes.section
        }, /*#__PURE__*/_react["default"].createElement(_CanvasInfo["default"], {
          id: id,
          canvasId: canvasId,
          index: index,
          totalSize: canvasIds.length,
          windowId: windowId
        }));
      }), collectionPath.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.section
      }, /*#__PURE__*/_react["default"].createElement(_CollectionInfo["default"], {
        id: id,
        windowId: windowId
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.section
      }, /*#__PURE__*/_react["default"].createElement(_ManifestInfo["default"], {
        id: id,
        windowId: windowId
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: classes.section
      }, /*#__PURE__*/_react["default"].createElement(_ManifestRelatedLinks["default"], {
        id: id,
        windowId: windowId
      })));
    }
  }]);
}(_react.Component);
WindowSideBarInfoPanel.defaultProps = {
  availableLocales: [],
  canvasIds: [],
  classes: {},
  collectionPath: [],
  locale: '',
  setLocale: undefined,
  showLocalePicker: false,
  t: function t(key) {
    return key;
  }
};