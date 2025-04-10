"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRnd = require("react-rnd");
var _reactResizeObserver = _interopRequireDefault(require("react-resize-observer"));
var _classnames = _interopRequireDefault(require("classnames"));
var _WorkspaceElasticWindow = _interopRequireDefault(require("../containers/WorkspaceElasticWindow"));
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
/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
var WorkspaceElastic = /*#__PURE__*/function (_React$Component) {
  function WorkspaceElastic() {
    _classCallCheck(this, WorkspaceElastic);
    return _callSuper(this, WorkspaceElastic, arguments);
  }
  _inherits(WorkspaceElastic, _React$Component);
  return _createClass(WorkspaceElastic, [{
    key: "render",
    value:
    /**
     */
    function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        workspace = _this$props.workspace,
        elasticLayout = _this$props.elasticLayout,
        setWorkspaceViewportDimensions = _this$props.setWorkspaceViewportDimensions,
        setWorkspaceViewportPosition = _this$props.setWorkspaceViewportPosition;
      var viewportPosition = workspace.viewportPosition;
      var offsetX = workspace.width / 2;
      var offsetY = workspace.height / 2;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          height: '100%',
          position: 'relative',
          width: '100%'
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactResizeObserver["default"], {
        onResize: function onResize(rect) {
          setWorkspaceViewportDimensions(rect);
        }
      }), /*#__PURE__*/_react["default"].createElement(_reactRnd.Rnd, {
        size: {
          height: workspace.height,
          width: workspace.width
        },
        position: {
          x: -1 * viewportPosition.x - offsetX,
          y: -1 * viewportPosition.y - offsetY
        },
        enableResizing: {
          bottom: false,
          bottomLeft: false,
          bottomRight: false,
          left: false,
          right: false,
          top: false,
          topLeft: false,
          topRight: false
        },
        onDragStop: function onDragStop(e, d) {
          setWorkspaceViewportPosition({
            x: -1 * d.x - offsetX,
            y: -1 * d.y - offsetY
          });
        },
        cancel: ".".concat((0, _cssNs["default"])('window')),
        className: (0, _classnames["default"])(classes.workspace, (0, _cssNs["default"])('workspace')),
        disableDragging: !workspace.draggingEnabled
      }, Object.keys(elasticLayout).map(function (windowId) {
        return /*#__PURE__*/_react["default"].createElement(_WorkspaceElasticWindow["default"], {
          key: windowId,
          windowId: windowId
        });
      })));
    }
  }]);
}(_react["default"].Component);
var _default = exports["default"] = WorkspaceElastic;