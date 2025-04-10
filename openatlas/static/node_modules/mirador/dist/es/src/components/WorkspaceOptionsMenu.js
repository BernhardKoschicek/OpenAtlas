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
import ImportIcon from '@material-ui/icons/Input';
import SaveAltIcon from '@material-ui/icons/SaveAltSharp';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import WorkspaceExport from '../containers/WorkspaceExport';
import WorkspaceImport from '../containers/WorkspaceImport';
import { PluginHook } from './PluginHook';
import ns from '../config/css-ns';

/**
 * WorkspaceOptionsMenu ~ the menu for workspace options such as import/export
*/
export var WorkspaceOptionsMenu = /*#__PURE__*/function (_Component) {
  /**
   * constructor -
   */
  function WorkspaceOptionsMenu(props) {
    var _this;
    _classCallCheck(this, WorkspaceOptionsMenu);
    _this = _callSuper(this, WorkspaceOptionsMenu, [props]);
    _this.state = {
      exportWorkspace: {},
      importWorkspace: {}
    };
    _this.handleMenuItemClick = _this.handleMenuItemClick.bind(_this);
    _this.handleMenuItemClose = _this.handleMenuItemClose.bind(_this);
    return _this;
  }

  /**
   * @private
   */
  _inherits(WorkspaceOptionsMenu, _Component);
  return _createClass(WorkspaceOptionsMenu, [{
    key: "handleMenuItemClick",
    value: function handleMenuItemClick(item) {
      var obj = {};
      obj[item] = {};
      obj[item].open = true;
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
        _this2.setState(obj);
      };
    }

    /**
     * Returns the rendered component
    */
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props = this.props,
        anchorEl = _this$props.anchorEl,
        containerId = _this$props.containerId,
        handleClose = _this$props.handleClose,
        t = _this$props.t;
      var _this$state = this.state,
        exportWorkspace = _this$state.exportWorkspace,
        importWorkspace = _this$state.importWorkspace;
      var container = document.querySelector("#".concat(containerId, " .").concat(ns('viewer')));
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Menu, {
        id: "workspace-options-menu",
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
      }, /*#__PURE__*/React.createElement(MenuItem, {
        "aria-haspopup": "true",
        onClick: function onClick() {
          _this3.handleMenuItemClick('exportWorkspace');
          handleClose();
        },
        "aria-owns": exportWorkspace.open ? 'workspace-export' : undefined
      }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(SaveAltIcon, null)), /*#__PURE__*/React.createElement(Typography, {
        variant: "body1"
      }, t('downloadExportWorkspace'))), /*#__PURE__*/React.createElement(MenuItem, {
        "aria-haspopup": "true",
        id: "workspace-menu-import",
        onClick: function onClick() {
          _this3.handleMenuItemClick('importWorkspace');
          handleClose();
        },
        "aria-owns": exportWorkspace.open ? 'workspace-import' : undefined
      }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(ImportIcon, null)), /*#__PURE__*/React.createElement(Typography, {
        variant: "body1"
      }, t('importWorkspace'))), /*#__PURE__*/React.createElement(PluginHook, this.props)), Boolean(exportWorkspace.open) && /*#__PURE__*/React.createElement(WorkspaceExport, {
        open: Boolean(exportWorkspace.open),
        container: container,
        handleClose: this.handleMenuItemClose('exportWorkspace')
      }), Boolean(importWorkspace.open) && /*#__PURE__*/React.createElement(WorkspaceImport, {
        open: Boolean(importWorkspace.open),
        container: container,
        handleClose: this.handleMenuItemClose('importWorkspace')
      }));
    }
  }]);
}(Component);
WorkspaceOptionsMenu.defaultProps = {
  anchorEl: null
};