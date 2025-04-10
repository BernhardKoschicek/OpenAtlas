"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchResults = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _List = _interopRequireDefault(require("@material-ui/core/List"));
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _ArrowBackSharp = _interopRequireDefault(require("@material-ui/icons/ArrowBackSharp"));
var _reactAriaLive = require("react-aria-live");
var _SearchHit = _interopRequireDefault(require("../containers/SearchHit"));
var _ScrollTo = require("./ScrollTo");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
/** */
var SearchResults = exports.SearchResults = /*#__PURE__*/function (_Component) {
  /** */
  function SearchResults(props) {
    var _this;
    _classCallCheck(this, SearchResults);
    _this = _callSuper(this, SearchResults, [props]);
    _this.state = {
      focused: false
    };
    _this.toggleFocus = _this.toggleFocus.bind(_this);
    return _this;
  }

  /** */
  _inherits(SearchResults, _Component);
  return _createClass(SearchResults, [{
    key: "toggleFocus",
    value: function toggleFocus() {
      var focused = this.state.focused;
      this.setState({
        focused: !focused
      });
    }

    /**
     * Return SearchHits for every hit in the response
     * Return SearchHits for every annotation in the response if there are no hits
     */
  }, {
    key: "renderSearchHitsAndAnnotations",
    value: function renderSearchHitsAndAnnotations(announcer) {
      var _this2 = this;
      var _this$props = this.props,
        companionWindowId = _this$props.companionWindowId,
        containerRef = _this$props.containerRef,
        searchAnnotations = _this$props.searchAnnotations,
        searchHits = _this$props.searchHits,
        windowId = _this$props.windowId;
      var focused = this.state.focused;
      if (searchHits.length === 0 && searchAnnotations.length > 0) {
        return searchAnnotations.map(function (anno, index) {
          return /*#__PURE__*/_react["default"].createElement(_SearchHit["default"], {
            announcer: announcer,
            annotationId: anno.id,
            companionWindowId: companionWindowId,
            containerRef: containerRef,
            key: anno.id,
            focused: focused,
            index: index,
            total: searchAnnotations.length,
            windowId: windowId,
            showDetails: _this2.toggleFocus
          });
        });
      }
      return searchHits.map(function (hit, index) {
        return /*#__PURE__*/_react["default"].createElement(_SearchHit["default"], {
          announcer: announcer,
          containerRef: containerRef,
          companionWindowId: companionWindowId,
          key: hit.annotations[0],
          focused: focused,
          hit: hit,
          index: index,
          total: searchHits.length,
          windowId: windowId,
          showDetails: _this2.toggleFocus
        });
      });
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props2 = this.props,
        classes = _this$props2.classes,
        companionWindowId = _this$props2.companionWindowId,
        containerRef = _this$props2.containerRef,
        isFetching = _this$props2.isFetching,
        fetchSearch = _this$props2.fetchSearch,
        nextSearch = _this$props2.nextSearch,
        query = _this$props2.query,
        searchAnnotations = _this$props2.searchAnnotations,
        searchHits = _this$props2.searchHits,
        searchNumTotal = _this$props2.searchNumTotal,
        t = _this$props2.t,
        windowId = _this$props2.windowId;
      var focused = this.state.focused;
      var noResultsState = query && !isFetching && searchHits.length === 0 && searchAnnotations.length === 0;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, focused && /*#__PURE__*/_react["default"].createElement(_ScrollTo.ScrollTo, {
        containerRef: containerRef,
        offsetTop: 96,
        scrollTo: true
      }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        onClick: this.toggleFocus,
        className: classes.navigation,
        size: "small"
      }, /*#__PURE__*/_react["default"].createElement(_ArrowBackSharp["default"], null), t('backToResults'))), noResultsState && /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        className: classes.noResults
      }, t('searchNoResults')), /*#__PURE__*/_react["default"].createElement(_List["default"], {
        disablePadding: true
      }, /*#__PURE__*/_react["default"].createElement(_reactAriaLive.LiveMessenger, null, function (_ref) {
        var announcePolite = _ref.announcePolite;
        return _this3.renderSearchHitsAndAnnotations(announcePolite);
      })), nextSearch && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        className: classes.moreButton,
        color: "secondary",
        onClick: function onClick() {
          return fetchSearch(windowId, companionWindowId, nextSearch, query);
        }
      }, t('moreResults'), /*#__PURE__*/_react["default"].createElement("br", null), "(".concat(t('searchResultsRemaining', {
        numLeft: searchNumTotal - searchHits.length
      }), ")")));
    }
  }]);
}(_react.Component);
SearchResults.defaultProps = {
  classes: {},
  containerRef: undefined,
  isFetching: false,
  nextSearch: undefined,
  query: undefined,
  searchAnnotations: [],
  searchHits: [],
  searchNumTotal: undefined,
  t: function t(k) {
    return k;
  }
};