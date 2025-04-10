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
var _LanguageSettings = require("../components/LanguageSettings");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * Map state to props for connect
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    languages: (0, _selectors.getLanguagesFromConfigWithCurrent)(state)
  };
};

/**
 * Map action dispatches to props for connect
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref) {
  var afterSelect = _ref.afterSelect;
  return {
    handleClick: function handleClick(language) {
      dispatch(actions.updateConfig({
        language: language
      }));
      afterSelect && afterSelect();
    }
  };
};
var _default = exports["default"] = (0, _redux.compose)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('LanguageSettings'))(_LanguageSettings.LanguageSettings);