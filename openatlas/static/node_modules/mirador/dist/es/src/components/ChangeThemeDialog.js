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
import { Dialog, DialogTitle, ListItemIcon, ListItemText, MenuList, MenuItem, Typography, DialogContent } from '@material-ui/core';
import PaletteIcon from '@material-ui/icons/PaletteSharp';
/**
 * a simple dialog providing the possibility to switch the theme
 */
export var ChangeThemeDialog = /*#__PURE__*/function (_Component) {
  /**
  */
  function ChangeThemeDialog(props) {
    var _this;
    _classCallCheck(this, ChangeThemeDialog);
    _this = _callSuper(this, ChangeThemeDialog, [props]);
    _this.selectedItemRef = /*#__PURE__*/React.createRef();
    _this.handleThemeChange = _this.handleThemeChange.bind(_this);
    return _this;
  }

  /**
   * Propagate theme palette type selection into the global state
   */
  _inherits(ChangeThemeDialog, _Component);
  return _createClass(ChangeThemeDialog, [{
    key: "handleThemeChange",
    value: function handleThemeChange(theme) {
      var _this$props = this.props,
        setSelectedTheme = _this$props.setSelectedTheme,
        handleClose = _this$props.handleClose;
      setSelectedTheme(theme);
      handleClose();
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        classes = _this$props2.classes,
        handleClose = _this$props2.handleClose,
        open = _this$props2.open,
        selectedTheme = _this$props2.selectedTheme,
        t = _this$props2.t,
        themeIds = _this$props2.themeIds;
      return /*#__PURE__*/React.createElement(Dialog, {
        onClose: handleClose,
        onEntered: function onEntered(dialog) {
          return ChangeThemeDialog.setInitialFocus(dialog, selectedTheme);
        },
        open: open
      }, /*#__PURE__*/React.createElement(DialogTitle, {
        id: "change-the-dialog-title",
        disableTypography: true
      }, /*#__PURE__*/React.createElement(Typography, {
        variant: "h2"
      }, t('changeTheme'))), /*#__PURE__*/React.createElement(DialogContent, {
        className: classes.dialogContent
      }, /*#__PURE__*/React.createElement(MenuList, null, themeIds.map(function (value) {
        return /*#__PURE__*/React.createElement(MenuItem, {
          key: value,
          className: classes.listitem,
          onClick: function onClick() {
            _this2.handleThemeChange(value);
          },
          selected: value === selectedTheme,
          value: value
        }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(PaletteIcon, {
          className: classes[value]
        })), /*#__PURE__*/React.createElement(ListItemText, null, t(value)));
      }))));
    }
  }], [{
    key: "setInitialFocus",
    value:
    /**
     * Set the initial focus when the dialog enters
     * Find the selected item by using the current theme
     * in a selector on the value attribute (which we need to set)
    */
    function setInitialFocus(dialogElement, selectedTheme) {
      var selectedListItem = dialogElement.querySelectorAll("li[value=\"".concat(selectedTheme, "\"]"));
      if (!selectedListItem || selectedListItem.length === 0) return;
      selectedListItem[0].focus();
    }
  }]);
}(Component);
ChangeThemeDialog.defaultProps = {
  open: false,
  themeIds: []
};