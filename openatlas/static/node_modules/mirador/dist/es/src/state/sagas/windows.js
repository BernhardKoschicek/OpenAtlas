function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(fetchWindowManifest),
  _marked2 = /*#__PURE__*/_regeneratorRuntime().mark(setCanvasOnNewSequence),
  _marked3 = /*#__PURE__*/_regeneratorRuntime().mark(fetchCollectionManifests),
  _marked4 = /*#__PURE__*/_regeneratorRuntime().mark(setWindowStartingCanvas),
  _marked5 = /*#__PURE__*/_regeneratorRuntime().mark(setWindowDefaultSearchQuery),
  _marked6 = /*#__PURE__*/_regeneratorRuntime().mark(determineAndShowCollectionDialog),
  _marked7 = /*#__PURE__*/_regeneratorRuntime().mark(windowsSaga);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import ActionTypes from '../actions/action-types';
import MiradorManifest from '../../lib/MiradorManifest';
import MiradorCanvas from '../../lib/MiradorCanvas';
import { setContentSearchCurrentAnnotation, selectAnnotation, setWorkspaceViewportPosition, updateWindow, setCanvas, fetchSearch, receiveManifest, fetchInfoResponse, showCollectionDialog } from '../actions';
import { getSearchForWindow, getSearchAnnotationsForCompanionWindow, getCanvasGrouping, getWindow, getManifestoInstance, getCompanionWindowIdsForPosition, getManifestSearchService, getCanvasForAnnotation, getSelectedContentSearchAnnotationIds, getSortedSearchAnnotationsForCompanionWindow, getVisibleCanvasIds, getWorkspace, getElasticLayout, getCanvases, selectInfoResponses, getWindowConfig } from '../selectors';
import { fetchManifests } from './iiif';

/** */
export function fetchWindowManifest(action) {
  var _ref, collectionPath, id, manifestId;
  return _regeneratorRuntime().wrap(function fetchWindowManifest$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _ref = action.payload || action.window, collectionPath = _ref.collectionPath, id = _ref.id, manifestId = _ref.manifestId;
        if (manifestId) {
          _context.next = 3;
          break;
        }
        return _context.abrupt("return");
      case 3:
        if (!action.manifest) {
          _context.next = 8;
          break;
        }
        _context.next = 6;
        return put(receiveManifest(manifestId, action.manifest));
      case 6:
        _context.next = 10;
        break;
      case 8:
        _context.next = 10;
        return call.apply(void 0, [fetchManifests, manifestId].concat(_toConsumableArray(collectionPath || [])));
      case 10:
        _context.next = 12;
        return call(setWindowStartingCanvas, action);
      case 12:
        _context.next = 14;
        return call(setWindowDefaultSearchQuery, action);
      case 14:
        if (collectionPath) {
          _context.next = 17;
          break;
        }
        _context.next = 17;
        return call(setCollectionPath, {
          manifestId: manifestId,
          windowId: action.id || action.window.id
        });
      case 17:
        _context.next = 19;
        return call(determineAndShowCollectionDialog, manifestId, id);
      case 19:
      case "end":
        return _context.stop();
    }
  }, _marked);
}

/** */
export function setCanvasOnNewSequence(action) {
  var windowId, canvases, thunk;
  return _regeneratorRuntime().wrap(function setCanvasOnNewSequence$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        windowId = action.id;
        if (!(!action || !action.payload || !action.payload.sequenceId)) {
          _context2.next = 3;
          break;
        }
        return _context2.abrupt("return");
      case 3:
        _context2.next = 5;
        return select(getCanvases, {
          windowId: windowId
        });
      case 5:
        canvases = _context2.sent;
        if (!(!canvases || !canvases[0] || !canvases[0].id)) {
          _context2.next = 8;
          break;
        }
        return _context2.abrupt("return");
      case 8:
        _context2.next = 10;
        return call(setCanvas, windowId, canvases[0].id);
      case 10:
        thunk = _context2.sent;
        _context2.next = 13;
        return put(thunk);
      case 13:
      case "end":
        return _context2.stop();
    }
  }, _marked2);
}

/** */
export function setCollectionPath(_ref2) {
  var manifestId = _ref2.manifestId,
    windowId = _ref2.windowId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var manifestoInstance, partOfs, partOf;
    return _regeneratorRuntime().wrap(function _callee$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return select(getManifestoInstance, {
            manifestId: manifestId
          });
        case 2:
          manifestoInstance = _context3.sent;
          if (!manifestoInstance) {
            _context3.next = 9;
            break;
          }
          partOfs = manifestoInstance.getProperty('partOf');
          partOf = Array.isArray(partOfs) ? partOfs[0] : partOfs;
          if (!(partOf && partOf.id)) {
            _context3.next = 9;
            break;
          }
          _context3.next = 9;
          return put(updateWindow(windowId, {
            collectionPath: [partOf.id]
          }));
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee);
  })();
}

