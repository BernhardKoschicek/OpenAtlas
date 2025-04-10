"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var _styles = require("@material-ui/core/styles");
var _withPlugins = require("../extend/withPlugins");
var _SearchResults = require("../components/SearchResults");
var actions = _interopRequireWildcard(require("../state/actions"));
var _selectors = require("../state/selectors");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchResult
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var companionWindowId = _ref.companionWindowId,
    windowId = _ref.windowId;
  return {
    isFetching: (0, _selectors.getSearchIsFetching)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    nextSearch: (0, _selectors.getNextSearchId)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    query: (0, _selectors.getSearchQuery)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    searchAnnotations: (0, _selectors.getSortedSearchAnnotationsForCompanionWindow)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    searchHits: (0, _selectors.getSortedSearchHitsForCompanionWindow)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    searchNumTotal: (0, _selectors.getSearchNumTotal)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    })
  };
};
var mapDispatchToProps = {
  fetchSearch: actions.fetchSearch
};

/** */
var styles = function styles(theme) {
  return {
    moreButton: {
      width: '100%'
    },
    navigation: {
      textTransform: 'none'
    },
    noResults: _objectSpread(_objectSpread({}, theme.typography.h6), {}, {
      padding: theme.spacing(2)
    }),
    toggleFocus: _objectSpread({}, theme.typography.subtitle1)
  };
};
var enhance = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _withPlugins.withPlugins)('SearchResults'));
var _default = exports["default"] = enhance(_SearchResults.SearchResults);