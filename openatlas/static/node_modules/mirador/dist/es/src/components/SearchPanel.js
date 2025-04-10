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
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import CompanionWindow from '../containers/CompanionWindow';
import SearchPanelControls from '../containers/SearchPanelControls';
import SearchResults from '../containers/SearchResults';

/** */
export var SearchPanel = /*#__PURE__*/function (_Component) {
  /** */
  function SearchPanel(props) {
    var _this;
    _classCallCheck(this, SearchPanel);
    _this = _callSuper(this, SearchPanel, [props]);
    _this.containerRef = /*#__PURE__*/React.createRef();
    return _this;
  }

  /** */
  _inherits(SearchPanel, _Component);
  return _createClass(SearchPanel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        fetchSearch = _this$props.fetchSearch,
        windowId = _this$props.windowId,
        id = _this$props.id,
        query = _this$props.query,
        removeSearch = _this$props.removeSearch,
        searchService = _this$props.searchService,
        suggestedSearches = _this$props.suggestedSearches,
        t = _this$props.t;
      return /*#__PURE__*/React.createElement(CompanionWindow, {
        ariaLabel: t('searchTitle'),
        title: /*#__PURE__*/React.createElement(React.Fragment, null, t('searchTitle'), query && query !== '' && /*#__PURE__*/React.createElement(Chip, {
          className: classes.clearChip,
          color: "secondary",
          label: t('clearSearch'),
          onClick: removeSearch,
          onDelete: removeSearch,
          size: "small",
          variant: "outlined"
        })),
        windowId: windowId,
        id: id,
        titleControls: /*#__PURE__*/React.createElement(SearchPanelControls, {
          companionWindowId: id,
          windowId: windowId
        }),
        ref: this.containerRef
      }, /*#__PURE__*/React.createElement(SearchResults, {
        containerRef: this.containerRef,
        companionWindowId: id,
        windowId: windowId
      }), fetchSearch && suggestedSearches && query === '' && suggestedSearches.map(function (search) {
        return /*#__PURE__*/React.createElement(Typography, {
          component: "p",
          key: search,
          variant: "body1"
        }, /*#__PURE__*/React.createElement(Button, {
          className: classes.inlineButton,
          color: "secondary",
          onClick: function onClick() {
            return fetchSearch("".concat(searchService.id, "?q=").concat(search), search);
          }
        }, t('suggestSearch', {
          query: search
        })));
      }));
    }
  }]);
}(Component);
SearchPanel.defaultProps = {
  classes: {},
  fetchSearch: undefined,
  query: '',
  suggestedSearches: [],
  t: function t(key) {
    return key;
  }
};