"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _core = require("@material-ui/core");
var _reactI18next = require("react-i18next");
var _withPlugins = require("../extend/withPlugins");
var actions = _interopRequireWildcard(require("../state/actions"));
var _Window = require("../components/Window");
var _selectors = require("../state/selectors");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    isFetching: (0, _selectors.getManifestStatus)(state, {
      windowId: windowId
    }).isFetching,
    label: (0, _selectors.getManifestTitle)(state, {
      windowId: windowId
    }),
    manifestError: (0, _selectors.getManifestError)(state, {
      windowId: windowId
    }),
    maximized: ((0, _selectors.getWindow)(state, {
      windowId: windowId
    }) || {}).maximized,
    sideBarOpen: ((0, _selectors.getWindow)(state, {
      windowId: windowId
    }) || {}).sideBarOpen,
    thumbnailNavigationPosition: (0, _selectors.getThumbnailNavigationPosition)(state, {
      windowId: windowId
    }),
    view: (0, _selectors.getWindowViewType)(state, {
      windowId: windowId
    }),
    window: (0, _selectors.getWindow)(state, {
      windowId: windowId
    }),
    windowDraggable: (0, _selectors.getWindowDraggability)(state, {
      windowId: windowId
    }),
    workspaceType: (0, _selectors.getWorkspaceType)(state)
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId;
  return {
    focusWindow: function focusWindow() {
      return dispatch(actions.focusWindow(windowId));
    }
  };
};

/**
 * @param theme
 */
var styles = function styles(theme) {
  return {
    companionAreaBottom: {
      display: 'flex',
      flex: '0',
      flexBasis: 'auto',
      minHeight: 0
    },
    companionAreaRight: {
      display: 'flex',
      flex: '0 1 auto',
      minHeight: 0
    },
    maximized: {},
    middle: {
      display: 'flex',
      flex: '1',
      flexDirection: 'row',
      minHeight: 0
    },
    middleLeft: {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      minHeight: 0
    },
    primaryWindow: {
      display: 'flex',
      flex: '1',
      height: '300px',
      minHeight: 0,
      position: 'relative'
    },
    thumbnailArea: {
      backgroundColor: theme.palette.shades.dark
    },
    thumbnailAreaBottom: {},
    thumbnailAreaRight: {
      minWidth: 100
    },
    window: {
      '&$maximized': {
        left: 0,
        position: 'absolute',
        top: 0,
        zIndex: theme.zIndex.modal - 1
      },
      backgroundColor: theme.palette.shades.dark,
      borderRadius: 0,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      overflow: 'hidden',
      width: '100%'
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('Window'));
var _default = exports["default"] = enhance(_Window.Window);