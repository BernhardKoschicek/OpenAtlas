"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var _styles = require("@material-ui/core/styles");
var actions = _interopRequireWildcard(require("../state/actions"));
var _withPlugins = require("../extend/withPlugins");
var _selectors = require("../state/selectors");
var _SelectCollection = require("../components/SelectCollection");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/** */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  var _ref2 = (0, _selectors.getWindow)(state, {
      windowId: windowId
    }) || {},
    collectionPath = _ref2.collectionPath,
    manifestId = _ref2.manifestId;
  return {
    collectionPath: collectionPath,
    manifestId: manifestId
  };
};
var mapDispatchToProps = {
  showCollectionDialog: actions.showCollectionDialog
};
/** */
var styles = function styles(theme) {
  return {};
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('SelectCollection'));
var _default = exports["default"] = enhance(_SelectCollection.SelectCollection);