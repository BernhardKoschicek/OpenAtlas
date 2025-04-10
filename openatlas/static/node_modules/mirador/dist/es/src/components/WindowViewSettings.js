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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import SingleIcon from '@material-ui/icons/CropOriginalSharp';
import ScrollViewIcon from '@material-ui/icons/ViewColumn';
import BookViewIcon from './icons/BookViewIcon';
import GalleryViewIcon from './icons/GalleryViewIcon';

/**
 *
 */
export var WindowViewSettings = /*#__PURE__*/function (_Component) {
  /**
   * constructor -
   */
  function WindowViewSettings(props) {
    var _this;
    _classCallCheck(this, WindowViewSettings);
    _this = _callSuper(this, WindowViewSettings, [props]);
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  /**
   * @private
   */
  _inherits(WindowViewSettings, _Component);
  return _createClass(WindowViewSettings, [{
    key: "handleChange",
    value: function handleChange(value) {
      var _this$props = this.props,
        windowId = _this$props.windowId,
        setWindowViewType = _this$props.setWindowViewType;
      setWindowViewType(windowId, value);
    }

    /**
     * render
     *
     * @return {type}  description
     */
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        classes = _this$props2.classes,
        handleClose = _this$props2.handleClose,
        t = _this$props2.t,
        windowViewType = _this$props2.windowViewType,
        viewTypes = _this$props2.viewTypes;
      var iconMap = {
        book: BookViewIcon,
        gallery: GalleryViewIcon,
        scroll: ScrollViewIcon,
        single: SingleIcon
      };

      /** Suspiciously similar to a component, yet if it is invoked through JSX
          none of the click handlers work? */
      var menuItem = function menuItem(_ref) {
        var value = _ref.value,
          Icon = _ref.Icon;
        return /*#__PURE__*/React.createElement(MenuItem, {
          key: value,
          className: classes.MenuItem,
          autoFocus: windowViewType === value,
          onClick: function onClick() {
            _this2.handleChange(value);
            handleClose();
          }
        }, /*#__PURE__*/React.createElement(FormControlLabel, {
          value: value,
          classes: {
            label: windowViewType === value ? classes.selectedLabel : classes.label
          },
          control: /*#__PURE__*/React.createElement(Icon, {
            color: windowViewType === value ? 'secondary' : undefined
          }),
          label: t(value),
          labelPlacement: "bottom"
        }));
      };
      if (viewTypes.length === 0) return null;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ListSubheader, {
        role: "presentation",
        disableSticky: true,
        tabIndex: "-1"
      }, t('view')), viewTypes.map(function (value) {
        return menuItem({
          Icon: iconMap[value],
          value: value
        });
      }));
    }
  }]);
}(Component);
WindowViewSettings.defaultProps = {
  handleClose: function handleClose() {},
  t: function t(key) {
    return key;
  },
  viewTypes: []
};