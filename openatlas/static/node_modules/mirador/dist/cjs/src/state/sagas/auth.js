"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = authSaga;
exports.doAuthWorkflow = doAuthWorkflow;
exports.invalidateInvalidAuth = invalidateInvalidAuth;
exports.refetchInfoResponses = refetchInfoResponses;
exports.refetchInfoResponsesOnLogout = refetchInfoResponsesOnLogout;
exports.rerequestOnAccessTokenFailure = rerequestOnAccessTokenFailure;
var _effects = require("redux-saga/effects");
var _manifesto = require("manifesto.js");
var _flatten = _interopRequireDefault(require("lodash/flatten"));
var _actionTypes = _interopRequireDefault(require("../actions/action-types"));
var _MiradorCanvas = _interopRequireDefault(require("../../lib/MiradorCanvas"));
var _actions = require("../actions");
var _selectors = require("../selectors");
var _iiif = require("./iiif");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(authSaga);
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
/** */
function refetchInfoResponsesOnLogout(_ref) {
  var tokenServiceId = _ref.tokenServiceId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.delay)(2000);
        case 2:
          _context.next = 4;
          return (0, _effects.call)(refetchInfoResponses, {
            serviceId: tokenServiceId
          });
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })();
}

/**
 * Figure out what info responses could have used the access token service and:
 *   - refetch, if they are currently visible
 *   - throw them out (and lazy re-fetch) otherwise
 */
function refetchInfoResponses(_ref2) {
  var serviceId = _ref2.serviceId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var windows, canvases, visibleImageApiIds, infoResponses, haveThisTokenService, obsoleteInfoResponses;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.select)(_selectors.getWindows);
        case 2:
          windows = _context2.sent;
          _context2.next = 5;
          return (0, _effects.all)(Object.keys(windows).map(function (windowId) {
            return (0, _effects.select)(_selectors.getVisibleCanvases, {
              windowId: windowId
            });
          }));
        case 5:
          canvases = _context2.sent;
          visibleImageApiIds = (0, _flatten["default"])((0, _flatten["default"])(canvases).map(function (canvas) {
            var miradorCanvas = new _MiradorCanvas["default"](canvas);
            return miradorCanvas.imageServiceIds;
          }));
          _context2.next = 9;
          return (0, _effects.select)(_selectors.selectInfoResponses);
        case 9:
          infoResponses = _context2.sent;
          /** */
          haveThisTokenService = function haveThisTokenService(infoResponse) {
            var services = _manifesto.Utils.getServices(infoResponse);
            return services.some(function (e) {
              var infoTokenService = _manifesto.Utils.getService(e, 'http://iiif.io/api/auth/1/token') || _manifesto.Utils.getService(e, 'http://iiif.io/api/auth/0/token');
              return infoTokenService && infoTokenService.id === serviceId;
            });
          };
          obsoleteInfoResponses = Object.values(infoResponses).filter(function (i) {
            return i.json && haveThisTokenService(i.json);
          });
          _context2.next = 14;
          return (0, _effects.all)(obsoleteInfoResponses.map(function (_ref3) {
            var infoId = _ref3.id;
            if (visibleImageApiIds.includes(infoId)) {
              return (0, _effects.call)(_iiif.fetchInfoResponse, {
                infoId: infoId
              });
            }
            return (0, _effects.put)({
              infoId: infoId,
              type: _actionTypes["default"].REMOVE_INFO_RESPONSE
            });
          }));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })();
}

