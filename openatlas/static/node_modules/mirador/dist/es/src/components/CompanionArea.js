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
import Slide from '@material-ui/core/Slide';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeftSharp';
import ArrowRightIcon from '@material-ui/icons/ArrowRightSharp';
import CompanionWindowFactory from '../containers/CompanionWindowFactory';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

/** */
export var CompanionArea = /*#__PURE__*/function (_Component) {
  function CompanionArea() {
    _classCallCheck(this, CompanionArea);
    return _callSuper(this, CompanionArea, arguments);
  }
  _inherits(CompanionArea, _Component);
  return _createClass(CompanionArea, [{
    key: "areaLayoutClass",
    value: /** */
    function areaLayoutClass() {
      var _this$props = this.props,
        classes = _this$props.classes,
        position = _this$props.position;
      return position === 'bottom' || position === 'far-bottom' ? classes.horizontal : null;
    }

    /** */
  }, {
    key: "collapseIcon",
    value: function collapseIcon() {
      var _this$props2 = this.props,
        companionAreaOpen = _this$props2.companionAreaOpen,
        direction = _this$props2.direction;
      if (direction === 'rtl') {
        if (companionAreaOpen) return /*#__PURE__*/React.createElement(ArrowRightIcon, null);
        return /*#__PURE__*/React.createElement(ArrowLeftIcon, null);
      }
      if (companionAreaOpen) return /*#__PURE__*/React.createElement(ArrowLeftIcon, null);
      return /*#__PURE__*/React.createElement(ArrowRightIcon, null);
    }

    /** @private */
  }, {
    key: "slideDirection",
    value: function slideDirection() {
      var _this$props3 = this.props,
        direction = _this$props3.direction,
        position = _this$props3.position;
      var defaultPosition = direction === 'rtl' ? 'left' : 'right';
      var oppositePosition = direction === 'rtl' ? 'right' : 'left';
      switch (position) {
        case 'right':
        case 'far-right':
          return oppositePosition;
        case 'bottom':
        case 'far-bottom':
          return 'up';
        default:
          return defaultPosition;
      }
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
        classes = _this$props4.classes,
        companionWindowIds = _this$props4.companionWindowIds,
        companionAreaOpen = _this$props4.companionAreaOpen,
        setCompanionAreaOpen = _this$props4.setCompanionAreaOpen,
        position = _this$props4.position,
        sideBarOpen = _this$props4.sideBarOpen,
        t = _this$props4.t,
        windowId = _this$props4.windowId;
      return /*#__PURE__*/React.createElement("div", {
        className: [classes.root, this.areaLayoutClass(), ns("companion-area-".concat(position))].join(' ')
      }, /*#__PURE__*/React.createElement(Slide, {
        "in": companionAreaOpen,
        direction: this.slideDirection()
      }, /*#__PURE__*/React.createElement("div", {
        className: [ns('companion-windows'), companionWindowIds.length > 0 && classes[position], this.areaLayoutClass()].join(' '),
        style: {
          display: companionAreaOpen ? 'flex' : 'none'
        }
      }, companionWindowIds.map(function (id) {
        return /*#__PURE__*/React.createElement(CompanionWindowFactory, {
          id: id,
          key: id,
          windowId: windowId
        });
      }))), setCompanionAreaOpen && position === 'left' && sideBarOpen && companionWindowIds.length > 0 && /*#__PURE__*/React.createElement("div", {
        className: classes.toggle
      }, /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-expanded": companionAreaOpen,
        "aria-label": companionAreaOpen ? t('collapseSidePanel') : t('expandSidePanel'),
        className: classes.toggleButton,
        key: companionAreaOpen ? 'collapse' : 'expand',
        onClick: function onClick() {
          setCompanionAreaOpen(windowId, !companionAreaOpen);
        },
        TooltipProps: {
          placement: 'right'
        }
      }, this.collapseIcon())));
    }
  }]);
}(Component);
CompanionArea.defaultProps = {
  classes: {},
  setCompanionAreaOpen: function setCompanionAreaOpen() {},
  sideBarOpen: false
};