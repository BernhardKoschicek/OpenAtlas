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
import * as actions from '../state/actions';
import { WorkspaceAdd } from '../components/WorkspaceAdd';
import { getCatalog } from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
var mapStateToProps = function mapStateToProps(state) {
  return {
    catalog: getCatalog(state)
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
var mapDispatchToProps = {
  addResource: actions.addResource,
  setWorkspaceAddVisibility: actions.setWorkspaceAddVisibility
};

/**
 *
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: string},
 * form: {paddingBottom: number, paddingTop: number, marginTop: number},
 * fab: {bottom: number, position: string, right: number},
 * menuButton: {marginRight: number, marginLeft: number}}}
 */
var styles = function styles(theme) {
  return {
    displayNone: {
      display: 'none'
    },
    fab: {
      bottom: theme.spacing(2),
      position: 'absolute',
      right: theme.spacing(2)
    },
    form: _objectSpread(_objectSpread({}, theme.mixins.gutters()), {}, {
      left: '0',
      marginTop: 48,
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
      right: '0'
    }),
    list: {
      margin: '16px'
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    paper: _defineProperty({
      borderTop: '0',
      left: '0'
    }, theme.breakpoints.up('sm'), {
      left: '65px'
    }),
    typographyBody: {
      flexGrow: 1
    },
    workspaceAdd: {
      boxSizing: 'border-box',
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',
      paddingTop: 68
    },
    // injection order matters
    // eslint-disable-next-line sort-keys
    '@media (min-width: 600px)': {
      workspaceAdd: {
        paddingLeft: 68,
        paddingTop: 0
      }
    }
  };
};
var enhance = compose(withTranslation(), withStyles(styles), connect(mapStateToProps, mapDispatchToProps), withPlugins('WorkspaceAdd'));
export default enhance(WorkspaceAdd);