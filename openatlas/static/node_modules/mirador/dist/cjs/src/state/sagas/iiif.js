"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = iiifSaga;
exports.fetchAnnotation = fetchAnnotation;
exports.fetchInfoResponse = fetchInfoResponse;
exports.fetchManifest = fetchManifest;
exports.fetchManifests = fetchManifests;
exports.fetchResourceManifest = fetchResourceManifest;
exports.fetchSearchResponse = fetchSearchResponse;
var _effects = require("redux-saga/effects");
var _isomorphicUnfetch = _interopRequireDefault(require("isomorphic-unfetch"));
var _manifesto = require("manifesto.js");
var _normalizeUrl = _interopRequireDefault(require("normalize-url"));
var _actionTypes = _interopRequireDefault(require("../actions/action-types"));
var _actions = require("../actions");
var _selectors = require("../selectors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(getAccessTokenService),
  _marked2 = /*#__PURE__*/_regeneratorRuntime().mark(fetchManifests),
  _marked3 = /*#__PURE__*/_regeneratorRuntime().mark(iiifSaga);
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
/** */
function fetchWrapper(url, options, _ref) {
  var success = _ref.success,
    degraded = _ref.degraded,
    failure = _ref.failure;
  return (0, _isomorphicUnfetch["default"])(url, options).then(function (response) {
    return response.json().then(function (json) {
      if (response.status === 401) return (degraded || success)({
        json: json,
        response: response
      });
      if (response.ok) return success({
        json: json,
        response: response
      });
      return failure({
        error: response.statusText,
        json: json,
        response: response
      });
    })["catch"](function (error) {
      return failure({
        error: error,
        response: response
      });
    });
  })["catch"](function (error) {
    return failure({
      error: error
    });
  });
}

/** */
function fetchIiifResource(url, options, _ref2) {
  var success = _ref2.success,
    degraded = _ref2.degraded,
    failure = _ref2.failure;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _yield$select, _yield$select$preproc, preprocessors, _yield$select$postpro, postprocessors, reqOptions, action;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.select)(_selectors.getRequestsConfig);
        case 2:
          _yield$select = _context.sent;
          _yield$select$preproc = _yield$select.preprocessors;
          preprocessors = _yield$select$preproc === void 0 ? [] : _yield$select$preproc;
          _yield$select$postpro = _yield$select.postprocessors;
          postprocessors = _yield$select$postpro === void 0 ? [] : _yield$select$postpro;
          _context.prev = 7;
          reqOptions = preprocessors.reduce(function (acc, f) {
            return f(url, acc) || acc;
          }, options);
          _context.next = 11;
          return (0, _effects.call)(fetchWrapper, url, reqOptions, {
            degraded: degraded,
            failure: failure,
            success: success
          });
        case 11:
          action = _context.sent;
          action = postprocessors.reduce(function (acc, f) {
            return f(url, acc) || acc;
          }, action);
          return _context.abrupt("return", action);
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](7);
          return _context.abrupt("return", failure({
            error: _context.t0
          }));
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[7, 16]]);
  })();
}

/** */
function fetchIiifResourceWithAuth(url, iiifResource, options, _ref3) {
  var degraded = _ref3.degraded,
    failure = _ref3.failure,
    success = _ref3.success;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var urlOptions, tokenServiceId, tokenService, _yield$call, error, json, response, id, authoritativeTokenService;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          urlOptions = _objectSpread({}, options);
          if (!iiifResource) {
            _context2.next = 7;
            break;
          }
          _context2.next = 4;
          return (0, _effects.call)(getAccessTokenService, iiifResource);
        case 4:
          tokenService = _context2.sent;
          tokenServiceId = tokenService && tokenService.id;
          if (tokenService && tokenService.json) {
            urlOptions.headers = _objectSpread({
              Authorization: "Bearer ".concat(tokenService.json.accessToken)
            }, options.headers);
          }
        case 7:
          _context2.next = 9;
          return (0, _effects.call)(fetchIiifResource, url, urlOptions, {
            failure: function failure(arg) {
              return arg;
            },
            success: function success(arg) {
              return arg;
            }
          });
        case 9:
          _yield$call = _context2.sent;
          error = _yield$call.error;
          json = _yield$call.json;
          response = _yield$call.response;
          if (!error) {
            _context2.next = 17;
            break;
          }
          _context2.next = 16;
          return (0, _effects.put)(failure({
            error: error,
            json: json,
            response: response,
            tokenServiceId: tokenServiceId
          }));
        case 16:
          return _context2.abrupt("return");
        case 17:
          id = json['@id'] || json.id;
          if (!response.ok) {
            _context2.next = 25;
            break;
          }
          if (!((0, _normalizeUrl["default"])(id, {
            stripAuthentication: false
          }) === (0, _normalizeUrl["default"])(url.replace(/info\.json$/, ''), {
            stripAuthentication: false
          }))) {
            _context2.next = 23;
            break;
          }
          _context2.next = 22;
          return (0, _effects.put)(success({
            json: json,
            response: response,
            tokenServiceId: tokenServiceId
          }));
        case 22:
          return _context2.abrupt("return");
        case 23:
          _context2.next = 29;
          break;
        case 25:
          if (!(response.status !== 401)) {
            _context2.next = 29;
            break;
          }
          _context2.next = 28;
          return (0, _effects.put)(failure({
            error: error,
            json: json,
            response: response,
            tokenServiceId: tokenServiceId
          }));
        case 28:
          return _context2.abrupt("return");
        case 29:
          _context2.next = 31;
          return (0, _effects.call)(getAccessTokenService, json);
        case 31:
          authoritativeTokenService = _context2.sent;
          if (!(authoritativeTokenService && authoritativeTokenService.id !== tokenServiceId)) {
            _context2.next = 36;
            break;
          }
          _context2.next = 35;
          return (0, _effects.call)(fetchIiifResourceWithAuth, url, json, options, {
            degraded: degraded,
            failure: failure,
            success: success
          });
        case 35:
          return _context2.abrupt("return");
        case 36:
          _context2.next = 38;
          return (0, _effects.put)((degraded || success)({
            json: json,
            response: response,
            tokenServiceId: tokenServiceId
          }));
        case 38:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })();
}

