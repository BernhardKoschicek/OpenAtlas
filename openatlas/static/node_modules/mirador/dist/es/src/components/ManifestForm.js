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
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

/**
 * Provides a form for user input of a manifest url
 * @prop {Function} fetchManifest
 */
export var ManifestForm = /*#__PURE__*/function (_Component) {
  /**
   * constructor -
   */
  function ManifestForm(props) {
    var _this;
    _classCallCheck(this, ManifestForm);
    _this = _callSuper(this, ManifestForm, [props]);
    _this.state = {
      formValue: ''
    };
    _this.formSubmit = _this.formSubmit.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    return _this;
  }

  /**
   * Reset the form state
   */
  _inherits(ManifestForm, _Component);
  return _createClass(ManifestForm, [{
    key: "handleCancel",
    value: function handleCancel() {
      var onCancel = this.props.onCancel;
      onCancel();
      this.setState({
        formValue: ''
      });
    }

    /**
     * handleInputChange - sets state based on input change.
     * @param  {Event} event
     * @private
     */
  }, {
    key: "handleInputChange",
    value: function handleInputChange(event) {
      var that = this;
      event.preventDefault();
      that.setState({
        formValue: event.target.value
      });
    }

    /**
     * formSubmit - triggers manifest update and sets lastRequested
     * @param  {Event} event
     * @private
     */
  }, {
    key: "formSubmit",
    value: function formSubmit(event) {
      var _this$props = this.props,
        addResource = _this$props.addResource,
        onSubmit = _this$props.onSubmit;
      var formValue = this.state.formValue;
      event.preventDefault();
      onSubmit();
      addResource(formValue);
      this.setState({
        formValue: ''
      });
    }

    /**
     * render
     * @return {String} - HTML markup for the component
     */
  }, {
    key: "render",
    value: function render() {
      var formValue = this.state.formValue;
      var _this$props2 = this.props,
        addResourcesOpen = _this$props2.addResourcesOpen,
        classes = _this$props2.classes,
        onCancel = _this$props2.onCancel,
        t = _this$props2.t;
      if (!addResourcesOpen) return null;
      return /*#__PURE__*/React.createElement("form", {
        onSubmit: this.formSubmit
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true,
        spacing: 2
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 12,
        sm: 8,
        md: 9
      }, /*#__PURE__*/React.createElement(TextField, {
        autoFocus: true,
        fullWidth: true,
        value: formValue,
        id: "manifestURL",
        type: "text",
        onChange: this.handleInputChange,
        variant: "filled",
        label: t('addManifestUrl'),
        helperText: t('addManifestUrlHelp'),
        InputLabelProps: {
          shrink: true
        },
        InputProps: {
          className: classes.input
        }
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 12,
        sm: 4,
        md: 3,
        className: classes.buttons
      }, onCancel && /*#__PURE__*/React.createElement(Button, {
        onClick: this.handleCancel
      }, t('cancel')), /*#__PURE__*/React.createElement(Button, {
        id: "fetchBtn",
        type: "submit",
        variant: "contained",
        color: "primary"
      }, t('fetchManifest')))));
    }
  }]);
}(Component);
ManifestForm.defaultProps = {
  classes: {},
  onCancel: null,
  onSubmit: function onSubmit() {},
  t: function t(key) {
    return key;
  }
};