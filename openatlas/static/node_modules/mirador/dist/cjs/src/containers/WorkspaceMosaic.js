"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _styles = require("@material-ui/core/styles");
var _withPlugins = require("../extend/withPlugins");
var _selectors = require("../state/selectors");
var actions = _interopRequireWildcard(require("../state/actions"));
var _WorkspaceMosaic = require("../components/WorkspaceMosaic");
var _reactMosaicComponent = _interopRequireDefault(require("../styles/react-mosaic-component"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    layout: (0, _selectors.getWorkspace)(state).layout,
    windowIds: (0, _selectors.getWorkspace)(state).windowIds,
    workspaceId: (0, _selectors.getWorkspace)(state).id
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
var mapDispatchToProps = {
  updateWorkspaceMosaicLayout: actions.updateWorkspaceMosaicLayout
};
var styles = _objectSpread({
  root: {
    '& .mosaic-preview': {
      boxShadow: 'none'
    },
    '& .mosaic-tile': {
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .2), 0 2px 1px -1px rgba(0, 0, 0, .2)'
    },
    '& .mosaic-window': {
      boxShadow: 'none'
    },
    '& .mosaic-window-toolbar': {
      display: 'none !important'
    }
  }
}, _reactMosaicComponent["default"]);
var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('WorkspaceMosaic')
// further HOC go here
);
var _default = exports["default"] = enhance(_WorkspaceMosaic.WorkspaceMosaic);