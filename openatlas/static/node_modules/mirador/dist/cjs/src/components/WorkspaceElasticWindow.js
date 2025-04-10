"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRnd = require("react-rnd");
var _Window = _interopRequireDefault(require("../containers/Window"));
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
var WorkspaceElasticWindow = /*#__PURE__*/function (_React$Component) {
  function WorkspaceElasticWindow() {
    _classCallCheck(this, WorkspaceElasticWindow);
    return _callSuper(this, WorkspaceElasticWindow, arguments);
  }
  _inherits(WorkspaceElasticWindow, _React$Component);
  return _createClass(WorkspaceElasticWindow, [{
    key: "render",
    value:
    /**
     */
    function render() {
      var _this$props = this.props,
        classes = _this$props.classes,
        companionWindowDimensions = _this$props.companionWindowDimensions,
        focused = _this$props.focused,
        layout = _this$props.layout,
        workspace = _this$props.workspace,
        updateElasticWindowLayout = _this$props.updateElasticWindowLayout;
      var offsetX = workspace.width / 2;
      var offsetY = workspace.height / 2;
      return /*#__PURE__*/_react["default"].createElement(_reactRnd.Rnd, {
        key: "".concat(layout.windowId, "-").concat(workspace.id),
        size: {
          height: layout.height + companionWindowDimensions.height,
          width: layout.width + companionWindowDimensions.width
        },
        position: {
          x: layout.x + offsetX,
          y: layout.y + offsetY
        },
        bounds: "parent",
        onDragStop: function onDragStop(e, d) {
          updateElasticWindowLayout(layout.windowId, {
            x: d.x - offsetX,
            y: d.y - offsetY
          });
        },
        onResize: function onResize(e, direction, ref, delta, position) {
          updateElasticWindowLayout(layout.windowId, {
            height: Number.parseInt(ref.style.height, 10) - companionWindowDimensions.height,
            width: Number.parseInt(ref.style.width, 10) - companionWindowDimensions.width,
            x: position.x - offsetX,
            y: position.y - offsetY
          });
        },
        dragHandleClassName: (0, _cssNs["default"])('window-top-bar'),
        className: focused ? classes.focused : null
      }, /*#__PURE__*/_react["default"].createElement(_Window["default"], {
        windowId: layout.windowId
      }));
    }
  }]);
}(_react["default"].Component);
WorkspaceElasticWindow.defaultProps = {
  classes: {},
  companionWindowDimensions: {
    height: 0,
    width: 0
  },
  focused: false
};
var _default = exports["default"] = WorkspaceElasticWindow;