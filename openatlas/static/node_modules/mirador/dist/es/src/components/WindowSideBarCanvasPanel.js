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
import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import ItemListIcon from '@material-ui/icons/ReorderSharp';
import TocIcon from '@material-ui/icons/SortSharp';
import ThumbnailListIcon from '@material-ui/icons/ViewListSharp';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardSharp';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CompanionWindow from '../containers/CompanionWindow';
import SidebarIndexList from '../containers/SidebarIndexList';
import SidebarIndexTableOfContents from '../containers/SidebarIndexTableOfContents';

/**
 * a panel showing the canvases for a given manifest
 */
export var WindowSideBarCanvasPanel = /*#__PURE__*/function (_Component) {
  /** */
  function WindowSideBarCanvasPanel(props) {
    var _this;
    _classCallCheck(this, WindowSideBarCanvasPanel);
    _this = _callSuper(this, WindowSideBarCanvasPanel, [props]);
    _this.handleSequenceChange = _this.handleSequenceChange.bind(_this);
    _this.handleVariantChange = _this.handleVariantChange.bind(_this);
    _this.containerRef = /*#__PURE__*/React.createRef();
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
        listComponent = /*#__PURE__*/React.createElement(SidebarIndexTableOfContents, {
          id: id,
          containerRef: this.containerRef,
          windowId: windowId
        });
      } else {
        listComponent = /*#__PURE__*/React.createElement(SidebarIndexList, {
          id: id,
          containerRef: this.containerRef,
          windowId: windowId
        });
      }
      return /*#__PURE__*/React.createElement(CompanionWindow, {
        title: t('canvasIndex'),
        id: id,
        windowId: windowId,
        ref: this.containerRef,
        otherRef: this.containerRef,
        titleControls: /*#__PURE__*/React.createElement(React.Fragment, null, sequences && sequences.length > 1 && /*#__PURE__*/React.createElement(FormControl, null, /*#__PURE__*/React.createElement(Select, {
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
          return /*#__PURE__*/React.createElement(MenuItem, {
            value: s.id,
            key: s.id
          }, /*#__PURE__*/React.createElement(Typography, {
            variant: "body2"
          }, WindowSideBarCanvasPanel.getUseableLabel(s, i)));
        }))), /*#__PURE__*/React.createElement("div", {
          className: classes["break"]
        }), /*#__PURE__*/React.createElement(Tabs, {
          value: variant,
          onChange: this.handleVariantChange,
          variant: "fullWidth",
          indicatorColor: "primary",
          textColor: "primary"
        }, showToc && /*#__PURE__*/React.createElement(Tooltip, {
          title: t('tableOfContentsList'),
          value: "tableOfContents"
        }, /*#__PURE__*/React.createElement(Tab, {
          className: classes.variantTab,
          value: "tableOfContents",
          "aria-label": t('tableOfContentsList'),
          "aria-controls": "tab-panel-".concat(id),
          icon: /*#__PURE__*/React.createElement(TocIcon, {
            style: {
              transform: 'scale(-1, 1)'
            }
          })
        })), /*#__PURE__*/React.createElement(Tooltip, {
          title: t('itemList'),
          value: "item"
        }, /*#__PURE__*/React.createElement(Tab, {
          className: classes.variantTab,
          value: "item",
          "aria-label": t('itemList'),
          "aria-controls": "tab-panel-".concat(id),
          icon: /*#__PURE__*/React.createElement(ItemListIcon, null)
        })), /*#__PURE__*/React.createElement(Tooltip, {
          title: t('thumbnailList'),
          value: "thumbnail"
        }, /*#__PURE__*/React.createElement(Tab, {
          className: classes.variantTab,
          value: "thumbnail",
          "aria-label": t('thumbnailList'),
          "aria-controls": "tab-panel-".concat(id),
          icon: /*#__PURE__*/React.createElement(ThumbnailListIcon, null)
        }))))
      }, /*#__PURE__*/React.createElement("div", {
        id: "tab-panel-".concat(id)
      }, collection && /*#__PURE__*/React.createElement(Button, {
        fullWidth: true,
        onClick: showMultipart,
        endIcon: /*#__PURE__*/React.createElement(ArrowForwardIcon, null)
      }, /*#__PURE__*/React.createElement(Typography, {
        className: classes.collectionNavigationButton
      }, WindowSideBarCanvasPanel.getUseableLabel(collection))), listComponent));
    }
  }], [{
    key: "getUseableLabel",
    value: function getUseableLabel(resource, index) {
      return resource && resource.getLabel && resource.getLabel().length > 0 ? resource.getLabel().getValue() : resource.id;
    }
  }]);
}(Component);
WindowSideBarCanvasPanel.defaultProps = {
  collection: null,
  sequenceId: null,
  sequences: [],
  showToc: false
};