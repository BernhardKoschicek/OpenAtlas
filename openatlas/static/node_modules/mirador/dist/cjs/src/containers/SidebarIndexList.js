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
var _SidebarIndexList = require("../components/SidebarIndexList");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapStateToProps - to hook up connect
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
    windowId = _ref.windowId;
  return {
    canvases: (0, _selectors.getCanvases)(state, {
      windowId: windowId
    }),
    selectedCanvasIds: (0, _selectors.getVisibleCanvasIds)(state, {
      windowId: windowId
    }),
    variant: (0, _selectors.getCompanionWindow)(state, {
      companionWindowId: id,
      windowId: windowId
    }).variant
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
    setCanvas: function setCanvas() {
      return dispatch(actions.setCanvas.apply(actions, arguments));
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
    listItem: {
      borderBottom: "0.5px solid ".concat(theme.palette.divider),
      paddingRight: theme.spacing(1)
    }
  };
};
var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('SidebarIndexList'));
var _default = exports["default"] = enhance(_SidebarIndexList.SidebarIndexList);