"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkspaceExport = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));
var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));
var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));
var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _Snackbar = _interopRequireDefault(require("@material-ui/core/Snackbar"));
var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));
var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));
var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));
var _Accordion = _interopRequireDefault(require("@material-ui/core/Accordion"));
var _AccordionSummary = _interopRequireDefault(require("@material-ui/core/AccordionSummary"));
var _AccordionDetails = _interopRequireDefault(require("@material-ui/core/AccordionDetails"));
var _reactCopyToClipboard = require("react-copy-to-clipboard");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
 */
var WorkspaceExport = exports.WorkspaceExport = /*#__PURE__*/function (_Component) {
  /** */
  function WorkspaceExport(props) {
    var _this;
    _classCallCheck(this, WorkspaceExport);
    _this = _callSuper(this, WorkspaceExport, [props]);
    _this.state = {
      copied: false
    };
    _this.onCopy = _this.onCopy.bind(_this);
    _this.handleClose = _this.handleClose.bind(_this);
    return _this;
  }

  /** Handle closing after the content is copied and the snackbar is done */
  _inherits(WorkspaceExport, _Component);
  return _createClass(WorkspaceExport, [{
    key: "handleClose",
    value: function handleClose() {
      var handleClose = this.props.handleClose;
      handleClose();
    }

    /** Show the snackbar */
  }, {
    key: "onCopy",
    value: function onCopy() {
      this.setState({
        copied: true
      });
    }

    /**
     * @private
     */
  }, {
    key: "exportedState",
    value: function exportedState() {
      var exportableState = this.props.exportableState;
      return JSON.stringify(exportableState, null, 2);
    }

    /**
     * render
     * @return
     */
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        children = _this$props.children,
        classes = _this$props.classes,
        container = _this$props.container,
        open = _this$props.open,
        t = _this$props.t;
      var copied = this.state.copied;
      if (copied) {
        return /*#__PURE__*/_react["default"].createElement(_Snackbar["default"], {
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'top'
          },
          open: true,
          autoHideDuration: 6000,
          onClose: this.handleClose,
          message: t('exportCopied'),
          action: /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
            size: "small",
            "aria-label": t('dismiss'),
            color: "inherit",
            onClick: this.handleClose
          }, /*#__PURE__*/_react["default"].createElement(_Close["default"], {
            fontSize: "small"
          }))
        });
      }
      return /*#__PURE__*/_react["default"].createElement(_Dialog["default"], {
        id: "workspace-settings",
        container: container,
        open: open,
        onClose: this.handleClose,
        scroll: "paper",
        fullWidth: true,
        maxWidth: "sm"
      }, /*#__PURE__*/_react["default"].createElement(_DialogTitle["default"], {
        id: "form-dialog-title",
        disableTypography: true
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "h2"
      }, t('downloadExport'))), /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], null, /*#__PURE__*/_react["default"].createElement(_Accordion["default"], {
        elevation: 0
      }, /*#__PURE__*/_react["default"].createElement(_AccordionSummary["default"], {
        classes: {
          root: classes.accordionTitle
        },
        expandIcon: /*#__PURE__*/_react["default"].createElement(_ExpandMore["default"], null)
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "h4"
      }, t('viewWorkspaceConfiguration'))), /*#__PURE__*/_react["default"].createElement(_AccordionDetails["default"], null, children, /*#__PURE__*/_react["default"].createElement("pre", null, this.exportedState())))), /*#__PURE__*/_react["default"].createElement(_DialogActions["default"], null, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        onClick: this.handleClose
      }, t('cancel')), /*#__PURE__*/_react["default"].createElement(_reactCopyToClipboard.CopyToClipboard, {
        onCopy: this.onCopy,
        text: this.exportedState()
      }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        variant: "contained",
        color: "primary"
      }, t('copy')))));
    }
  }]);
}(_react.Component);
WorkspaceExport.defaultProps = {
  children: null,
  classes: {},
  container: null,
  open: false,
  t: function t(key) {
    return key;
  }
};