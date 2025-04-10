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
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import ErrorIcon from '@material-ui/icons/ErrorOutlineSharp';

/**
 * WindowTopBarTitle
 */
export var WindowTopBarTitle = /*#__PURE__*/function (_Component) {
  function WindowTopBarTitle() {
    _classCallCheck(this, WindowTopBarTitle);
    return _callSuper(this, WindowTopBarTitle, arguments);
  }
  _inherits(WindowTopBarTitle, _Component);
  return _createClass(WindowTopBarTitle, [{
    key: "render",
    value:
    /**
     * render
     * @return
     */
    function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        error = _this$props.error,
        hideWindowTitle = _this$props.hideWindowTitle,
        isFetching = _this$props.isFetching,
        manifestTitle = _this$props.manifestTitle;

      /** */
      var TitleTypography = function TitleTypography(props) {
        return /*#__PURE__*/React.createElement(Typography, Object.assign({
          variant: "h2",
          noWrap: true,
          color: "inherit",
          className: classes.title
        }, props), props.children);
      };
      var title = null;
      if (isFetching) {
        title = /*#__PURE__*/React.createElement(TitleTypography, null, /*#__PURE__*/React.createElement(Skeleton, {
          variant: "text"
        }));
      } else if (error) {
        title = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ErrorIcon, {
          color: "error"
        }), /*#__PURE__*/React.createElement(TitleTypography, {
          color: "textSecondary"
        }, error));
      } else if (hideWindowTitle) {
        title = /*#__PURE__*/React.createElement("div", {
          className: classes.title
        });
      } else {
        title = /*#__PURE__*/React.createElement(TitleTypography, null, manifestTitle);
      }
      return title;
    }
  }]);
}(Component);
WindowTopBarTitle.defaultProps = {
  error: null,
  hideWindowTitle: false,
  isFetching: false,
  manifestTitle: ''
};