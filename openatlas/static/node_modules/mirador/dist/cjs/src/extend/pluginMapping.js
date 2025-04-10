"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPluginsToCompanionWindowsRegistry = addPluginsToCompanionWindowsRegistry;
exports.connectPluginsToStore = connectPluginsToStore;
exports.createTargetToPluginMapping = createTargetToPluginMapping;
var _update = _interopRequireDefault(require("lodash/update"));
var _reactRedux = require("react-redux");
var _CompanionWindowRegistry = _interopRequireDefault(require("../lib/CompanionWindowRegistry"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
/**
 * Returns a mapping from targets to plugins and modes
 *
 * @param {Array} plugins
 * @return {Object} - looks like:
 *
 *  {
 *    'WorkspacePanel': {
 *      wrap:     [plugin3, ...],
 *      add:      [plugin4, ...],
 *    },
 *    ...
 *  }
 */
function createTargetToPluginMapping(plugins) {
  return plugins.reduce(function (map, plugin) {
    return (0, _update["default"])(map, [plugin.target, plugin.mode], function (x) {
      return [].concat(_toConsumableArray(x || []), [plugin]);
    });
  }, {});
}

/** */
function connectPluginsToStore(plugins) {
  return plugins.map(function (plugin) {
    return _objectSpread(_objectSpread({}, plugin), {}, {
      component: connectPluginComponent(plugin)
    });
  });
}

/** */
function addPluginsToCompanionWindowsRegistry(plugins) {
  plugins.filter(function (p) {
    return p.companionWindowKey;
  }).forEach(function (plugin) {
    _CompanionWindowRegistry["default"][plugin.companionWindowKey] = plugin.component;
  });
  return _CompanionWindowRegistry["default"];
}

/** Connect plugin component to state */
function connectPluginComponent(plugin) {
  if (!plugin.mapStateToProps && !plugin.mapDispatchToProps) return plugin.component;
  return _reactRedux.connect.apply(void 0, [plugin.mapStateToProps, plugin.mapDispatchToProps].concat(_toConsumableArray(plugin.connectOptions || [])))(plugin.component);
}