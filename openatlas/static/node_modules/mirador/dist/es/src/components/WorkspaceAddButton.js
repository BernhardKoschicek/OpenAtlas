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
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/AddSharp';
import CloseIcon from '@material-ui/icons/CloseSharp';

/**
 */
export var WorkspaceAddButton = /*#__PURE__*/function (_Component) {
  function WorkspaceAddButton() {
    _classCallCheck(this, WorkspaceAddButton);
    return _callSuper(this, WorkspaceAddButton, arguments);
  }
  _inherits(WorkspaceAddButton, _Component);
  return _createClass(WorkspaceAddButton, [{
    key: "render",
    value:
    /**
     * render
     * @return
     */
    function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        t = _this$props.t,
        setWorkspaceAddVisibility = _this$props.setWorkspaceAddVisibility,
        isWorkspaceAddVisible = _this$props.isWorkspaceAddVisible,
        useExtendedFab = _this$props.useExtendedFab;
      return /*#__PURE__*/React.createElement(Tooltip, {
        title: isWorkspaceAddVisible ? t('closeAddResourceMenu') : t('addResource')
      }, /*#__PURE__*/React.createElement(Fab, {
        size: "medium",
        color: "primary",
        id: "addBtn",
        disableRipple: true,
        "aria-label": isWorkspaceAddVisible ? t('closeAddResourceMenu') : useExtendedFab && t('startHere') || t('addResource'),
        className: classes.fab,
        classes: {
          primary: classes.fabPrimary,
          secondary: classes.fabSecondary
        },
        variant: useExtendedFab ? 'extended' : 'circular',
        onClick: function onClick() {
          setWorkspaceAddVisibility(!isWorkspaceAddVisible);
        }
      }, isWorkspaceAddVisible ? /*#__PURE__*/React.createElement(CloseIcon, null) : /*#__PURE__*/React.createElement(AddIcon, null), useExtendedFab && t('startHere')));
    }
  }]);
}(Component);
WorkspaceAddButton.defaultProps = {
  isWorkspaceAddVisible: false,
  t: function t(key) {
    return key;
  }
};