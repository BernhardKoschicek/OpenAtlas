function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { combineReducers } from 'redux';
import { accessTokensReducer, authReducer, companionWindowsReducer, configReducer, elasticLayoutReducer, errorsReducer, infoResponsesReducer, manifestsReducer, viewersReducer, windowsReducer, workspaceReducer, annotationsReducer, searchesReducer, layersReducer, catalogReducer } from '.';

/**
 * Function to create root reducer
 * from plugin reducers.
 * @namespace CreateRootReducer
 */
export default function createRootReducer(pluginReducers) {
  return combineReducers(_objectSpread({
    accessTokens: accessTokensReducer,
    annotations: annotationsReducer,
    auth: authReducer,
    catalog: catalogReducer,
    companionWindows: companionWindowsReducer,
    config: configReducer,
    elasticLayout: elasticLayoutReducer,
    errors: errorsReducer,
    infoResponses: infoResponsesReducer,
    layers: layersReducer,
    manifests: manifestsReducer,
    searches: searchesReducer,
    viewers: viewersReducer,
    windows: windowsReducer,
    workspace: workspaceReducer
  }, pluginReducers));
}