/** */
export function fetchCollectionManifests(action) {
  var collectionPath;
  return _regeneratorRuntime().wrap(function fetchCollectionManifests$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        collectionPath = action.payload.collectionPath;
        if (collectionPath) {
          _context4.next = 3;
          break;
        }
        return _context4.abrupt("return");
      case 3:
        _context4.next = 5;
        return call.apply(void 0, [fetchManifests].concat(_toConsumableArray(collectionPath)));
      case 5:
      case "end":
        return _context4.stop();
    }
  }, _marked3);
}

/** @private */
export function setWindowStartingCanvas(action) {
  var _ref3, canvasId, canvasIndex, manifestId, windowId, thunk, manifestoInstance, miradorManifest, startCanvas, _thunk;
  return _regeneratorRuntime().wrap(function setWindowStartingCanvas$(_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        _ref3 = action.payload || action.window, canvasId = _ref3.canvasId, canvasIndex = _ref3.canvasIndex, manifestId = _ref3.manifestId;
        windowId = action.id || action.window.id;
        if (!canvasId) {
          _context5.next = 10;
          break;
        }
        _context5.next = 5;
        return call(setCanvas, windowId, canvasId, null, {
          preserveViewport: !!action.payload
        });
      case 5:
        thunk = _context5.sent;
        _context5.next = 8;
        return put(thunk);
      case 8:
        _context5.next = 22;
        break;
      case 10:
        _context5.next = 12;
        return select(getManifestoInstance, {
          manifestId: manifestId
        });
      case 12:
        manifestoInstance = _context5.sent;
        if (!manifestoInstance) {
          _context5.next = 22;
          break;
        }
        // set the startCanvas
        miradorManifest = new MiradorManifest(manifestoInstance);
        startCanvas = miradorManifest.startCanvas || miradorManifest.canvasAt(canvasIndex || 0) || miradorManifest.canvasAt(0);
        if (!startCanvas) {
          _context5.next = 22;
          break;
        }
        _context5.next = 19;
        return call(setCanvas, windowId, startCanvas.id);
      case 19:
        _thunk = _context5.sent;
        _context5.next = 22;
        return put(_thunk);
      case 22:
      case "end":
        return _context5.stop();
    }
  }, _marked4);
}

/** @private */
export function setWindowDefaultSearchQuery(action) {
  var _action$window, windowId, defaultSearchQuery, searchService, companionWindowIds, companionWindowId, searchId;
  return _regeneratorRuntime().wrap(function setWindowDefaultSearchQuery$(_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        if (!(!action.window || !action.window.defaultSearchQuery)) {
          _context6.next = 2;
          break;
        }
        return _context6.abrupt("return");
      case 2:
        _action$window = action.window, windowId = _action$window.id, defaultSearchQuery = _action$window.defaultSearchQuery;
        _context6.next = 5;
        return select(getManifestSearchService, {
          windowId: windowId
        });
      case 5:
        searchService = _context6.sent;
        _context6.next = 8;
        return select(getCompanionWindowIdsForPosition, {
          position: 'left',
          windowId: windowId
        });
      case 8:
        companionWindowIds = _context6.sent;
        companionWindowId = companionWindowIds[0];
        if (!(searchService && companionWindowId)) {
          _context6.next = 14;
          break;
        }
        searchId = searchService && "".concat(searchService.id, "?q=").concat(defaultSearchQuery);
        _context6.next = 14;
        return put(fetchSearch(windowId, companionWindowId, searchId, defaultSearchQuery));
      case 14:
      case "end":
        return _context6.stop();
    }
  }, _marked5);
}

/** @private */
export function getAnnotationsBySearch(state, _ref4) {
  var canvasIds = _ref4.canvasIds,
    companionWindowIds = _ref4.companionWindowIds,
    windowId = _ref4.windowId;
  var annotationBySearch = companionWindowIds.reduce(function (accumulator, companionWindowId) {
    var annotations = getSearchAnnotationsForCompanionWindow(state, {
      companionWindowId: companionWindowId,
      windowId: windowId
    });
    var resourceAnnotations = annotations.resources;
    var hitAnnotation = resourceAnnotations.find(function (r) {
      return canvasIds.includes(r.targetId);
    });
    if (hitAnnotation) accumulator[companionWindowId] = [hitAnnotation.id];
    return accumulator;
  }, {});
  return annotationBySearch;
}

