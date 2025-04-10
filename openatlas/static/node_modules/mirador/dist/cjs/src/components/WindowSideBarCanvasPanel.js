"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WindowSideBarCanvasPanel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));
var _Tab = _interopRequireDefault(require("@material-ui/core/Tab"));
var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _ReorderSharp = _interopRequireDefault(require("@material-ui/icons/ReorderSharp"));
var _SortSharp = _interopRequireDefault(require("@material-ui/icons/SortSharp"));
var _ViewListSharp = _interopRequireDefault(require("@material-ui/icons/ViewListSharp"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _ArrowForwardSharp = _interopRequireDefault(require("@material-ui/icons/ArrowForwardSharp"));
var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));
var _Select = _interopRequireDefault(require("@material-ui/core/Select"));
var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));
var _CompanionWindow = _interopRequireDefault(require("../containers/CompanionWindow"));
var _SidebarIndexList = _interopRequireDefault(require("../containers/SidebarIndexList"));
var _SidebarIndexTableOfContents = _interopRequireDefault(require("../containers/SidebarIndexTableOfContents"));
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
 * a panel showing the canvases for a given manifest
 */
var WindowSideBarCanvasPanel = exports.WindowSideBarCanvasPanel = /*#__PURE__*/function (_Component) {
  /** */
  function WindowSideBarCanvasPanel(props) {
    var _this;
    _classCallCheck(this, WindowSideBarCanvasPanel);
    _this = _callSuper(this, WindowSideBarCanvasPanel, [props]);
    _this.handleSequenceChange = _this.handleSequenceChange.bind(_this);
    _this.handleVariantChange = _this.handleVariantChange.bind(_this);
    _this.containerRef = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  /** */
  _inherits(WindowSideBarCanvasPanel, _Component);
  return _createClass(WindowSideBarCanvasPanel, [{
    key: "handleSequenceChange",
    value: /** @private */
    function handleSequenceChange(event) {
      var updateSequence = this.props.updateSequence;
      updateSequence(event.target.value);
    }

    /** @private */
  }, {
    key: "handleVariantChange",
    value: function handleVariantChange(event, value) {
      var updateVariant = this.props.updateVariant;
      updateVariant(value);
    }

    /**
     * render
     */
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        collection = _this$props.collection,
        id = _this$props.id,
        showMultipart = _this$props.showMultipart,
        sequenceId = _this$props.sequenceId,
        sequences = _this$props.sequences,
        t = _this$props.t,
        variant = _this$props.variant,
        showToc = _this$props.showToc,
        windowId = _this$props.windowId;
      var listComponent;
      if (variant === 'tableOfContents') {
        listComponent = /*#__PURE__*/_react["default"].createElement(_SidebarIndexTableOfContents["default"], {
          id: id,
          containerRef: this.containerRef,
          windowId: windowId
        });
      } else {
        listComponent = /*#__PURE__*/_react["default"].createElement(_SidebarIndexList["default"], {
          id: id,
          containerRef: this.containerRef,
          windowId: windowId
        });
      }
      return /*#__PURE__*/_react["default"].createElement(_CompanionWindow["default"], {
        title: t('canvasIndex'),
        id: id,
        windowId: windowId,
        ref: this.containerRef,
        otherRef: this.containerRef,
        titleControls: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, sequences && sequences.length > 1 && /*#__PURE__*/_react["default"].createElement(_FormControl["default"], null, /*#__PURE__*/_react["default"].createElement(_Select["default"], {
          MenuProps: {
            anchorOrigin: {
              horizontal: 'left',
              vertical: 'bottom'
            },
            getContentAnchorEl: null
          },
          displayEmpty: true,
          value: sequenceId,
          onChange: this.handleSequenceChange,
          name: "sequenceId",
          classes: {
            select: classes.select
          },
          className: classes.selectEmpty
        }, sequences.map(function (s, i) {
          return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
            value: s.id,
            key: s.id
          }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
            variant: "body2"
          }, WindowSideBarCanvasPanel.getUseableLabel(s, i)));
        }))), /*#__PURE__*/_react["default"].createElement("div", {
          className: classes["break"]
        }), /*#__PURE__*/_react["default"].createElement(_Tabs["default"], {
          value: variant,
          onChange: this.handleVariantChange,
          variant: "fullWidth",
          indicatorColor: "primary",
          textColor: "primary"
        }, showToc && /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
          title: t('tableOfContentsList'),
          value: "tableOfContents"
        }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
          className: classes.variantTab,
          value: "tableOfContents",
          "aria-label": t('tableOfContentsList'),
          "aria-controls": "tab-panel-".concat(id),
          icon: /*#__PURE__*/_react["default"].createElement(_SortSharp["default"], {
            style: {
              transform: 'scale(-1, 1)'
            }
          })
        })), /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
          title: t('itemList'),
          value: "item"
        }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
          className: classes.variantTab,
          value: "item",
          "aria-label": t('itemList'),
          "aria-controls": "tab-panel-".concat(id),
          icon: /*#__PURE__*/_react["default"].createElement(_ReorderSharp["default"], null)
        })), /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
          title: t('thumbnailList'),
          value: "thumbnail"
        }, /*#__PURE__*/_react["default"].createElement(_Tab["default"], {
          className: classes.variantTab,
          value: "thumbnail",
          "aria-label": t('thumbnailList'),
          "aria-controls": "tab-panel-".concat(id),
          icon: /*#__PURE__*/_react["default"].createElement(_ViewListSharp["default"], null)
        }))))
      }, /*#__PURE__*/_react["default"].createElement("div", {
        id: "tab-panel-".concat(id)
      }, collection && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        fullWidth: true,
        onClick: showMultipart,
        endIcon: /*#__PURE__*/_react["default"].createElement(_ArrowForwardSharp["default"], null)
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        className: classes.collectionNavigationButton
      }, WindowSideBarCanvasPanel.getUseableLabel(collection))), listComponent));
    }
  }], [{
    key: "getUseableLabel",
    value: function getUseableLabel(resource, index) {
      return resource && resource.getLabel && resource.getLabel().length > 0 ? resource.getLabel().getValue() : resource.id;
    }
  }]);
}(_react.Component);
WindowSideBarCanvasPanel.defaultProps = {
  collection: null,
  sequenceId: null,
  sequences: [],
  showToc: false
};