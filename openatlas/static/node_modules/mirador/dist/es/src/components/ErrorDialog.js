import _isUndefined from "lodash/isUndefined";
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
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogActions, DialogContentText, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
/**
 */
export var ErrorDialog = /*#__PURE__*/function (_Component) {
  function ErrorDialog() {
    _classCallCheck(this, ErrorDialog);
    return _callSuper(this, ErrorDialog, arguments);
  }
  _inherits(ErrorDialog, _Component);
  return _createClass(ErrorDialog, [{
    key: "render",
    value:
    /**
     * render
     * @return
     */
    function render() {
      var _this$props = this.props,
        error = _this$props.error,
        removeError = _this$props.removeError,
        t = _this$props.t;
      var hasError = !_isUndefined(error);
      return error ? /*#__PURE__*/React.createElement(Dialog, {
        "aria-labelledby": "error-dialog-title",
        id: "error-dialog",
        onClose: function onClose() {
          return removeError(error.id);
        },
        open: hasError
      }, /*#__PURE__*/React.createElement(DialogTitle, {
        id: "error-dialog-title",
        disableTypography: true
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "h2"
      }, t('errorDialogTitle'))), /*#__PURE__*/React.createElement(DialogContent, {
        disableTypography: true
      }, /*#__PURE__*/React.createElement(DialogContentText, {
        variant: "body2",
        noWrap: true,
        color: "inherit"
      }, "".concat(error.message)), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
        onClick: function onClick() {
          return removeError(error.id);
        },
        variant: "contained"
      }, t('errorDialogConfirm'))))) : null;
    }
  }]);
}(Component);
ErrorDialog.defaultProps = {
  error: null,
  removeError: function removeError() {},
  t: function t(key) {
    return key;
  }
};