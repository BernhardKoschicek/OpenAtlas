"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCurrentAuthServices = exports.getAuthProfiles = exports.getAuth = exports.getAccessTokens = void 0;
var _reselect = require("reselect");
var _manifesto = require("manifesto.js");
var _flatten = _interopRequireDefault(require("lodash/flatten"));
var _MiradorCanvas = _interopRequireDefault(require("../../lib/MiradorCanvas"));
var _utils = require("./utils");
var _config = require("./config");
var _canvases = require("./canvases");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var getAuthProfiles = exports.getAuthProfiles = (0, _reselect.createSelector)([_config.getConfig], function (_ref) {
  var _ref$auth = _ref.auth,
    _ref$auth2 = _ref$auth === void 0 ? {} : _ref$auth,
    _ref$auth2$servicePro = _ref$auth2.serviceProfiles,
    serviceProfiles = _ref$auth2$servicePro === void 0 ? [] : _ref$auth2$servicePro;
  return serviceProfiles;
});

/** */
var getAccessTokens = exports.getAccessTokens = function getAccessTokens(state) {
  return (0, _utils.miradorSlice)(state).accessTokens || {};
};

/** */
var getAuth = exports.getAuth = function getAuth(state) {
  return (0, _utils.miradorSlice)(state).auth || {};
};
var selectCurrentAuthServices = exports.selectCurrentAuthServices = (0, _reselect.createSelector)([_canvases.getVisibleCanvases, _canvases.selectInfoResponses, getAuthProfiles, getAuth, function (state, _ref2) {
  var iiifResources = _ref2.iiifResources;
  return iiifResources;
}], function (canvases) {
  var infoResponses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var serviceProfiles = arguments.length > 2 ? arguments[2] : undefined;
  var auth = arguments.length > 3 ? arguments[3] : undefined;
  var iiifResources = arguments.length > 4 ? arguments[4] : undefined;
  var currentAuthResources = iiifResources;
  if (!currentAuthResources && canvases) {
    currentAuthResources = (0, _flatten["default"])(canvases.map(function (c) {
      var miradorCanvas = new _MiradorCanvas["default"](c);
      var images = miradorCanvas.iiifImageResources;
      return images.map(function (i) {
        var iiifImageService = i.getServices()[0];
        var infoResponse = infoResponses[iiifImageService.id];
        if (infoResponse && infoResponse.json) {
          return _objectSpread(_objectSpread({}, infoResponse.json), {}, {
            options: {}
          });
        }
        return iiifImageService;
      });
    }));
  }
  if (!currentAuthResources) return [];
  if (currentAuthResources.length === 0) return [];
  var currentAuthServices = currentAuthResources.map(function (resource) {
    var lastAttemptedService;
    var services = _manifesto.Utils.getServices(resource);
    var _iterator = _createForOfIteratorHelper(serviceProfiles),
      _step;
    try {
      var _loop = function _loop() {
          var authProfile = _step.value;
          var profiledAuthServices = services.filter(function (p) {
            return authProfile.profile === p.getProfile();
          });
          var _iterator2 = _createForOfIteratorHelper(profiledAuthServices),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var service = _step2.value;
              lastAttemptedService = service;
              if (!auth[service.id] || auth[service.id].isFetching || auth[service.id].ok) {
                return {
                  v: service
                };
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        },
        _ret;
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _ret = _loop();
        if (_ret) return _ret.v;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return lastAttemptedService;
  });
  return Object.values(currentAuthServices.reduce(function (h, service) {
    if (service && !h[service.id]) {
      h[service.id] = service; // eslint-disable-line no-param-reassign
    }
    return h;
  }, {}));
});