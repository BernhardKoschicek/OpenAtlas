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
import { getManifestStatus, getManifestTitle, getWindowConfig } from '../state/selectors';
import { WindowTopBarTitle } from '../components/WindowTopBarTitle';

/** mapStateToProps */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    error: getManifestStatus(state, {
      windowId: windowId
    }).error,
    hideWindowTitle: getWindowConfig(state, {
      windowId: windowId
    }).hideWindowTitle,
    isFetching: getManifestStatus(state, {
      windowId: windowId
    }).isFetching,
    manifestTitle: getManifestTitle(state, {
      windowId: windowId
    })
  };
};

/**
 * @param theme
 */
var styles = function styles(theme) {
  return {
    title: _objectSpread(_objectSpread({}, theme.typography.h6), {}, {
      flexGrow: 1,
      paddingLeft: theme.spacing(0.5)
    })
  };
};
var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, null), withPlugins('WindowTopBarTitle'));
export default enhance(WindowTopBarTitle);