"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _core = require("@material-ui/core");
var actions = _interopRequireWildcard(require("../state/actions"));
var _WorkspaceElasticWindow = _interopRequireDefault(require("../components/WorkspaceElasticWindow"));
var _selectors = require("../state/selectors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    companionWindowDimensions: (0, _selectors.selectCompanionWindowDimensions)(state, {
      windowId: windowId
    }),
    focused: (0, _selectors.isFocused)(state, {
      windowId: windowId
    }),
    layout: (0, _selectors.getElasticLayout)(state)[windowId],
    workspace: (0, _selectors.getWorkspace)(state)
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch, props) {
  return {
    updateElasticWindowLayout: function updateElasticWindowLayout(windowId, position) {
      dispatch(actions.updateElasticWindowLayout(windowId, position));
    }
  };
};

/**
 * @param theme
 */
var styles = function styles(theme) {
  return {
    focused: {
      zIndex: theme.zIndex.modal - 1
    }
  };
};
var enhance = (0, _redux.compose)((0, _core.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)
// further HOC go here
);
var _default = exports["default"] = enhance(_WorkspaceElasticWindow["default"]);