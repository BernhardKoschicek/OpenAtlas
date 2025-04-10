function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/CloseSharp';
import OpenInNewIcon from '@material-ui/icons/OpenInNewSharp';
import MoveIcon from '@material-ui/icons/DragIndicatorSharp';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Rnd } from 'react-rnd';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import ns from '../config/css-ns';

/**
 * CompanionWindow
 */
export var CompanionWindow = /*#__PURE__*/function (_Component) {
  function CompanionWindow() {
    _classCallCheck(this, CompanionWindow);
    return _callSuper(this, CompanionWindow, arguments);
  }
  _inherits(CompanionWindow, _Component);
  return _createClass(CompanionWindow, [{
    key: "openInNewStyle",
    value: /** */
    function openInNewStyle() {
      var direction = this.props.direction;
      if (direction === 'rtl') return {
        transform: 'scale(-1, 1)'
      };
      return {};
    }

    /** */
  }, {
    key: "resizeHandles",
    value: function resizeHandles() {
      var _this$props = this.props,
        direction = _this$props.direction,
        position = _this$props.position;
      var positions = {
        ltr: {
          "default": 'left',
          opposite: 'right'
        },
        rtl: {
          "default": 'right',
          opposite: 'left'
        }
      };
      var base = {
        bottom: false,
        bottomLeft: false,
        bottomRight: false,
        left: false,
        right: false,
        top: false,
        topLeft: false,
        topRight: false
      };
      if (position === 'right' || position === 'far-right') {
        return _objectSpread(_objectSpread({}, base), {}, _defineProperty({}, positions[direction]["default"], true));
      }
      if (position === 'left') {
        return _objectSpread(_objectSpread({}, base), {}, _defineProperty({}, positions[direction].opposite, true));
      }
      if (position === 'bottom' || position === 'far-bottom') {
        return _objectSpread(_objectSpread({}, base), {}, {
          top: true
        });
      }
      return base;
    }

    /**
     * render
     * @return
     */
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        ariaLabel = _this$props2.ariaLabel,
        classes = _this$props2.classes,
        paperClassName = _this$props2.paperClassName,
        onCloseClick = _this$props2.onCloseClick,
        updateCompanionWindow = _this$props2.updateCompanionWindow,
        isDisplayed = _this$props2.isDisplayed,
        position = _this$props2.position,
        t = _this$props2.t,
        title = _this$props2.title,
        children = _this$props2.children,
        titleControls = _this$props2.titleControls,
        size = _this$props2.size,
        defaultSidebarPanelWidth = _this$props2.defaultSidebarPanelWidth,
        defaultSidebarPanelHeight = _this$props2.defaultSidebarPanelHeight;
      var isBottom = position === 'bottom' || position === 'far-bottom';
      var childrenWithAdditionalProps = React.Children.map(children, function (child) {
        if (!child) return null;
        return /*#__PURE__*/React.cloneElement(child, {
          parentactions: {
            closeCompanionWindow: onCloseClick
          }
        });
      });
      return /*#__PURE__*/React.createElement(Paper, {
        className: [classes.root, position === 'bottom' ? classes.horizontal : classes.vertical, classes["companionWindow-".concat(position)], ns("companion-window-".concat(position)), paperClassName].join(' '),
        style: {
          display: isDisplayed ? null : 'none',
          order: position === 'left' ? -1 : null
        },
        square: true,
        component: "aside",
        "aria-label": ariaLabel || title
      }, /*#__PURE__*/React.createElement(Rnd, {
        className: [classes.rnd],
        style: {
          display: 'flex',
          position: 'relative'
        },
        "default": {
          height: isBottom ? defaultSidebarPanelHeight : '100%',
          width: isBottom ? 'auto' : defaultSidebarPanelWidth
        },
        disableDragging: true,
        enableResizing: this.resizeHandles(),
        minHeight: 50,
        minWidth: position === 'left' ? 235 : 100
      }, /*#__PURE__*/React.createElement(Toolbar, {
        className: [classes.toolbar, classes.companionWindowHeader, size.width < 370 ? classes.small : null, ns('companion-window-header')].join(' '),
        disableGutters: true
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "h3",
        className: classes.windowSideBarTitle
      }, title), position === 'left' ? updateCompanionWindow && /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t('openInCompanionWindow'),
        onClick: function onClick() {
          updateCompanionWindow({
            position: 'right'
          });
        }
      }, /*#__PURE__*/React.createElement(OpenInNewIcon, {
        style: this.openInNewStyle()
      })) : /*#__PURE__*/React.createElement(React.Fragment, null, updateCompanionWindow && /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": position === 'bottom' ? t('moveCompanionWindowToRight') : t('moveCompanionWindowToBottom'),
        className: classes.positionButton,
        onClick: function onClick() {
          updateCompanionWindow({
            position: position === 'bottom' ? 'right' : 'bottom'
          });
        }
      }, /*#__PURE__*/React.createElement(MoveIcon, null)), /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t('closeCompanionWindow'),
        className: classes.closeButton,
        onClick: onCloseClick
      }, /*#__PURE__*/React.createElement(CloseIcon, null))), titleControls && /*#__PURE__*/React.createElement("div", {
        className: [classes.titleControls, isBottom ? classes.companionWindowTitleControlsBottom : classes.companionWindowTitleControls, ns('companion-window-title-controls')].join(' ')
      }, titleControls)), /*#__PURE__*/React.createElement(Paper, {
        className: [classes.content, ns('scrollto-scrollable')].join(' '),
        elevation: 0
      }, childrenWithAdditionalProps)));
    }
  }]);
}(Component);
CompanionWindow.defaultProps = {
  ariaLabel: undefined,
  children: undefined,
  defaultSidebarPanelHeight: 201,
  defaultSidebarPanelWidth: 235,
  isDisplayed: false,
  onCloseClick: function onCloseClick() {},
  paperClassName: '',
  position: null,
  size: {},
  t: function t(key) {
    return key;
  },
  title: null,
  titleControls: null,
  updateCompanionWindow: undefined
};