"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.unset = unset;
exports.update = update;
var _set2 = _interopRequireDefault(require("lodash/fp/set"));
var _update2 = _interopRequireDefault(require("lodash/fp/update"));
var _unset2 = _interopRequireDefault(require("lodash/fp/unset"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
* Sets the value at path of object.
* If a portion of `path` doesn't exist, it's created.
*
* @param {Object} object
* @param {String|String[]} path
* @param {any} value
* @return {Object}
*/
function set(object, path, value) {
  return (0, _set2["default"])(path, value, object);
}

/**
* Updates the value at path of object.
* If a portion of `path` doesn't exist, it's created.
* If `value` is a function it should have this signature: (currentValue) => newValue.
* If `value` is an object it is assumed that the current value is also an object
* and the new value will crated by: { ...currentValue, ...value }.
*
* @param {Object} object
* @param {String|String[]} path
* @param {Object|Function} value
* @return {Object}
*/
function update(object, path, value) {
  return typeof value === 'function' ? (0, _update2["default"])(path, value, object) : (0, _update2["default"])(path, function (current) {
    return _objectSpread(_objectSpread({}, current), value);
  }, object);
}

/**
* Removes the property at path of object.
*
* @param {Object} object
* @param {String|String[]} path
* @param {Object}
*/
function unset(object, path) {
  return (0, _unset2["default"])(path, object);
}