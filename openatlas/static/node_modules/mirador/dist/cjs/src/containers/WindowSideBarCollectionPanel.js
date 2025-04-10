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
var actions = _interopRequireWildcard(require("../state/actions"));
var _selectors = require("../state/selectors");
var _WindowSideBarCollectionPanel = require("../components/WindowSideBarCollectionPanel");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapStateToProps - to hook up connect
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
    windowId = _ref.windowId;
  var window = (0, _selectors.getWindow)(state, {
    windowId: windowId
  });
  var companionWindow = (0, _selectors.getCompanionWindow)(state, {
    companionWindowId: id
  });
  var localCollectionPath = companionWindow.collectionPath;
  var collectionPath = localCollectionPath || window.collectionPath;
  var collectionId = collectionPath && collectionPath[collectionPath.length - 1];
  var parentCollectionId = collectionPath && collectionPath[collectionPath.length - 2];
  var collection = collectionId && (0, _selectors.getManifest)(state, {
    manifestId: collectionId
  });
  var parentCollection = parentCollectionId && (0, _selectors.getManifest)(state, {
    manifestId: parentCollectionId
  });
  var manifest = (0, _selectors.getManifest)(state, {
    windowId: windowId
  });
  return {
    canvasNavigation: state.config.canvasNavigation,
    collection: collection && (0, _selectors.getManifestoInstance)(state, {
      manifestId: collection.id
    }),
    collectionId: collectionId,
    collectionPath: collectionPath,
    error: collection && collection.error,
    isFetching: collection && collection.isFetching,
    manifestId: manifest && manifest.id,
    parentCollection: parentCollection && (0, _selectors.getManifestoInstance)(state, {
      manifestId: parentCollection.id
    }),
    ready: collection && !!collection.json,
    variant: companionWindow.variant || (0, _selectors.getDefaultSidebarVariant)(state, {
      windowId: windowId
    })
  };
};

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof SidebarIndexList
 * @private
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var id = _ref2.id,
    windowId = _ref2.windowId;
  return {
    updateCompanionWindow: function updateCompanionWindow() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return dispatch(actions.updateCompanionWindow.apply(actions, [windowId, id].concat(args)));
    },
    updateWindow: function updateWindow() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return dispatch(actions.updateWindow.apply(actions, [windowId].concat(args)));
    }
  };
};

/**
 * Styles for withStyles HOC
 */
var styles = function styles(theme) {
  return {
    label: {
      paddingLeft: theme.spacing(1)
    },
    menuItem: {
      borderBottom: "0.5px solid ".concat(theme.palette.divider),
      paddingRight: theme.spacing(1),
      whiteSpace: 'normal'
    }
  };
};
var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('WindowSideBarCollectionPanel'));
var _default = exports["default"] = enhance(_WindowSideBarCollectionPanel.WindowSideBarCollectionPanel);