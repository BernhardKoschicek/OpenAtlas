"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var _core = require("@material-ui/core");
var _withPlugins = require("../extend/withPlugins");
var _selectors = require("../state/selectors");
var actions = _interopRequireWildcard(require("../state/actions"));
var _ManifestListItem = require("../components/ManifestListItem");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var manifestId = _ref.manifestId,
    provider = _ref.provider;
  var manifest = (0, _selectors.getManifest)(state, {
    manifestId: manifestId
  }) || {};
  var manifesto = (0, _selectors.getManifestoInstance)(state, {
    manifestId: manifestId
  });
  var isCollection = (manifesto || {
    isCollection: function isCollection() {
      return false;
    }
  }).isCollection();
  var size = isCollection ? manifesto.getTotalItems() : (0, _selectors.getCanvases)(state, {
    manifestId: manifestId
  }).length;
  return {
    active: (0, _selectors.getWindowManifests)(state).includes(manifestId),
    error: manifest.error,
    isCollection: isCollection,
    isFetching: manifest.isFetching,
    isMultipart: isCollection && (0, _selectors.getSequenceBehaviors)(state, {
      manifestId: manifestId
    }).includes('multi-part'),
    manifestLogo: (0, _selectors.getManifestLogo)(state, {
      manifestId: manifestId
    }),
    provider: provider || (0, _selectors.getManifestProvider)(state, {
      manifestId: manifestId
    }),
    ready: !!manifest.json,
    size: size,
    thumbnail: (0, _selectors.getManifestThumbnail)(state, {
      manifestId: manifestId
    }),
    title: (0, _selectors.getManifestTitle)(state, {
      manifestId: manifestId
    })
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
var mapDispatchToProps = {
  addWindow: actions.addWindow,
  fetchManifest: actions.fetchManifest
};

/**
 *
 * @param theme
 * @returns {{root: {}, label: {textAlign: string, textTransform: string}}}
 */
var styles = function styles(theme) {
  return {
    active: {},
    buttonGrid: {},
    label: {
      textAlign: 'left',
      textTransform: 'initial'
    },
    logo: {
      height: '2.5rem',
      maxWidth: '100%',
      objectFit: 'contain',
      paddingRight: 8
    },
    placeholder: {
      backgroundColor: theme.palette.grey[300]
    },
    root: _objectSpread(_objectSpread({}, theme.mixins.gutters()), {}, {
      '&$active': {
        borderLeft: "4px solid ".concat(theme.palette.primary.main)
      },
      '&:hover,&:focus-within': {
        '&$active': {
          borderLeft: "4px solid ".concat(theme.palette.primary.main)
        },
        backgroundColor: theme.palette.action.hover,
        borderLeft: "4px solid ".concat(theme.palette.action.hover)
      },
      borderLeft: '4px solid transparent'
    }),
    thumbnail: {
      maxWidth: '100%',
      objectFit: 'contain'
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _core.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('ManifestListItem'));
var _default = exports["default"] = enhance(_ManifestListItem.ManifestListItem);