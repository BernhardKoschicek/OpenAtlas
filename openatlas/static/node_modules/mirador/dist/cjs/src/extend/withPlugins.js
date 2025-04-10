"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withPlugins = void 0;
var _react = _interopRequireWildcard(require("react"));
var _curry = _interopRequireDefault(require("lodash/curry"));
var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));
var _PluginContext = _interopRequireDefault(require("./PluginContext"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** withPlugins should be the innermost HOC */
function _withPlugins(targetName, TargetComponent) {
  // eslint-disable-line no-underscore-dangle
  /** */
  function PluginHoc(props, ref) {
    var pluginMap = (0, _react.useContext)(_PluginContext["default"]);
    var passDownProps = _objectSpread(_objectSpread({}, props), ref ? {
      ref: ref
    } : {});
    var plugins = (pluginMap || {})[targetName];
    if ((0, _isEmpty["default"])(plugins) || (0, _isEmpty["default"])(plugins.wrap) && (0, _isEmpty["default"])(plugins.add)) {
      return /*#__PURE__*/_react["default"].createElement(TargetComponent, passDownProps);
    }
    var PluginComponents = (plugins.add || []).map(function (plugin) {
      return plugin.component;
    });
    var targetComponent = /*#__PURE__*/_react["default"].createElement(TargetComponent, Object.assign({}, passDownProps, {
      PluginComponents: PluginComponents
    }));
    if ((0, _isEmpty["default"])(plugins.wrap)) return targetComponent;

    /** */
    var pluginWrapper = function pluginWrapper(children, plugin) {
      var WrapPluginComponent = plugin.component;
      return /*#__PURE__*/_react["default"].createElement(WrapPluginComponent, Object.assign({
        targetProps: passDownProps
      }, passDownProps, {
        PluginComponents: PluginComponents,
        TargetComponent: TargetComponent
      }), children);
    };
    return plugins.wrap.slice().reverse().reduce(pluginWrapper, /*#__PURE__*/_react["default"].createElement(TargetComponent, passDownProps));
  }
  var whatever = /*#__PURE__*/_react["default"].forwardRef(PluginHoc);
  whatever.displayName = "WithPlugins(".concat(targetName, ")");
  return whatever;
}

/** withPlugins('MyComponent')(MyComponent) */
var withPlugins = exports.withPlugins = (0, _curry["default"])(_withPlugins);