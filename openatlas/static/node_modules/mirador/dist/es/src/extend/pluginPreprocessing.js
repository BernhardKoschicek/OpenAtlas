function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
import deepmerge from 'deepmerge';
import { validatePlugin } from './pluginValidation';

/** */
export function filterValidPlugins(plugins) {
  var _splitPluginsByValida = splitPluginsByValidation(plugins),
    validPlugins = _splitPluginsByValida.validPlugins,
    invalidPlugins = _splitPluginsByValida.invalidPlugins;
  logInvalidPlugins(invalidPlugins);
  return validPlugins;
}

/** */
function splitPluginsByValidation(plugins) {
  var invalidPlugins = [];
  var validPlugins = [];
  plugins.forEach(function (plugin) {
    if (Array.isArray(plugin)) {
      var allValid = plugin.every(function (p) {
        return validatePlugin(p);
      });
      allValid ? validPlugins.push.apply(validPlugins, _toConsumableArray(plugin)) : invalidPlugins.push.apply(invalidPlugins, _toConsumableArray(plugin));
    } else {
      validatePlugin(plugin) ? validPlugins.push(plugin) : invalidPlugins.push(plugin);
    }
  });
  return {
    invalidPlugins: invalidPlugins,
    validPlugins: validPlugins
  };
}

/** */
function logInvalidPlugins(plugins) {
  plugins.forEach(function (plugin) {
    return console.log("Mirador: Plugin ".concat(plugin.name, " is not valid and was rejected."));
  });
}

/**  */
export function getReducersFromPlugins(plugins) {
  return plugins && plugins.reduce(function (acc, plugin) {
    return _objectSpread(_objectSpread({}, acc), plugin.reducers);
  }, {});
}

/**  */
export function getConfigFromPlugins(plugins) {
  return plugins && plugins.reduce(function (acc, plugin) {
    return deepmerge(acc, plugin.config || {});
  }, {});
}

/**  */
export function getSagasFromPlugins(plugins) {
  return plugins && plugins.filter(function (plugin) {
    return plugin.saga;
  }).map(function (plugin) {
    return plugin.saga;
  });
}