/** */
function fetchManifest(_ref4) {
  var manifestId = _ref4.manifestId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var callbacks, dispatch;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          callbacks = {
            failure: function failure(_ref5) {
              var error = _ref5.error,
                json = _ref5.json,
                response = _ref5.response;
              return (0, _actions.receiveManifestFailure)(manifestId, typeof error === 'object' ? String(error) : error);
            },
            success: function success(_ref6) {
              var json = _ref6.json,
                response = _ref6.response;
              return (0, _actions.receiveManifest)(manifestId, json);
            }
          };
          _context3.next = 3;
          return (0, _effects.call)(fetchIiifResource, manifestId, {}, callbacks);
        case 3:
          dispatch = _context3.sent;
          _context3.next = 6;
          return (0, _effects.put)(dispatch);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })();
}

/** @private */
function getAccessTokenService(resource) {
  var manifestoCompatibleResource, services, accessTokens, i, authService, accessTokenService, token;
  return _regeneratorRuntime().wrap(function getAccessTokenService$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        manifestoCompatibleResource = resource && resource.__jsonld ? resource : _objectSpread(_objectSpread({}, resource), {}, {
          options: {}
        });
        services = _manifesto.Utils.getServices(manifestoCompatibleResource).filter(function (s) {
          return s.getProfile().match(/http:\/\/iiif.io\/api\/auth\//);
        });
        if (!(services.length === 0)) {
          _context4.next = 4;
          break;
        }
        return _context4.abrupt("return", undefined);
      case 4:
        _context4.next = 6;
        return (0, _effects.select)(_selectors.getAccessTokens);
      case 6:
        accessTokens = _context4.sent;
        if (accessTokens) {
          _context4.next = 9;
          break;
        }
        return _context4.abrupt("return", undefined);
      case 9:
        i = 0;
      case 10:
        if (!(i < services.length)) {
          _context4.next = 19;
          break;
        }
        authService = services[i];
        accessTokenService = _manifesto.Utils.getService(authService, 'http://iiif.io/api/auth/1/token') || _manifesto.Utils.getService(authService, 'http://iiif.io/api/auth/0/token');
        token = accessTokenService && accessTokens[accessTokenService.id];
        if (!(token && token.json)) {
          _context4.next = 16;
          break;
        }
        return _context4.abrupt("return", token);
      case 16:
        i += 1;
        _context4.next = 10;
        break;
      case 19:
        return _context4.abrupt("return", undefined);
      case 20:
      case "end":
        return _context4.stop();
    }
  }, _marked);
}

/** @private */
function fetchInfoResponse(_ref7) {
  var imageResource = _ref7.imageResource,
    infoId = _ref7.infoId,
    windowId = _ref7.windowId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var iiifResource, callbacks;
    return _regeneratorRuntime().wrap(function _callee4$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          iiifResource = imageResource;
          if (iiifResource) {
            _context5.next = 5;
            break;
          }
          _context5.next = 4;
          return (0, _effects.select)(_selectors.selectInfoResponse, {
            infoId: infoId
          });
        case 4:
          iiifResource = _context5.sent;
        case 5:
          callbacks = {
            degraded: function degraded(_ref8) {
              var json = _ref8.json,
                response = _ref8.response,
                tokenServiceId = _ref8.tokenServiceId;
              return (0, _actions.receiveDegradedInfoResponse)(infoId, json, response.ok, tokenServiceId, windowId);
            },
            failure: function failure(_ref9) {
              var error = _ref9.error,
                json = _ref9.json,
                response = _ref9.response,
                tokenServiceId = _ref9.tokenServiceId;
              return (0, _actions.receiveInfoResponseFailure)(infoId, error, tokenServiceId);
            },
            success: function success(_ref10) {
              var json = _ref10.json,
                response = _ref10.response,
                tokenServiceId = _ref10.tokenServiceId;
              return (0, _actions.receiveInfoResponse)(infoId, json, response.ok, tokenServiceId);
            }
          };
          _context5.next = 8;
          return (0, _effects.call)(fetchIiifResourceWithAuth, "".concat(infoId.replace(/\/$/, ''), "/info.json"), iiifResource, {}, callbacks);
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee4);
  })();
}

