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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeftSharp';
import ChevronRightIcon from '@material-ui/icons/ChevronRightSharp';
import Typography from '@material-ui/core/Typography';
import MiradorMenuButton from '../containers/MiradorMenuButton';

/**
 * SearchPanelNavigation ~
*/
export var SearchPanelNavigation = /*#__PURE__*/function (_Component) {
  function SearchPanelNavigation() {
    _classCallCheck(this, SearchPanelNavigation);
    return _callSuper(this, SearchPanelNavigation, arguments);
  }
  _inherits(SearchPanelNavigation, _Component);
  return _createClass(SearchPanelNavigation, [{
    key: "nextSearchResult",
    value: /** */
    function nextSearchResult(currentHitIndex) {
      var _this$props = this.props,
        searchHits = _this$props.searchHits,
        selectAnnotation = _this$props.selectAnnotation;
      selectAnnotation(searchHits[currentHitIndex + 1].annotations[0]);
    }

    /** */
  }, {
    key: "previousSearchResult",
    value: function previousSearchResult(currentHitIndex) {
      var _this$props2 = this.props,
        searchHits = _this$props2.searchHits,
        selectAnnotation = _this$props2.selectAnnotation;
      selectAnnotation(searchHits[currentHitIndex - 1].annotations[0]);
    }

    /** */
  }, {
    key: "hasNextResult",
    value: function hasNextResult(currentHitIndex) {
      var searchHits = this.props.searchHits;
      if (searchHits.length === 0) return false;
      if (currentHitIndex < searchHits.length - 1) return true;
      return false;
    }

    /** */
  }, {
    key: "hasPreviousResult",
    value: function hasPreviousResult(currentHitIndex) {
      var searchHits = this.props.searchHits;
      if (searchHits.length === 0) return false;
      if (currentHitIndex > 0) return true;
      return false;
    }

    /**
     * Returns the rendered component
    */
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props3 = this.props,
        numTotal = _this$props3.numTotal,
        searchHits = _this$props3.searchHits,
        selectedContentSearchAnnotation = _this$props3.selectedContentSearchAnnotation,
        classes = _this$props3.classes,
        t = _this$props3.t,
        direction = _this$props3.direction;
      var iconStyle = direction === 'rtl' ? {
        transform: 'rotate(180deg)'
      } : {};
      var currentHitIndex = searchHits.findIndex(function (val) {
        return val.annotations.includes(selectedContentSearchAnnotation[0]);
      });
      var lengthText = searchHits.length;
      if (searchHits.length < numTotal) {
        lengthText += '+';
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, searchHits.length > 0 && /*#__PURE__*/React.createElement(Typography, {
        variant: "body2",
        align: "center",
        classes: classes
      }, /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t('searchPreviousResult'),
        disabled: !this.hasPreviousResult(currentHitIndex),
        onClick: function onClick() {
          return _this.previousSearchResult(currentHitIndex);
        }
      }, /*#__PURE__*/React.createElement(ChevronLeftIcon, {
        style: iconStyle
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          unicodeBidi: 'plaintext'
        }
      }, t('pagination', {
        current: currentHitIndex + 1,
        total: lengthText
      })), /*#__PURE__*/React.createElement(MiradorMenuButton, {
        "aria-label": t('searchNextResult'),
        disabled: !this.hasNextResult(currentHitIndex),
        onClick: function onClick() {
          return _this.nextSearchResult(currentHitIndex);
        }
      }, /*#__PURE__*/React.createElement(ChevronRightIcon, {
        style: iconStyle
      }))));
    }
  }]);
}(Component);
SearchPanelNavigation.defaultProps = {
  classes: {},
  numTotal: undefined,
  searchHits: [],
  t: function t(key) {
    return key;
  }
};