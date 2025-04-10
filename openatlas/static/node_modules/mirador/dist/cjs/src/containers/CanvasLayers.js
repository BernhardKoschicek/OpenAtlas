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
var _selectors = require("../state/selectors");
var _CanvasLayers = require("../components/CanvasLayers");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** For connect */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var canvasId = _ref.canvasId,
    windowId = _ref.windowId;
  return {
    label: (0, _selectors.getCanvasLabel)(state, {
      canvasId: canvasId,
      windowId: windowId
    }),
    layerMetadata: (0, _selectors.getLayers)(state, {
      canvasId: canvasId,
      windowId: windowId
    }),
    layers: (0, _selectors.getSortedLayers)(state, {
      canvasId: canvasId,
      windowId: windowId
    })
  };
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
var mapDispatchToProps = {
  updateLayers: actions.updateLayers
};

/** For withStlyes */
var styles = function styles(theme) {
  return {
    dragging: {},
    dragHandle: {
      alignItems: 'center',
      borderRight: "0.5px solid ".concat(theme.palette.divider),
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      marginBottom: -1 * theme.spacing(2) + 0.5,
      marginRight: theme.spacing(1),
      marginTop: -1 * theme.spacing(2),
      maxWidth: theme.spacing(3),
      width: theme.spacing(3)
    },
    image: {
      borderBottom: "1px solid ".concat(theme.palette.divider)
    },
    label: {
      paddingLeft: theme.spacing(1)
    },
    list: {
      paddingTop: 0
    },
    listItem: {
      '& $dragHandle': {
        '&:hover': {
          backgroundColor: theme.palette.action.hover
        },
        backgroundColor: theme.palette.shades.light
      },
      '&$dragging': {
        '& $dragHandle, & $dragHandle:hover': {
          backgroundColor: theme.palette.action.selected
        },
        backgroundColor: theme.palette.action.hover
      },
      alignItems: 'stretch',
      borderBottom: "0.5px solid ".concat(theme.palette.divider),
      cursor: 'pointer',
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
    },
    opacityIcon: {
      marginRight: theme.spacing(0.5)
    },
    opacityInput: _objectSpread(_objectSpread({}, theme.typography.caption), {}, {
      '&::-webkit-outer-spin-button,&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0
      },
      '-moz-appearance': 'textfield',
      textAlign: 'right',
      width: '3ch'
    }),
    sectionHeading: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
    },
    slider: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      maxWidth: 150
    },
    thumbnail: {
      minWidth: 50
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps));
var _default = exports["default"] = enhance(_CanvasLayers.CanvasLayers);