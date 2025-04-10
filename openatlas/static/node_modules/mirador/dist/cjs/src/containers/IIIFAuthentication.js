"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _reactI18next = require("react-i18next");
var _manifesto = require("manifesto.js");
var _withPlugins = require("../extend/withPlugins");
var actions = _interopRequireWildcard(require("../state/actions"));
var _selectors = require("../state/selectors");
var _IIIFAuthentication = require("../components/IIIFAuthentication");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapStateToProps - to hook up connect
 * @memberof FullScreenButton
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  var services = (0, _selectors.selectCurrentAuthServices)(state, {
    windowId: windowId
  });

  // TODO: get the most actionable auth service...
  var service = services[0];
  var accessTokenService = service && (_manifesto.Utils.getService(service, 'http://iiif.io/api/auth/1/token') || _manifesto.Utils.getService(service, 'http://iiif.io/api/auth/0/token'));
  var logoutService = service && (_manifesto.Utils.getService(service, 'http://iiif.io/api/auth/1/logout') || _manifesto.Utils.getService(service, 'http://iiif.io/api/auth/0/logout'));
  var authStatuses = (0, _selectors.getAuth)(state);
  var authStatus = service && authStatuses[service.id];
  var accessTokens = (0, _selectors.getAccessTokens)(state);
  var accessTokenStatus = accessTokenService && accessTokens[accessTokenService.id];
  var status = null;
  if (!authStatus) {
    status = null;
  } else if (authStatus.isFetching) {
    if (authStatus.windowId === windowId) status = 'cookie';
  } else if (accessTokenStatus && accessTokenStatus.isFetching) {
    if (authStatus.windowId === windowId) status = 'token';
  } else if (authStatus.ok) {
    status = 'ok';
  } else if (authStatus.ok === false) {
    status = 'failed';
  }
  var authProfiles = (0, _selectors.getAuthProfiles)(state);
  var profile = service && service.getProfile();
  var isInteractive = authProfiles.some(function (config) {
    return config.profile === profile && !(config.external || config.kiosk);
  });
  return {
    accessTokenServiceId: accessTokenService && accessTokenService.id,
    authServiceId: service && service.id,
    confirm: service && service.getConfirmLabel(),
    description: service && service.getDescription(),
    failureDescription: service && service.getFailureDescription(),
    failureHeader: service && service.getFailureHeader(),
    header: service && service.getHeader(),
    isInteractive: isInteractive,
    label: service && service.getLabel()[0].value,
    logoutConfirm: logoutService && logoutService.getLabel()[0] && logoutService.getLabel()[0].value,
    logoutServiceId: logoutService && logoutService.id,
    profile: profile,
    status: status
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
var mapDispatchToProps = {
  handleAuthInteraction: actions.addAuthenticationRequest,
  resetAuthenticationState: actions.resetAuthenticationState,
  resolveAccessTokenRequest: actions.resolveAccessTokenRequest,
  resolveAuthenticationRequest: actions.resolveAuthenticationRequest
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('IIIFAuthentication'));
var _default = exports["default"] = enhance(_IIIFAuthentication.IIIFAuthentication);