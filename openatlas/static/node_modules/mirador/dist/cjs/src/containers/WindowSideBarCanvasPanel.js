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
var _WindowSideBarCanvasPanel = require("../components/WindowSideBarCanvasPanel");
var _selectors = require("../state/selectors");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapStateToProps - to hook up connect
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
    windowId = _ref.windowId;
  var treeStructure = (0, _selectors.getSequenceTreeStructure)(state, {
    windowId: windowId
  });
  var window = (0, _selectors.getWindow)(state, {
    windowId: windowId
  });
  var config = state.config;
  var companionWindow = (0, _selectors.getCompanionWindow)(state, {
    companionWindowId: id
  });
  var collectionPath = window.collectionPath || [];
  var collectionId = collectionPath && collectionPath[collectionPath.length - 1];
  var sequence = (0, _selectors.getSequence)(state, {
    windowId: windowId
  });
  return {
    collection: collectionId && (0, _selectors.getManifestoInstance)(state, {
      manifestId: collectionId
    }),
    config: config,
    sequenceId: sequence && sequence.id,
    sequences: (0, _selectors.getSequences)(state, {
      windowId: windowId
    }),
    showToc: treeStructure && treeStructure.nodes && treeStructure.nodes.length > 0,
    variant: companionWindow.variant || (0, _selectors.getDefaultSidebarVariant)(state, {
      windowId: windowId
    })
  };
};

/**
 * mapStateToProps - used to hook up connect to state
 * @memberof WindowSideBarCanvasPanel
 * @private
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var id = _ref2.id,
    windowId = _ref2.windowId;
  return {
    showMultipart: function showMultipart() {
      return dispatch(actions.addOrUpdateCompanionWindow(windowId, {
        content: 'collection',
        position: 'right'
      }));
    },
    updateSequence: function updateSequence(sequenceId) {
      return dispatch(actions.updateWindow(windowId, {
        sequenceId: sequenceId
      }));
    },
    updateVariant: function updateVariant(variant) {
      return dispatch(actions.updateCompanionWindow(windowId, id, {
        variant: variant
      }));
    }
  };
};

/**
 *
 * @param theme
 */
var styles = function styles(theme) {
  return {
    "break": {
      flexBasis: '100%',
      height: 0
    },
    collectionNavigationButton: {
      textTransform: 'none'
    },
    label: {
      paddingLeft: theme.spacing(1)
    },
    select: {
      '&:focus': {
        backgroundColor: theme.palette.background.paper
      }
    },
    selectEmpty: {
      backgroundColor: theme.palette.background.paper
    },
    variantTab: {
      minWidth: 'auto'
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('WindowSideBarCanvasPanel'));
var _default = exports["default"] = enhance(_WindowSideBarCanvasPanel.WindowSideBarCanvasPanel);