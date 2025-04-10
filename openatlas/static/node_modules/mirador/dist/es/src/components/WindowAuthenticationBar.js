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
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/LockSharp';
import SanitizedHtml from '../containers/SanitizedHtml';
import { PluginHook } from './PluginHook';

/** */
export var WindowAuthenticationBar = /*#__PURE__*/function (_Component) {
  /** */
  function WindowAuthenticationBar(props) {
    var _this;
    _classCallCheck(this, WindowAuthenticationBar);
    _this = _callSuper(this, WindowAuthenticationBar, [props]);
    _this.state = {
      open: false
    };
    _this.setOpen = _this.setOpen.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    return _this;
  }

  /** */
  _inherits(WindowAuthenticationBar, _Component);
  return _createClass(WindowAuthenticationBar, [{
    key: "onSubmit",
    value: function onSubmit() {
      var onConfirm = this.props.onConfirm;
      this.setOpen(false);
      onConfirm();
    }

    /** Toggle the full description */
  }, {
    key: "setOpen",
    value: function setOpen(open) {
      this.setState(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          open: open
        });
      });
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        classes = _this$props.classes,
        confirmButton = _this$props.confirmButton,
        continueLabel = _this$props.continueLabel,
        header = _this$props.header,
        description = _this$props.description,
        icon = _this$props.icon,
        label = _this$props.label,
        t = _this$props.t,
        ruleSet = _this$props.ruleSet,
        hasLogoutService = _this$props.hasLogoutService,
        status = _this$props.status,
        ConfirmProps = _this$props.ConfirmProps;
      if (status === 'ok' && !hasLogoutService) return null;
      var open = this.state.open;
      var button = /*#__PURE__*/React.createElement(Button, Object.assign({
        onClick: this.onSubmit,
        className: classes.buttonInvert,
        color: "secondary"
      }, ConfirmProps), confirmButton || t('login'));
      if (!description && !header) {
        return /*#__PURE__*/React.createElement(Paper, {
          square: true,
          elevation: 4,
          color: "secondary",
          classes: {
            root: classes.paper
          }
        }, /*#__PURE__*/React.createElement("div", {
          className: classes.topBar
        }, icon || /*#__PURE__*/React.createElement(LockIcon, {
          className: classes.icon
        }), /*#__PURE__*/React.createElement(Typography, {
          className: classes.label,
          component: "h3",
          variant: "body1",
          color: "inherit"
        }, ruleSet ? /*#__PURE__*/React.createElement(SanitizedHtml, {
          htmlString: label,
          ruleSet: ruleSet
        }) : label), /*#__PURE__*/React.createElement(PluginHook, this.props), button));
      }
      return /*#__PURE__*/React.createElement(Paper, {
        square: true,
        elevation: 4,
        color: "secondary",
        classes: {
          root: classes.paper
        }
      }, /*#__PURE__*/React.createElement(Button, {
        fullWidth: true,
        className: classes.topBar,
        onClick: function onClick() {
          return _this2.setOpen(true);
        },
        component: "div",
        color: "inherit"
      }, icon || /*#__PURE__*/React.createElement(LockIcon, {
        className: classes.icon
      }), /*#__PURE__*/React.createElement(Typography, {
        className: classes.label,
        component: "h3",
        variant: "body1",
        color: "inherit"
      }, ruleSet ? /*#__PURE__*/React.createElement(SanitizedHtml, {
        htmlString: label,
        ruleSet: ruleSet
      }) : label), /*#__PURE__*/React.createElement(PluginHook, this.props), /*#__PURE__*/React.createElement("span", {
        className: classes.fauxButton
      }, !open && /*#__PURE__*/React.createElement(Typography, {
        variant: "button",
        color: "inherit"
      }, continueLabel || t('continue')))), /*#__PURE__*/React.createElement(Collapse, {
        "in": open,
        onClose: function onClose() {
          return _this2.setOpen(false);
        }
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "body1",
        color: "inherit",
        className: classes.expanded
      }, ruleSet ? /*#__PURE__*/React.createElement(SanitizedHtml, {
        htmlString: header,
        ruleSet: ruleSet
      }) : header, header && description ? ': ' : '', ruleSet ? /*#__PURE__*/React.createElement(SanitizedHtml, {
        htmlString: description,
        ruleSet: ruleSet
      }) : description), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
        onClick: function onClick() {
          return _this2.setOpen(false);
        },
        color: "inherit"
      }, t('cancel')), button)));
    }
  }]);
}(Component);
WindowAuthenticationBar.defaultProps = {
  confirmButton: undefined,
  ConfirmProps: {},
  continueLabel: undefined,
  description: undefined,
  hasLogoutService: true,
  header: undefined,
  icon: undefined,
  ruleSet: 'iiif',
  status: undefined,
  t: function t(k) {
    return k;
  }
};