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
import { DialogActions, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ScrollIndicatedDialogContent from '../containers/ScrollIndicatedDialogContent';

/**
 */
export var WorkspaceImport = /*#__PURE__*/function (_Component) {
  /**
   *
   * constructor
   */
  function WorkspaceImport(props) {
    var _this;
    _classCallCheck(this, WorkspaceImport);
    _this = _callSuper(this, WorkspaceImport, [props]);
    _this.state = {
      configImportValue: ''
    };
    _this.handleImportConfig = _this.handleImportConfig.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  /**
   * @private
   */
  _inherits(WorkspaceImport, _Component);
  return _createClass(WorkspaceImport, [{
    key: "handleChange",
    value: function handleChange(event) {
      event.preventDefault();
      this.setState({
        configImportValue: event.target.value
      });
    }

    /**
     * @private
     */
  }, {
    key: "handleImportConfig",
    value: function handleImportConfig(event) {
      var _this$props = this.props,
        handleClose = _this$props.handleClose,
        importConfig = _this$props.importConfig;
      var configImportValue = this.state.configImportValue;
      try {
        var configJSON = JSON.parse(configImportValue);
        importConfig(configJSON);
        handleClose();
      } catch (ex) {
        var addError = this.props.addError;
        addError(ex.toString());
      }
    }

    /**
     * render
     * @return
     */
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        classes = _this$props2.classes,
        handleClose = _this$props2.handleClose,
        open = _this$props2.open,
        t = _this$props2.t;
      return /*#__PURE__*/React.createElement(Dialog, {
        "aria-labelledby": "workspace-import-title",
        id: "workspace-import",
        onEscapeKeyDown: handleClose,
        onClose: handleClose,
        open: open,
        fullWidth: true,
        maxWidth: "sm"
      }, /*#__PURE__*/React.createElement(DialogTitle, {
        id: "workspace-import-title",
        disableTypography: true
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "h2"
      }, t('importWorkspace'))), /*#__PURE__*/React.createElement(ScrollIndicatedDialogContent, null, /*#__PURE__*/React.createElement(TextField, {
        className: classes.textField,
        id: "workspace-import-input",
        multiline: true,
        onChange: this.handleChange,
        rows: "15",
        variant: "filled",
        inputProps: {
          autoFocus: 'autofocus',
          className: classes.textInput
        },
        helperText: t('importWorkspaceHint')
      })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
        className: classes.cancelBtn,
        onClick: handleClose
      }, t('cancel')), /*#__PURE__*/React.createElement(Button, {
        color: "primary",
        onClick: this.handleImportConfig,
        variant: "contained"
      }, t('import'))));
    }
  }]);
}(Component);
WorkspaceImport.defaultProps = {
  classes: {},
  open: false,
  t: function t(key) {
    return key;
  }
};