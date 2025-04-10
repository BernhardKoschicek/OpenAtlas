"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrimaryWindow = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _WindowSideBar = _interopRequireDefault(require("../containers/WindowSideBar"));
var _CompanionArea = _interopRequireDefault(require("../containers/CompanionArea"));
var _CollectionDialog = _interopRequireDefault(require("../containers/CollectionDialog"));
var _cssNs = _interopRequireDefault(require("../config/css-ns"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == typeof e || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var AudioViewer = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../containers/AudioViewer'));
  });
});
var GalleryView = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../containers/GalleryView'));
  });
});
var SelectCollection = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../containers/SelectCollection'));
  });
});
var WindowViewer = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../containers/WindowViewer'));
  });
});
var VideoViewer = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('../containers/VideoViewer'));
  });
});
GalleryView.displayName = 'GalleryView';
SelectCollection.displayName = 'SelectCollection';
WindowViewer.displayName = 'WindowViewer';

/**
 * PrimaryWindow - component that renders the primary content of a Mirador
 * window. Right now this differentiates between a Image, Video, or Audio viewer.
 */
var PrimaryWindow = exports.PrimaryWindow = /*#__PURE__*/function (_Component) {
  function PrimaryWindow() {
    _classCallCheck(this, PrimaryWindow);
    return _callSuper(this, PrimaryWindow, arguments);
  }
  _inherits(PrimaryWindow, _Component);
  return _createClass(PrimaryWindow, [{
    key: "renderViewer",
    value:
    /**
     * renderViewer - logic used to determine what type of view to show
     *
     * @return {(String|null)}
     */
    function renderViewer() {
      var _this$props = this.props,
        audioResources = _this$props.audioResources,
        isCollection = _this$props.isCollection,
        isFetching = _this$props.isFetching,
        videoResources = _this$props.videoResources,
        view = _this$props.view,
        windowId = _this$props.windowId;
      if (isCollection) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(SelectCollection, {
          windowId: windowId
        }));
      }
      if (isFetching === false) {
        if (view === 'gallery') {
          return /*#__PURE__*/_react["default"].createElement(GalleryView, {
            windowId: windowId
          });
        }
        if (videoResources.length > 0) {
          return /*#__PURE__*/_react["default"].createElement(VideoViewer, {
            windowId: windowId
          });
        }
        if (audioResources.length > 0) {
          return /*#__PURE__*/_react["default"].createElement(AudioViewer, {
            windowId: windowId
          });
        }
        return /*#__PURE__*/_react["default"].createElement(WindowViewer, {
          windowId: windowId
        });
      }
      return null;
    }

    /**
     * Render the component
     */
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        isCollectionDialogVisible = _this$props2.isCollectionDialogVisible,
        windowId = _this$props2.windowId,
        classes = _this$props2.classes,
        children = _this$props2.children;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])((0, _cssNs["default"])('primary-window'), classes.primaryWindow)
      }, /*#__PURE__*/_react["default"].createElement(_WindowSideBar["default"], {
        windowId: windowId
      }), /*#__PURE__*/_react["default"].createElement(_CompanionArea["default"], {
        windowId: windowId,
        position: "left"
      }), isCollectionDialogVisible && /*#__PURE__*/_react["default"].createElement(_CollectionDialog["default"], {
        windowId: windowId
      }), /*#__PURE__*/_react["default"].createElement(_react.Suspense, {
        fallback: /*#__PURE__*/_react["default"].createElement("div", null)
      }, children || this.renderViewer()));
    }
  }]);
}(_react.Component);
PrimaryWindow.defaultProps = {
  audioResources: [],
  children: undefined,
  isCollection: false,
  isCollectionDialogVisible: false,
  isFetching: false,
  videoResources: [],
  view: undefined
};