/** try to start any non-interactive auth flows */
function doAuthWorkflow(_ref4) {
  var infoJson = _ref4.infoJson,
    windowId = _ref4.windowId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var auths, _yield$select, _yield$select$auth, _yield$select$auth2, _yield$select$auth2$s, serviceProfiles, nonInteractiveAuthFlowProfiles, authService, profileConfig, tokenService;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.select)(_selectors.getAuth);
        case 2:
          auths = _context3.sent;
          _context3.next = 5;
          return (0, _effects.select)(_selectors.getConfig);
        case 5:
          _yield$select = _context3.sent;
          _yield$select$auth = _yield$select.auth;
          _yield$select$auth2 = _yield$select$auth === void 0 ? {} : _yield$select$auth;
          _yield$select$auth2$s = _yield$select$auth2.serviceProfiles;
          serviceProfiles = _yield$select$auth2$s === void 0 ? [] : _yield$select$auth2$s;
          nonInteractiveAuthFlowProfiles = serviceProfiles.filter(function (p) {
            return p.external || p.kiosk;
          }); // try to get an untried, non-interactive auth service
          authService = _manifesto.Utils.getServices(infoJson).filter(function (s) {
            return !auths[s.id];
          }).find(function (e) {
            return nonInteractiveAuthFlowProfiles.some(function (p) {
              return p.profile === e.getProfile();
            });
          });
          if (authService) {
            _context3.next = 14;
            break;
          }
          return _context3.abrupt("return");
        case 14:
          profileConfig = nonInteractiveAuthFlowProfiles.find(function (p) {
            return p.profile === authService.getProfile();
          });
          if (!profileConfig.kiosk) {
            _context3.next = 20;
            break;
          }
          _context3.next = 18;
          return (0, _effects.put)((0, _actions.addAuthenticationRequest)(windowId, authService.id, authService.getProfile()));
        case 18:
          _context3.next = 28;
          break;
        case 20:
          if (!profileConfig.external) {
            _context3.next = 28;
            break;
          }
          tokenService = _manifesto.Utils.getService(authService, 'http://iiif.io/api/auth/1/token') || _manifesto.Utils.getService(authService, 'http://iiif.io/api/auth/0/token');
          if (tokenService) {
            _context3.next = 24;
            break;
          }
          return _context3.abrupt("return");
        case 24:
          _context3.next = 26;
          return (0, _effects.put)((0, _actions.resolveAuthenticationRequest)(authService.id, tokenService.id));
        case 26:
          _context3.next = 28;
          return (0, _effects.put)((0, _actions.requestAccessToken)(tokenService.id, authService.id));
        case 28:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })();
}

/** */
function rerequestOnAccessTokenFailure(_ref5) {
  var infoJson = _ref5.infoJson,
    windowId = _ref5.windowId,
    tokenServiceId = _ref5.tokenServiceId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var authService, accessTokenServices, service;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (tokenServiceId) {
            _context4.next = 2;
            break;
          }
          return _context4.abrupt("return");
        case 2:
          // make sure we have an auth service to try
          authService = _manifesto.Utils.getServices(infoJson).find(function (service) {
            var tokenService = _manifesto.Utils.getService(service, 'http://iiif.io/api/auth/1/token') || _manifesto.Utils.getService(service, 'http://iiif.io/api/auth/0/token');
            return tokenService && tokenService.id === tokenServiceId;
          });
          if (authService) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return");
        case 5:
          _context4.next = 7;
          return (0, _effects.select)(_selectors.getAccessTokens);
        case 7:
          accessTokenServices = _context4.sent;
          service = accessTokenServices[tokenServiceId];
          if (service && service.success) {
            _context4.next = 11;
            break;
          }
          return _context4.abrupt("return");
        case 11:
          _context4.next = 13;
          return (0, _effects.put)((0, _actions.requestAccessToken)(tokenServiceId, authService.id));
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })();
}

/** */
function invalidateInvalidAuth(_ref6) {
  var serviceId = _ref6.serviceId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var accessTokenServices, authServices, accessTokenService, authService;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _effects.select)(_selectors.getAccessTokens);
        case 2:
          accessTokenServices = _context5.sent;
          _context5.next = 5;
          return (0, _effects.select)(_selectors.getAuth);
        case 5:
          authServices = _context5.sent;
          accessTokenService = accessTokenServices[serviceId];
          if (accessTokenService) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return");
        case 9:
          authService = authServices[accessTokenService.authId];
          if (authService) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return");
        case 12:
          if (!accessTokenService.success) {
            _context5.next = 17;
            break;
          }
          _context5.next = 15;
          return (0, _effects.put)((0, _actions.resetAuthenticationState)({
            authServiceId: authService.id,
            tokenServiceId: accessTokenService.id
          }));
        case 15:
          _context5.next = 19;
          break;
        case 17:
          _context5.next = 19;
          return (0, _effects.put)((0, _actions.resolveAuthenticationRequest)(authService.id, accessTokenService.id, {
            ok: false
          }));
        case 19:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  })();
}

/** */
function authSaga() {
  return _regeneratorRuntime().wrap(function authSaga$(_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        _context6.next = 2;
        return (0, _effects.all)([(0, _effects.takeEvery)(_actionTypes["default"].RECEIVE_DEGRADED_INFO_RESPONSE, rerequestOnAccessTokenFailure), (0, _effects.takeEvery)(_actionTypes["default"].RECEIVE_ACCESS_TOKEN_FAILURE, invalidateInvalidAuth), (0, _effects.takeEvery)(_actionTypes["default"].RECEIVE_DEGRADED_INFO_RESPONSE, doAuthWorkflow), (0, _effects.takeEvery)(_actionTypes["default"].RECEIVE_ACCESS_TOKEN, refetchInfoResponses), (0, _effects.takeEvery)(_actionTypes["default"].RESET_AUTHENTICATION_STATE, refetchInfoResponsesOnLogout)]);
      case 2:
      case "end":
        return _context6.stop();
    }
  }, _marked);
}