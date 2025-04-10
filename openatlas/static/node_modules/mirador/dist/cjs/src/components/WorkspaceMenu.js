"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkspaceMenu = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Menu = _interopRequireDefault(require("@material-ui/core/Menu"));
var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _LanguageSettings = _interopRequireDefault(require("../containers/LanguageSettings"));
var _NestedMenu = require("./NestedMenu");
var _WorkspaceSelectionDialog = _interopRequireDefault(require("../containers/WorkspaceSelectionDialog"));
var _cssNs = _interopRequireDefault(require("../config/css-ns"));
var _ChangeThemeDialog = _interopRequireDefault(require("../containers/ChangeThemeDialog"));
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
 */
var WorkspaceMenu = exports.WorkspaceMenu = /*#__PURE__*/function (_Component) {
  /**
   * constructor -
   */
  function WorkspaceMenu(props) {
    var _this;
    _classCallCheck(this, WorkspaceMenu);
    _this = _callSuper(this, WorkspaceMenu, [props]);
    _this.state = {
      changeTheme: {},
      toggleZoom: {},
      workspaceSelection: {}
    };
    _this.handleMenuItemClick = _this.handleMenuItemClick.bind(_this);
    _this.handleMenuItemClose = _this.handleMenuItemClose.bind(_this);
    return _this;
  }

  /**
   * @private
   */
  _inherits(WorkspaceMenu, _Component);
  return _createClass(WorkspaceMenu, [{
    key: "handleMenuItemClick",
    value: function handleMenuItemClick(item, event) {
      var obj = {};
      obj[item] = {};
      obj[item].open = true;
      obj[item].anchorEl = event.currentTarget;
      this.setState(obj);
    }

    /**
     * @private
     */
  }, {
    key: "handleMenuItemClose",
    value: function handleMenuItemClose(item) {
      var _this2 = this;
      return function (event) {
        var obj = {};
        obj[item] = {};
        obj[item].open = false;
        obj[item].anchorEl = null;
        _this2.setState(obj);
      };
    }

    /**
     * @private
     */
  }, {
    key: "handleZoomToggleClick",
    value: function handleZoomToggleClick() {
      var _this$props = this.props,
        toggleZoomControls = _this$props.toggleZoomControls,
        showZoomControls = _this$props.showZoomControls;
      toggleZoomControls(!showZoomControls);
    }

    /**
     * render
     * @return
     */
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props2 = this.props,
        containerId = _this$props2.containerId,
        handleClose = _this$props2.handleClose,
        anchorEl = _this$props2.anchorEl,
        showThemePicker = _this$props2.showThemePicker,
        isWorkspaceAddVisible = _this$props2.isWorkspaceAddVisible,
        t = _this$props2.t,
        showZoomControls = _this$props2.showZoomControls;
      var _this$state = this.state,
        changeTheme = _this$state.changeTheme,
        toggleZoom = _this$state.toggleZoom,
        workspaceSelection = _this$state.workspaceSelection;
      var container = document.querySelector("#".concat(containerId, " .").concat((0, _cssNs["default"])('viewer')));
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Menu["default"], {
        id: "workspace-menu",
        container: container,
        anchorEl: anchorEl,
        anchorOrigin: {
          horizontal: 'right',
          vertical: 'top'
        },
        transformOrigin: {
          horizontal: 'left',
          vertical: 'top'
        },
        open: Boolean(anchorEl),
        onClose: handleClose
      }, /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
        "aria-haspopup": "true",
        disabled: isWorkspaceAddVisible,
        onClick: function onClick(e) {
          _this3.handleZoomToggleClick(e);
          handleClose(e);
        },
        "aria-owns": toggleZoom.anchorEl ? 'toggle-zoom-menu' : undefined
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "body1"
      }, showZoomControls ? t('hideZoomControls') : t('showZoomControls'))), /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
        "aria-haspopup": "true",
        onClick: function onClick(e) {
          _this3.handleMenuItemClick('workspaceSelection', e);
          handleClose(e);
        },
        "aria-owns": workspaceSelection.anchorEl ? 'workspace-selection' : undefined
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "body1"
      }, t('selectWorkspaceMenu'))), /*#__PURE__*/_react["default"].createElement(_NestedMenu.NestedMenu, {
        label: t('language')
      }, /*#__PURE__*/_react["default"].createElement(_LanguageSettings["default"], {
        afterSelect: handleClose
      })), showThemePicker && /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
        "aria-haspopup": "true",
        onClick: function onClick(e) {
          _this3.handleMenuItemClick('changeTheme', e);
          handleClose(e);
        },
        "aria-owns": changeTheme.anchorEl ? 'change-theme' : undefined
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "body1"
      }, t('changeTheme'))), /*#__PURE__*/_react["default"].createElement(_PluginHook.PluginHook, this.props)), Boolean(changeTheme.open) && /*#__PURE__*/_react["default"].createElement(_ChangeThemeDialog["default"], {
        container: container,
        handleClose: this.handleMenuItemClose('changeTheme'),
        open: Boolean(changeTheme.open)
      }), Boolean(workspaceSelection.open) && /*#__PURE__*/_react["default"].createElement(_WorkspaceSelectionDialog["default"], {
        open: Boolean(workspaceSelection.open),
        container: container,
        handleClose: this.handleMenuItemClose('workspaceSelection')
      }));
    }
  }]);
}(_react.Component);
WorkspaceMenu.defaultProps = {
  anchorEl: null,
  isWorkspaceAddVisible: false,
  showThemePicker: false,
  showZoomControls: false,
  t: function t(key) {
    return key;
  },
  toggleZoomControls: function toggleZoomControls() {}
};