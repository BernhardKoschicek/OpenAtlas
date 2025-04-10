var _excluded = ["children", "icon", "label"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandLess from '@material-ui/icons/ExpandLessSharp';
import ExpandMore from '@material-ui/icons/ExpandMoreSharp';

/**
 * NestedMenu ~ A presentation component to render a menu item and have
 * it control the visibility of the MUI List passed in as the children
*/
export var NestedMenu = /*#__PURE__*/function (_Component) {
  /**
   * constructor -
   */
  function NestedMenu(props) {
    var _this;
    _classCallCheck(this, NestedMenu);
    _this = _callSuper(this, NestedMenu, [props]);
    _this.state = {
      nestedMenuIsOpen: false
    };
    _this.handleMenuClick = _this.handleMenuClick.bind(_this);
    return _this;
  }

  /**
   * handleMenuClick toggles the nestedMenuIsOpen state
   */
  _inherits(NestedMenu, _Component);
  return _createClass(NestedMenu, [{
    key: "handleMenuClick",
    value: function handleMenuClick() {
      var nestedMenuIsOpen = this.state.nestedMenuIsOpen;
      this.setState({
        nestedMenuIsOpen: !nestedMenuIsOpen
      });
    }

    /**
     * Returns the rendered component.  Spreads unused props to MenuItem
    */
  }, {
    key: "render",
    value: function render() {
      var nestedMenuIsOpen = this.state.nestedMenuIsOpen;
      var _this$props = this.props,
        children = _this$props.children,
        icon = _this$props.icon,
        label = _this$props.label,
        otherProps = _objectWithoutProperties(_this$props, _excluded);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MenuItem, Object.assign({
        onClick: this.handleMenuClick,
        divider: nestedMenuIsOpen
      }, otherProps), icon && /*#__PURE__*/React.createElement(ListItemIcon, null, icon), /*#__PURE__*/React.createElement(ListItemText, {
        primaryTypographyProps: {
          variant: 'body1'
        }
      }, label), nestedMenuIsOpen ? /*#__PURE__*/React.createElement(ExpandLess, null) : /*#__PURE__*/React.createElement(ExpandMore, null)), nestedMenuIsOpen && children);
    }
  }]);
}(Component);
NestedMenu.defaultProps = {
  icon: null
};