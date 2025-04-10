"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _withPlugins = require("../extend/withPlugins");
var actions = _interopRequireWildcard(require("../state/actions"));
var _selectors = require("../state/selectors");
var _AppProviders = require("../components/AppProviders");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    createGenerateClassNameOptions: (0, _selectors.getConfig)(state).createGenerateClassNameOptions,
    isFullscreenEnabled: (0, _selectors.getFullScreenEnabled)(state),
    language: (0, _selectors.getConfig)(state).language,
    theme: (0, _selectors.getTheme)(state),
    translations: (0, _selectors.getConfig)(state).translations
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
var mapDispatchToProps = {
  setWorkspaceFullscreen: actions.setWorkspaceFullscreen
};
var enhance = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('AppProviders'));
var _default = exports["default"] = enhance(_AppProviders.AppProviders);