"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkspaceAdd = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _AddSharp = _interopRequireDefault(require("@material-ui/icons/AddSharp"));
var _ExpandMoreSharp = _interopRequireDefault(require("@material-ui/icons/ExpandMoreSharp"));
var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));
var _Drawer = _interopRequireDefault(require("@material-ui/core/Drawer"));
var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));
var _Fab = _interopRequireDefault(require("@material-ui/core/Fab"));
var _List = _interopRequireDefault(require("@material-ui/core/List"));
var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));
var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _cssNs = _interopRequireDefault(require("../config/css-ns"));
var _ManifestForm = _interopRequireDefault(require("../containers/ManifestForm"));
var _ManifestListItem = _interopRequireDefault(require("../containers/ManifestListItem"));
var _MiradorMenuButton = _interopRequireDefault(require("../containers/MiradorMenuButton"));
var _IIIFDropTarget = require("./IIIFDropTarget");
var _PluginHook = require("./PluginHook");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
 * An area for managing manifests and adding them to workspace
 * @memberof Workspace
 * @private
 */
var WorkspaceAdd = exports.WorkspaceAdd = /*#__PURE__*/function (_React$Component) {
  /** */
  function WorkspaceAdd(props) {
    var _this;
    _classCallCheck(this, WorkspaceAdd);
    _this = _callSuper(this, WorkspaceAdd, [props]);
    _this.state = {
      addResourcesOpen: false
    };
    _this.ref = /*#__PURE__*/_react["default"].createRef();
    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.setAddResourcesVisibility = _this.setAddResourcesVisibility.bind(_this);
    _this.handleDrop = _this.handleDrop.bind(_this);
    return _this;
  }

  /** */
  _inherits(WorkspaceAdd, _React$Component);
  return _createClass(WorkspaceAdd, [{
    key: "handleDrop",
    value: function handleDrop(_ref, props, monitor) {
      var manifestId = _ref.manifestId,
        manifestJson = _ref.manifestJson;
      var addResource = this.props.addResource;
      if (manifestJson) {
        addResource(manifestId, manifestJson, {
          provider: 'file'
        });
      } else {
        addResource(manifestId);
      }
      this.scrollToTop();
    }

    /** @private */
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      this.setAddResourcesVisibility(false);
      this.scrollToTop();
    }

    /**
     * @private
     */
  }, {
    key: "setAddResourcesVisibility",
    value: function setAddResourcesVisibility(bool) {
      this.setState({
        addResourcesOpen: bool
      });
    }

    /** Scroll the list back to the top */
  }, {
    key: "scrollToTop",
    value: function scrollToTop() {
      if (this.ref.current) {
        var el = this.ref.current;
        el.scrollTo({
          behavior: 'smooth',
          left: 0,
          top: 0
        });
      }
    }

    /**
     * render
     */
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        catalog = _this$props.catalog,
        setWorkspaceAddVisibility = _this$props.setWorkspaceAddVisibility,
        t = _this$props.t,
        classes = _this$props.classes;
      var addResourcesOpen = this.state.addResourcesOpen;
      var manifestList = catalog.map(function (resource, index) {
        return /*#__PURE__*/_react["default"].createElement(_ManifestListItem["default"], Object.assign({}, index === 0 && {
          buttonRef: function buttonRef(ref) {
            return ref && ref.focus();
          }
        }, {
          key: resource.manifestId,
          manifestId: resource.manifestId,
          provider: resource.provider,
          handleClose: function handleClose() {
            return setWorkspaceAddVisibility(false);
          }
        }));
      });
      return /*#__PURE__*/_react["default"].createElement(_IIIFDropTarget.IIIFDropTarget, {
        onDrop: this.handleDrop
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.ref,
        className: (0, _classnames["default"])((0, _cssNs["default"])('workspace-add'), classes.workspaceAdd)
      }, catalog.length < 1 ? /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        alignItems: "center",
        container: true,
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
        xs: 12,
        item: true
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "h1",
        component: "div",
        align: "center"
      }, t('emptyResourceList')))) : /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
        className: classes.list
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "srOnly",
        component: "h1"
      }, t('miradorResources')), /*#__PURE__*/_react["default"].createElement(_PluginHook.PluginHook, this.props), /*#__PURE__*/_react["default"].createElement(_List["default"], {
        disablePadding: true
      }, manifestList)), /*#__PURE__*/_react["default"].createElement(_Fab["default"], {
        variant: "extended",
        disabled: addResourcesOpen,
        className: (0, _classnames["default"])(classes.fab, (0, _cssNs["default"])('add-resource-button')),
        color: "primary",
        onClick: function onClick() {
          return _this2.setAddResourcesVisibility(true);
        }
      }, /*#__PURE__*/_react["default"].createElement(_AddSharp["default"], null), t('addResource')), /*#__PURE__*/_react["default"].createElement(_Drawer["default"], {
        className: (0, _classnames["default"])(_defineProperty({}, classes.displayNone, !addResourcesOpen)),
        classes: {
          paper: classes.paper
        },
        variant: "persistent",
        anchor: "bottom",
        open: addResourcesOpen,
        ModalProps: {
          disablePortal: true,
          hideBackdrop: true,
          style: {
            position: 'absolute'
          }
        }
      }, /*#__PURE__*/_react["default"].createElement(_Paper["default"], {
        className: classes.form
      }, /*#__PURE__*/_react["default"].createElement(_AppBar["default"], {
        position: "absolute",
        color: "primary",
        onClick: function onClick() {
          return _this2.setAddResourcesVisibility(false);
        }
      }, /*#__PURE__*/_react["default"].createElement(_Toolbar["default"], {
        variant: "dense"
      }, /*#__PURE__*/_react["default"].createElement(_MiradorMenuButton["default"], {
        "aria-label": t('closeAddResourceForm'),
        className: classes.menuButton,
        color: "inherit"
      }, /*#__PURE__*/_react["default"].createElement(_ExpandMoreSharp["default"], null)), /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "h2",
        noWrap: true,
        color: "inherit",
        className: classes.typographyBody
      }, t('addResource')))), /*#__PURE__*/_react["default"].createElement(_ManifestForm["default"], {
        addResourcesOpen: addResourcesOpen,
        onSubmit: this.onSubmit,
        onCancel: function onCancel() {
          return _this2.setAddResourcesVisibility(false);
        }
      })))));
    }
  }]);
}(_react["default"].Component);
WorkspaceAdd.defaultProps = {
  addResource: function addResource() {},
  catalog: [],
  classes: {},
  t: function t(key) {
    return key;
  }
};