"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var _styles = require("@material-ui/core/styles");
var actions = _interopRequireWildcard(require("../state/actions"));
var _withPlugins = require("../extend/withPlugins");
var _SearchPanel = require("../components/SearchPanel");
var _selectors = require("../state/selectors");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/** */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
    windowId = _ref.windowId;
  return {
    query: (0, _selectors.getSearchQuery)(state, {
      companionWindowId: id,
      windowId: windowId
    }),
    searchService: (0, _selectors.getManifestSearchService)(state, {
      windowId: windowId
    }),
    suggestedSearches: (0, _selectors.getWindow)(state, {
      windowId: windowId
    }).suggestedSearches
  };
};

/** */
var mapDispatchToProps = function mapDispatchToProps(dispatch, props) {
  return {
    fetchSearch: function fetchSearch(searchId, query) {
      return dispatch(actions.fetchSearch(props.windowId, props.id, searchId, query));
    },
    removeSearch: function removeSearch() {
      return dispatch(actions.removeSearch(props.windowId, props.id));
    }
  };
};

/**
* Styles for withStyles HOC
*/
var styles = function styles(theme) {
  return {
    clearChip: {
      marginLeft: theme.spacing(1)
    },
    inlineButton: {
      '& span': {
        lineHeight: '1.5em'
      },
      margin: theme.spacing(2),
      padding: 0,
      textAlign: 'inherit',
      textTransform: 'none'
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _withPlugins.withPlugins)('SearchPanel'));
var _default = exports["default"] = enhance(_SearchPanel.SearchPanel);