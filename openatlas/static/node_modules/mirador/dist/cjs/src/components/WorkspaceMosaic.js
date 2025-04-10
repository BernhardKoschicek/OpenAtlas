"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkspaceMosaic = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactMosaicComponent = require("react-mosaic-component");
var _difference = _interopRequireDefault(require("lodash/difference"));
var _isEqual = _interopRequireDefault(require("lodash/isEqual"));
var _classnames = _interopRequireDefault(require("classnames"));
var _MosaicRenderPreview = _interopRequireDefault(require("../containers/MosaicRenderPreview"));
var _Window = _interopRequireDefault(require("../containers/Window"));
var _MosaicLayout = _interopRequireDefault(require("../lib/MosaicLayout"));
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
/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
var WorkspaceMosaic = exports.WorkspaceMosaic = /*#__PURE__*/function (_React$Component) {
  /**
   */
  function WorkspaceMosaic(props) {
    var _this;
    _classCallCheck(this, WorkspaceMosaic);
    _this = _callSuper(this, WorkspaceMosaic, [props]);
    _this.tileRenderer = _this.tileRenderer.bind(_this);
    _this.mosaicChange = _this.mosaicChange.bind(_this);
    _this.determineWorkspaceLayout = _this.determineWorkspaceLayout.bind(_this);
    _this.zeroStateView = /*#__PURE__*/_react["default"].createElement("div", null);
    _this.windowPaths = {};
    _this.toolbarControls = [];
    _this.additionalControls = [];
    return _this;
  }

  /** */
  _inherits(WorkspaceMosaic, _React$Component);
  return _createClass(WorkspaceMosaic, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var updateWorkspaceMosaicLayout = this.props.updateWorkspaceMosaicLayout;
      var newLayout = this.determineWorkspaceLayout();
      if (newLayout) updateWorkspaceMosaicLayout(newLayout);
    }

    /** */
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
        windowIds = _this$props.windowIds,
        layout = _this$props.layout,
        updateWorkspaceMosaicLayout = _this$props.updateWorkspaceMosaicLayout;
      var prevWindows = prevProps.windowIds;
      // Handles when Windows are added (not via Add Resource UI) Could be a workspace import
      if (!windowIds.every(function (e) {
        return prevWindows.includes(e);
      })) {
        var newLayout = this.determineWorkspaceLayout();
        if (!(0, _isEqual["default"])(newLayout, layout)) updateWorkspaceMosaicLayout(newLayout);
        return;
      }

      // Handles when Windows are removed from the state
      if (!prevWindows.every(function (e) {
        return windowIds.includes(e);
      })) {
        // There are no more remaining Windows, just return an empty layout
        if (windowIds.length === 0) {
          updateWorkspaceMosaicLayout(null);
          return;
        }
        var removedWindows = (0, _difference["default"])(prevWindows, windowIds);
        var _newLayout = new _MosaicLayout["default"](layout);
        _newLayout.removeWindows(removedWindows, this.windowPaths);
        updateWorkspaceMosaicLayout(_newLayout.layout);
      }
    }

    /**
     * bookkeepPath - used to book keep Window's path's
     * @param  {String} windowId   [description]
     * @param  {Array} path [description]
     */
  }, {
    key: "bookkeepPath",
    value: function bookkeepPath(windowId, path) {
      this.windowPaths[windowId] = path;
    }

    /**
     * Used to determine whether or not a "new" layout should be autogenerated.
     */
  }, {
    key: "determineWorkspaceLayout",
    value: function determineWorkspaceLayout() {
      var _this$props2 = this.props,
        windowIds = _this$props2.windowIds,
        layout = _this$props2.layout;
      var leaveKeys = (0, _reactMosaicComponent.getLeaves)(layout);
      // Windows were added
      if (!windowIds.every(function (e) {
        return leaveKeys.includes(e);
      })) {
        // No current layout, so just generate a new one
        if (leaveKeys.length < 2) {
          return (0, _reactMosaicComponent.createBalancedTreeFromLeaves)(windowIds);
        }
        // Add new windows to layout
        var addedWindows = (0, _difference["default"])(windowIds, leaveKeys);
        var newLayout = new _MosaicLayout["default"](layout);
        newLayout.addWindows(addedWindows);
        return newLayout.layout;
      }
      // Windows were removed (perhaps in a different Workspace). We don't have a
      // way to reconfigure.. so we have to random generate
      if (!leaveKeys.every(function (e) {
        return windowIds.includes(e);
      })) {
        return (0, _reactMosaicComponent.createBalancedTreeFromLeaves)(windowIds);
      }
      return layout;
    }

    /** */
  }, {
    key: "tileRenderer",
    value:
    /**
     * Render a tile (Window) in the Mosaic.
     */
    function tileRenderer(id, path) {
      var _this$props3 = this.props,
        windowIds = _this$props3.windowIds,
        workspaceId = _this$props3.workspaceId;
      if (!windowIds.includes(id)) return null;
      this.bookkeepPath(id, path);
      return /*#__PURE__*/_react["default"].createElement(_reactMosaicComponent.MosaicWindow, {
        toolbarControls: this.toolbarControls,
        additionalControls: this.additionalControls,
        path: path,
        windowId: id,
        renderPreview: WorkspaceMosaic.renderPreview
      }, /*#__PURE__*/_react["default"].createElement(_Window["default"], {
        key: "".concat(id, "-").concat(workspaceId),
        windowId: id
      }));
    }

    /**
     * Update the redux store when the Mosaic is changed.
     */
  }, {
    key: "mosaicChange",
    value: function mosaicChange(newLayout) {
      var updateWorkspaceMosaicLayout = this.props.updateWorkspaceMosaicLayout;
      updateWorkspaceMosaicLayout(newLayout);
    }

    /**
     */
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
        layout = _this$props4.layout,
        classes = _this$props4.classes;
      return /*#__PURE__*/_react["default"].createElement(_reactMosaicComponent.MosaicWithoutDragDropContext, {
        renderTile: this.tileRenderer,
        initialValue: layout || this.determineWorkspaceLayout(),
        onChange: this.mosaicChange,
        className: (0, _classnames["default"])('mirador-mosaic', classes.root),
        zeroStateView: this.zeroStateView
      });
    }
  }], [{
    key: "renderPreview",
    value: function renderPreview(mosaicProps) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "mosaic-preview",
        "aria-hidden": true
      }, /*#__PURE__*/_react["default"].createElement(_MosaicRenderPreview["default"], {
        windowId: mosaicProps.windowId
      }));
    }
  }]);
}(_react["default"].Component);
WorkspaceMosaic.defaultProps = {
  layout: undefined,
  windowIds: []
};