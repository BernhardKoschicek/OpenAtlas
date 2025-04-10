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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Card, CardContent, MenuList, MenuItem, Typography } from '@material-ui/core';
import WorkspaceTypeElasticIcon from './icons/WorkspaceTypeElasticIcon';
import WorkspaceTypeMosaicIcon from './icons/WorkspaceTypeMosaicIcon';
import ScrollIndicatedDialogContent from '../containers/ScrollIndicatedDialogContent';

/**
 */
export var WorkspaceSelectionDialog = /*#__PURE__*/function (_Component) {
  /**
   * constructor
   */
  function WorkspaceSelectionDialog(props) {
    var _this;
    _classCallCheck(this, WorkspaceSelectionDialog);
    _this = _callSuper(this, WorkspaceSelectionDialog, [props]);
    _this.handleWorkspaceTypeChange = _this.handleWorkspaceTypeChange.bind(_this);
    return _this;
  }

  /**
   * Propagate workspace type selection into the global state
   */
  _inherits(WorkspaceSelectionDialog, _Component);
  return _createClass(WorkspaceSelectionDialog, [{
    key: "handleWorkspaceTypeChange",
    value: function handleWorkspaceTypeChange(workspaceType) {
      var _this$props = this.props,
        handleClose = _this$props.handleClose,
        updateWorkspace = _this$props.updateWorkspace;
      updateWorkspace({
        type: workspaceType
      });
      handleClose();
    }

    /**
     * render
     * @return
     */
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        classes = _this$props2.classes,
        container = _this$props2.container,
        handleClose = _this$props2.handleClose,
        open = _this$props2.open,
        children = _this$props2.children,
        t = _this$props2.t,
        workspaceType = _this$props2.workspaceType;
      return /*#__PURE__*/React.createElement(Dialog, {
        "aria-labelledby": "workspace-selection-dialog-title",
        container: container,
        id: "workspace-selection-dialog",
        onClose: handleClose,
        onEntered: function onEntered(dialog) {
          return WorkspaceSelectionDialog.setInitialFocus(dialog, workspaceType);
        },
        onEscapeKeyDown: handleClose,
        open: open
      }, /*#__PURE__*/React.createElement(DialogTitle, {
        id: "workspace-selection-dialog-title",
        disableTypography: true
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "h2"
      }, t('workspaceSelectionTitle'))), /*#__PURE__*/React.createElement(ScrollIndicatedDialogContent, null, children, /*#__PURE__*/React.createElement(MenuList, {
        classes: {
          root: classes.list
        },
        selected: workspaceType
      }, /*#__PURE__*/React.createElement(MenuItem, {
        className: classes.menuItem,
        onClick: function onClick() {
          return _this2.handleWorkspaceTypeChange('elastic');
        },
        selected: workspaceType === 'elastic',
        value: "elastic"
      }, /*#__PURE__*/React.createElement(Card, {
        className: classes.card
      }, /*#__PURE__*/React.createElement(WorkspaceTypeElasticIcon, {
        className: classes.svgIcon,
        viewBox: "0 0 120 90"
      }), /*#__PURE__*/React.createElement("div", {
        className: classes.details
      }, /*#__PURE__*/React.createElement(CardContent, {
        classes: {
          root: classes.root
        },
        className: classes.content
      }, /*#__PURE__*/React.createElement(Typography, {
        className: classes.headline,
        component: "p",
        variant: "h3"
      }, t('elastic')), /*#__PURE__*/React.createElement(Typography, {
        variant: "body1"
      }, t('elasticDescription')))))), /*#__PURE__*/React.createElement(MenuItem, {
        className: classes.menuItem,
        onClick: function onClick() {
          return _this2.handleWorkspaceTypeChange('mosaic');
        },
        selected: workspaceType === 'mosaic',
        value: "mosaic"
      }, /*#__PURE__*/React.createElement(Card, {
        className: classes.card
      }, /*#__PURE__*/React.createElement(WorkspaceTypeMosaicIcon, {
        className: classes.svgIcon,
        viewBox: "0 0 120 90"
      }), /*#__PURE__*/React.createElement("div", {
        className: classes.details
      }, /*#__PURE__*/React.createElement(CardContent, {
        className: classes.content,
        classes: {
          root: classes.root
        }
      }, /*#__PURE__*/React.createElement(Typography, {
        className: classes.headline,
        component: "p",
        variant: "h3"
      }, t('mosaic')), /*#__PURE__*/React.createElement(Typography, {
        variant: "body1"
      }, t('mosaicDescription')))))))));
    }
  }], [{
    key: "setInitialFocus",
    value:
    /**
     * Set the initial focus when the dialog enters
     * Find the selected item by using the current workspace type
     * in a selector on the value attribute (which we need to set)
    */
    function setInitialFocus(dialogElement, workspaceType) {
      var selectedListItem = dialogElement.querySelectorAll("li[value=\"".concat(workspaceType, "\"]"));
      if (!selectedListItem || selectedListItem.length === 0) return;
      selectedListItem[0].focus();
    }
  }]);
}(Component);
WorkspaceSelectionDialog.defaultProps = {
  children: null,
  container: null,
  open: false,
  t: function t(key) {
    return key;
  }
};