/** @private */
export function setCurrentAnnotationsOnCurrentCanvas(_ref5) {
  var annotationId = _ref5.annotationId,
    windowId = _ref5.windowId,
    visibleCanvases = _ref5.visibleCanvases;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var searches, companionWindowIds, annotationBySearch;
    return _regeneratorRuntime().wrap(function _callee2$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return select(getSearchForWindow, {
            windowId: windowId
          });
        case 2:
          searches = _context7.sent;
          companionWindowIds = Object.keys(searches || {});
          if (!(companionWindowIds.length === 0)) {
            _context7.next = 6;
            break;
          }
          return _context7.abrupt("return");
        case 6:
          _context7.next = 8;
          return select(getAnnotationsBySearch, {
            canvasIds: visibleCanvases,
            companionWindowIds: companionWindowIds,
            windowId: windowId
          });
        case 8:
          annotationBySearch = _context7.sent;
          _context7.next = 11;
          return all(Object.keys(annotationBySearch).map(function (companionWindowId) {
            return put(setContentSearchCurrentAnnotation(windowId, companionWindowId, annotationBySearch[companionWindowId]));
          }));
        case 11:
          if (!(Object.values(annotationBySearch).length > 0)) {
            _context7.next = 14;
            break;
          }
          _context7.next = 14;
          return put(selectAnnotation(windowId, Object.values(annotationBySearch)[0][0]));
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee2);
  })();
}

/** @private */
export function panToFocusedWindow(_ref6) {
  var pan = _ref6.pan,
    windowId = _ref6.windowId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var elasticLayout, _ref7, x, y, width, height, _yield$select, _yield$select$viewpor, viewWidth, viewHeight;
    return _regeneratorRuntime().wrap(function _callee3$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          if (pan) {
            _context8.next = 2;
            break;
          }
          return _context8.abrupt("return");
        case 2:
          _context8.next = 4;
          return select(getElasticLayout);
        case 4:
          elasticLayout = _context8.sent;
          _ref7 = elasticLayout[windowId] || {}, x = _ref7.x, y = _ref7.y, width = _ref7.width, height = _ref7.height;
          _context8.next = 8;
          return select(getWorkspace);
        case 8:
          _yield$select = _context8.sent;
          _yield$select$viewpor = _yield$select.viewportPosition;
          viewWidth = _yield$select$viewpor.width;
          viewHeight = _yield$select$viewpor.height;
          _context8.next = 14;
          return put(setWorkspaceViewportPosition({
            x: x + width / 2 - viewWidth / 2,
            y: y + height / 2 - viewHeight / 2
          }));
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee3);
  })();
}

/** @private */
export function updateVisibleCanvases(_ref8) {
  var windowId = _ref8.windowId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var _yield$select2, canvasId, visibleCanvases;
    return _regeneratorRuntime().wrap(function _callee4$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return select(getWindow, {
            windowId: windowId
          });
        case 2:
          _yield$select2 = _context9.sent;
          canvasId = _yield$select2.canvasId;
          _context9.next = 6;
          return select(getCanvasGrouping, {
            canvasId: canvasId,
            windowId: windowId
          });
        case 6:
          visibleCanvases = _context9.sent;
          _context9.next = 9;
          return put(updateWindow(windowId, {
            visibleCanvases: (visibleCanvases || []).map(function (c) {
              return c.id;
            })
          }));
        case 9:
        case "end":
          return _context9.stop();
      }
    }, _callee4);
  })();
}

/** @private */
export function setCanvasOfFirstSearchResult(_ref9) {
  var companionWindowId = _ref9.companionWindowId,
    windowId = _ref9.windowId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var _yield$select3, switchCanvasOnSearch, selectedIds, annotations;
    return _regeneratorRuntime().wrap(function _callee5$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return select(getWindowConfig, {
            windowId: windowId
          });
        case 2:
          _yield$select3 = _context10.sent;
          switchCanvasOnSearch = _yield$select3.switchCanvasOnSearch;
          if (switchCanvasOnSearch) {
            _context10.next = 6;
            break;
          }
          return _context10.abrupt("return");
        case 6:
          _context10.next = 8;
          return select(getSelectedContentSearchAnnotationIds, {
            companionWindowId: companionWindowId,
            windowId: windowId
          });
        case 8:
          selectedIds = _context10.sent;
          if (!(selectedIds.length !== 0)) {
            _context10.next = 11;
            break;
          }
          return _context10.abrupt("return");
        case 11:
          _context10.next = 13;
          return select(getSortedSearchAnnotationsForCompanionWindow, {
            companionWindowId: companionWindowId,
            windowId: windowId
          });
        case 13:
          annotations = _context10.sent;
          if (!(!annotations || annotations.length === 0)) {
            _context10.next = 16;
            break;
          }
          return _context10.abrupt("return");
        case 16:
          _context10.next = 18;
          return put(selectAnnotation(windowId, annotations[0].id));
        case 18:
        case "end":
          return _context10.stop();
      }
    }, _callee5);
  })();
}

