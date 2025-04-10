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
var _SearchPanelNavigation = require("../components/SearchPanelNavigation");
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
    direction: (0, _selectors.getThemeDirection)(state),
    numTotal: (0, _selectors.getSearchNumTotal)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    searchHits: (0, _selectors.getSortedSearchHitsForCompanionWindow)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    }),
    selectedContentSearchAnnotation: (0, _selectors.getSelectedContentSearchAnnotationIds)(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    })
  };
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof SearchPanelNavigation
 * @private
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    selectAnnotation: function selectAnnotation() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return dispatch(actions.selectAnnotation.apply(actions, [windowId].concat(args)));
    }
  };
};

/** */
var styles = function styles(theme) {
  return {
    body2: {
      marginLeft: '-16px',
      width: '100%'
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _withPlugins.withPlugins)('SearchPanelNavigation'));
var _default = exports["default"] = enhance(_SearchPanelNavigation.SearchPanelNavigation);