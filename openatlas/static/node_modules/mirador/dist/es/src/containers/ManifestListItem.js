function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { getManifest, getManifestTitle, getManifestThumbnail, getCanvases, getManifestLogo, getManifestProvider, getWindowManifests, getManifestoInstance, getSequenceBehaviors } from '../state/selectors';
import * as actions from '../state/actions';
import { ManifestListItem } from '../components/ManifestListItem';

/** */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var manifestId = _ref.manifestId,
    provider = _ref.provider;
  var manifest = getManifest(state, {
    manifestId: manifestId
  }) || {};
  var manifesto = getManifestoInstance(state, {
    manifestId: manifestId
  });
  var isCollection = (manifesto || {
    isCollection: function isCollection() {
      return false;
    }
  }).isCollection();
  var size = isCollection ? manifesto.getTotalItems() : getCanvases(state, {
    manifestId: manifestId
  }).length;
  return {
    active: getWindowManifests(state).includes(manifestId),
    error: manifest.error,
    isCollection: isCollection,
    isFetching: manifest.isFetching,
    isMultipart: isCollection && getSequenceBehaviors(state, {
      manifestId: manifestId
    }).includes('multi-part'),
    manifestLogo: getManifestLogo(state, {
      manifestId: manifestId
    }),
    provider: provider || getManifestProvider(state, {
      manifestId: manifestId
    }),
    ready: !!manifest.json,
    size: size,
    thumbnail: getManifestThumbnail(state, {
      manifestId: manifestId
    }),
    title: getManifestTitle(state, {
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
var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps), withPlugins('ManifestListItem'));
export default enhance(ManifestListItem);