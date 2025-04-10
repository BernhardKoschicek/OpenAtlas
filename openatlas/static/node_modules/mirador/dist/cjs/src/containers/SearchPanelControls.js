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
var _SearchPanelControls = require("../components/SearchPanelControls");
var actions = _interopRequireWildcard(require("../state/actions"));
var _selectors = require("../state/selectors");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SearchPanelControls
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var companionWindowId = _ref.companionWindowId,
    windowId = _ref.windowId;
  return {
    autocompleteService: (0, _selectors.getManifestAutocompleteService)(state, {
      windowId: windowId
    }),
    query: (0, _selectors.getSearchQuery)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    searchIsFetching: (0, _selectors.getSearchIsFetching)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    searchService: (0, _selectors.getManifestSearchService)(state, {
      windowId: windowId
    })
  };
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchPanelControls
 * @private
 */
var mapDispatchToProps = {
  fetchSearch: actions.fetchSearch
};

/** */
var styles = function styles(theme) {
  return {
    endAdornment: {
      position: 'absolute',
      right: 0
    },
    form: {
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1.5),
      width: '100%'
    },
    searchProgress: {
      position: 'absolute',
      right: 0
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _withPlugins.withPlugins)('SearchPanelControls'));
var _default = exports["default"] = enhance(_SearchPanelControls.SearchPanelControls);