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
var _WindowViewSettings = require("../components/WindowViewSettings");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
var mapDispatchToProps = {
  setWindowViewType: actions.setWindowViewType
};

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    viewTypes: (0, _selectors.getAllowedWindowViewTypes)(state, {
      windowId: windowId
    }),
    windowViewType: (0, _selectors.getWindowViewType)(state, {
      windowId: windowId
    })
  };
};

/** */
var styles = function styles(theme) {
  return {
    label: {
      borderBottom: '2px solid transparent'
    },
    MenuItem: {
      display: 'inline-block'
    },
    selectedLabel: {
      borderBottom: "2px solid ".concat(theme.palette.secondary.main),
      color: theme.palette.secondary.main
    }
  };
};
var enhance = (0, _redux.compose)((0, _styles.withStyles)(styles), (0, _reactI18next.withTranslation)(null, {
  withRef: true
}), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true
}), (0, _withPlugins.withPlugins)('WindowViewSettings'));
var _default = exports["default"] = enhance(_WindowViewSettings.WindowViewSettings);