function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { SearchResults } from '../components/SearchResults';
import * as actions from '../state/actions';
import { getNextSearchId, getSearchQuery, getSearchIsFetching, getSearchNumTotal, getSortedSearchHitsForCompanionWindow, getSortedSearchAnnotationsForCompanionWindow } from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchResult
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var companionWindowId = _ref.companionWindowId,
    windowId = _ref.windowId;
  return {
    isFetching: getSearchIsFetching(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    nextSearch: getNextSearchId(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    query: getSearchQuery(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    searchAnnotations: getSortedSearchAnnotationsForCompanionWindow(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    searchHits: getSortedSearchHitsForCompanionWindow(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    searchNumTotal: getSearchNumTotal(state, {
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
var enhance = compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles), withTranslation(), withPlugins('SearchResults'));
export default enhance(SearchResults);