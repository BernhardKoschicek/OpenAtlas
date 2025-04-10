"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reduxThunk = _interopRequireDefault(require("redux-thunk"));
var _reduxSaga = _interopRequireDefault(require("redux-saga"));
var _redux = require("redux");
var _reduxDevtoolsExtension = require("redux-devtools-extension");
var _rootReducer = _interopRequireDefault(require("./reducers/rootReducer"));
var _sagas = _interopRequireDefault(require("./sagas"));
var _settings = _interopRequireDefault(require("../config/settings"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Topics for understanding
// redux modules for nested stores
// state normalisation
// (normalizer library)
/**
 * Configure Store
 */
function configureStore(pluginReducers) {
  var pluginSagas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var miradorReducer = (0, _rootReducer["default"])(pluginReducers);
  var rootReducer = _settings["default"].state.slice ? (0, _redux.combineReducers)(_defineProperty({}, _settings["default"].state.slice, miradorReducer)) : miradorReducer;

  // create the saga middleware
  var sagaMiddleware = (0, _reduxSaga["default"])();
  var store = (0, _redux.createStore)(rootReducer, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(_reduxThunk["default"], sagaMiddleware)));

  // then run the saga
  sagaMiddleware.run((0, _sagas["default"])(pluginSagas));
  return store;
}
var _default = exports["default"] = configureStore;