/** @private */
export function setCanvasforSelectedAnnotation(_ref10) {
  var annotationId = _ref10.annotationId,
    windowId = _ref10.windowId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var canvasIds, canvas, thunk;
    return _regeneratorRuntime().wrap(function _callee6$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return select(getVisibleCanvasIds, {
            windowId: windowId
          });
        case 2:
          canvasIds = _context11.sent;
          _context11.next = 5;
          return select(getCanvasForAnnotation, {
            annotationId: annotationId,
            windowId: windowId
          });
        case 5:
          canvas = _context11.sent;
          if (!(!canvas || canvasIds.includes(canvas.id))) {
            _context11.next = 8;
            break;
          }
          return _context11.abrupt("return");
        case 8:
          _context11.next = 10;
          return call(setCanvas, windowId, canvas.id);
        case 10:
          thunk = _context11.sent;
          _context11.next = 13;
          return put(thunk);
        case 13:
        case "end":
          return _context11.stop();
      }
    }, _callee6);
  })();
}

/** Fetch info responses for the visible canvases */
export function fetchInfoResponses(_ref11) {
  var visibleCanvasIds = _ref11.visibleCanvases,
    windowId = _ref11.windowId;
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var canvases, infoResponses, visibleCanvases;
    return _regeneratorRuntime().wrap(function _callee7$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return select(getCanvases, {
            windowId: windowId
          });
        case 2:
          canvases = _context12.sent;
          _context12.next = 5;
          return select(selectInfoResponses);
        case 5:
          infoResponses = _context12.sent;
          visibleCanvases = (canvases || []).filter(function (c) {
            return visibleCanvasIds.includes(c.id);
          });
          _context12.next = 9;
          return all(visibleCanvases.map(function (canvas) {
            var miradorCanvas = new MiradorCanvas(canvas);
            return all(miradorCanvas.iiifImageResources.map(function (imageResource) {
              return !infoResponses[imageResource.getServices()[0].id] && put(fetchInfoResponse({
                imageResource: imageResource,
                windowId: windowId
              }));
            }).filter(Boolean));
          }));
        case 9:
        case "end":
          return _context12.stop();
      }
    }, _callee7);
  })();
}

/** */
export function determineAndShowCollectionDialog(manifestId, windowId) {
  var manifestoInstance;
  return _regeneratorRuntime().wrap(function determineAndShowCollectionDialog$(_context13) {
    while (1) switch (_context13.prev = _context13.next) {
      case 0:
        _context13.next = 2;
        return select(getManifestoInstance, {
          manifestId: manifestId
        });
      case 2:
        manifestoInstance = _context13.sent;
        if (!(manifestoInstance && manifestoInstance.isCollection())) {
          _context13.next = 6;
          break;
        }
        _context13.next = 6;
        return put(showCollectionDialog(manifestId, [], windowId));
      case 6:
      case "end":
        return _context13.stop();
    }
  }, _marked6);
}

/** */
export default function windowsSaga() {
  return _regeneratorRuntime().wrap(function windowsSaga$(_context14) {
    while (1) switch (_context14.prev = _context14.next) {
      case 0:
        _context14.next = 2;
        return all([takeEvery(ActionTypes.ADD_WINDOW, fetchWindowManifest), takeEvery(ActionTypes.UPDATE_WINDOW, fetchWindowManifest), takeEvery(ActionTypes.UPDATE_WINDOW, setCanvasOnNewSequence), takeEvery(ActionTypes.SET_CANVAS, setCurrentAnnotationsOnCurrentCanvas), takeEvery(ActionTypes.SET_CANVAS, fetchInfoResponses), takeEvery(ActionTypes.UPDATE_COMPANION_WINDOW, fetchCollectionManifests), takeEvery(ActionTypes.SET_WINDOW_VIEW_TYPE, updateVisibleCanvases), takeEvery(ActionTypes.RECEIVE_SEARCH, setCanvasOfFirstSearchResult), takeEvery(ActionTypes.SELECT_ANNOTATION, setCanvasforSelectedAnnotation), takeEvery(ActionTypes.FOCUS_WINDOW, panToFocusedWindow)]);
      case 2:
      case "end":
        return _context14.stop();
    }
  }, _marked7);
}