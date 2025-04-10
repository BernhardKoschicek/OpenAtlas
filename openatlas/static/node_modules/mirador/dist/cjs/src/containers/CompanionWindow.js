"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var _core = require("@material-ui/core");
var _reactSizeme = require("react-sizeme");
var _withPlugins = require("../extend/withPlugins");
var _withRef = require("../extend/withRef");
var actions = _interopRequireWildcard(require("../state/actions"));
var _selectors = require("../state/selectors");
var _CompanionWindow = require("../components/CompanionWindow");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * mapStateToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id,
    windowId = _ref.windowId;
  var companionWindow = (0, _selectors.getCompanionWindow)(state, {
    companionWindowId: id
  });
  var _getWindowConfig = (0, _selectors.getWindowConfig)(state, {
      windowId: windowId
    }),
    defaultSidebarPanelHeight = _getWindowConfig.defaultSidebarPanelHeight,
    defaultSidebarPanelWidth = _getWindowConfig.defaultSidebarPanelWidth;
  return _objectSpread(_objectSpread({}, companionWindow), {}, {
    defaultSidebarPanelHeight: defaultSidebarPanelHeight,
    defaultSidebarPanelWidth: defaultSidebarPanelWidth,
    direction: (0, _selectors.getThemeDirection)(state),
    isDisplayed: companionWindow && companionWindow.content && companionWindow.content.length > 0
  });
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var windowId = _ref2.windowId,
    id = _ref2.id;
  return {
    onCloseClick: function onCloseClick() {
      return dispatch(actions.removeCompanionWindow(windowId, id));
    },
    updateCompanionWindow: function updateCompanionWindow() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return dispatch(actions.updateCompanionWindow.apply(actions, [windowId, id].concat(args)));
    }
  };
};

/**
 *
 * @param theme
 * @returns {{closeButton: {top: number, position: string, right: number},
 * root: {overflowY: string, width: string}}}
 */
var styles = function styles(theme) {
  return {
    closeButton: {
      order: 4
    },
    'companionWindow-bottom': {
      borderTop: "0.5px solid ".concat(theme.palette.divider)
    },
    'companionWindow-left': {
      borderRight: "0.5px solid ".concat(theme.palette.divider)
    },
    'companionWindow-right': {
      borderLeft: "0.5px solid ".concat(theme.palette.divider)
    },
    companionWindowHeader: {
      flexWrap: 'wrap'
    },
    companionWindowTitleControls: {
      flexGrow: 1,
      order: 1000
    },
    companionWindowTitleControlsBottom: {
      order: 'unset'
    },
    content: {
      overflowY: 'auto',
      wordBreak: 'break-word'
    },
    horizontal: {},
    positionButton: {
      marginLeft: -16,
      order: -100,
      width: 24
    },
    rnd: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    },
    root: {
      boxShadow: 'none',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    },
    small: {},
    titleControls: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'row wrap',
      minHeight: 48,
      order: 3
    },
    toolbar: {
      '&$small': {
        '& $closeButton': {
          order: 'unset'
        },
        '& $titleControls': {
          order: 'unset'
        }
      },
      alignItems: 'flex-start',
      background: theme.palette.shades.light,
      justifyContent: 'space-between',
      minHeight: 'max-content',
      paddingLeft: theme.spacing(2)
    },
    vertical: {},
    windowSideBarTitle: _objectSpread(_objectSpread({}, theme.typography.subtitle1), {}, {
      alignSelf: 'center',
      flexGrow: 1,
      width: 160
    })
  };
};
var enhance = (0, _redux.compose)((0, _withRef.withRef)(), (0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _reactSizeme.withSize)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('CompanionWindow'));
var _default = exports["default"] = enhance(_CompanionWindow.CompanionWindow);