/** @private */
function fetchSearchResponse(_ref11) {
  var windowId = _ref11.windowId,
    companionWindowId = _ref11.companionWindowId,
    query = _ref11.query,
    searchId = _ref11.searchId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var callbacks, dispatch;
    return _regeneratorRuntime().wrap(function _callee5$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          callbacks = {
            failure: function failure(_ref12) {
              var error = _ref12.error,
                json = _ref12.json,
                response = _ref12.response;
              return (0, _actions.receiveSearchFailure)(windowId, companionWindowId, searchId, error);
            },
            success: function success(_ref13) {
              var json = _ref13.json,
                response = _ref13.response;
              return (0, _actions.receiveSearch)(windowId, companionWindowId, searchId, json);
            }
          };
          _context6.next = 3;
          return (0, _effects.call)(fetchIiifResource, searchId, {}, callbacks);
        case 3:
          dispatch = _context6.sent;
          _context6.next = 6;
          return (0, _effects.put)(dispatch);
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee5);
  })();
}

/** @private */
function fetchAnnotation(_ref14) {
  var targetId = _ref14.targetId,
    annotationId = _ref14.annotationId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var callbacks, dispatch;
    return _regeneratorRuntime().wrap(function _callee6$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          callbacks = {
            failure: function failure(_ref15) {
              var error = _ref15.error,
                json = _ref15.json,
                response = _ref15.response;
              return (0, _actions.receiveAnnotationFailure)(targetId, annotationId, error);
            },
            success: function success(_ref16) {
              var json = _ref16.json,
                response = _ref16.response;
              return (0, _actions.receiveAnnotation)(targetId, annotationId, json);
            }
          };
          _context7.next = 3;
          return (0, _effects.call)(fetchIiifResource, annotationId, {}, callbacks);
        case 3:
          dispatch = _context7.sent;
          _context7.next = 6;
          return (0, _effects.put)(dispatch);
        case 6:
        case "end":
          return _context7.stop();
      }
    }, _callee6);
  })();
}

/** */
function fetchResourceManifest(_ref17) {
  var manifestId = _ref17.manifestId,
    manifestJson = _ref17.manifestJson;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var manifests;
    return _regeneratorRuntime().wrap(function _callee7$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (!manifestJson) {
            _context8.next = 4;
            break;
          }
          _context8.next = 3;
          return (0, _effects.put)((0, _actions.receiveManifest)(manifestId, manifestJson));
        case 3:
          return _context8.abrupt("return");
        case 4:
          if (manifestId) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return");
        case 6:
          _context8.next = 8;
          return (0, _effects.select)(_selectors.getManifests) || {};
        case 8:
          manifests = _context8.sent;
          if (manifests[manifestId]) {
            _context8.next = 11;
            break;
          }
          return _context8.delegateYield(fetchManifest({
            manifestId: manifestId
          }), "t0", 11);
        case 11:
        case "end":
          return _context8.stop();
      }
    }, _callee7);
  })();
}

/** */
function fetchManifests() {
  var manifests,
    i,
    manifestId,
    _args9 = arguments;
  return _regeneratorRuntime().wrap(function fetchManifests$(_context9) {
    while (1) switch (_context9.prev = _context9.next) {
      case 0:
        _context9.next = 2;
        return (0, _effects.select)(_selectors.getManifests);
      case 2:
        manifests = _context9.sent;
        i = 0;
      case 4:
        if (!(i < _args9.length)) {
          _context9.next = 12;
          break;
        }
        manifestId = i < 0 || _args9.length <= i ? undefined : _args9[i];
        if (manifests[manifestId]) {
          _context9.next = 9;
          break;
        }
        _context9.next = 9;
        return (0, _effects.call)(fetchManifest, {
          manifestId: manifestId
        });
      case 9:
        i += 1;
        _context9.next = 4;
        break;
      case 12:
      case "end":
        return _context9.stop();
    }
  }, _marked2);
}

/** */
function iiifSaga() {
  return _regeneratorRuntime().wrap(function iiifSaga$(_context10) {
    while (1) switch (_context10.prev = _context10.next) {
      case 0:
        _context10.next = 2;
        return (0, _effects.all)([(0, _effects.takeEvery)(_actionTypes["default"].REQUEST_MANIFEST, fetchManifest), (0, _effects.takeEvery)(_actionTypes["default"].REQUEST_INFO_RESPONSE, fetchInfoResponse), (0, _effects.takeEvery)(_actionTypes["default"].REQUEST_SEARCH, fetchSearchResponse), (0, _effects.takeEvery)(_actionTypes["default"].REQUEST_ANNOTATION, fetchAnnotation), (0, _effects.takeEvery)(_actionTypes["default"].ADD_RESOURCE, fetchResourceManifest)]);
      case 2:
      case "end":
        return _context10.stop();
    }
  }, _marked3);
}