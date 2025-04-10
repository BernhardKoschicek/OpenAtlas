"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidebarIndexTableOfContents = void 0;
var _react = _interopRequireWildcard(require("react"));
var _TreeView = _interopRequireDefault(require("@material-ui/lab/TreeView"));
var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));
var _ChevronRight = _interopRequireDefault(require("@material-ui/icons/ChevronRight"));
var _TreeItem = _interopRequireDefault(require("@material-ui/lab/TreeItem"));
var _clsx2 = _interopRequireDefault(require("clsx"));
var _ScrollTo = require("./ScrollTo");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
/** */
function getStartCanvasId(node) {
  var jsonld = node.data.__jsonld; // eslint-disable-line no-underscore-dangle
  if (jsonld.startCanvas && typeof jsonld.startCanvas === 'string') {
    return jsonld.startCanvas;
  }
  if (jsonld.start) {
    if (jsonld.start.type === 'Canvas' && typeof jsonld.start.id === 'string') {
      return jsonld.start.id;
    }
    if (jsonld.start.type === 'SpecificResource' && typeof jsonld.start.source === 'string') {
      return jsonld.start.source;
    }
  }
  return node.data.getCanvasIds()[0];
}

/** */
var SidebarIndexTableOfContents = exports.SidebarIndexTableOfContents = /*#__PURE__*/function (_Component) {
  function SidebarIndexTableOfContents() {
    _classCallCheck(this, SidebarIndexTableOfContents);
    return _callSuper(this, SidebarIndexTableOfContents, arguments);
  }
  _inherits(SidebarIndexTableOfContents, _Component);
  return _createClass(SidebarIndexTableOfContents, [{
    key: "handleKeyPressed",
    value: /** */
    function handleKeyPressed(event, node) {
      var _this$props = this.props,
        expandedNodeIds = _this$props.expandedNodeIds,
        toggleNode = _this$props.toggleNode;
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        this.selectTreeItem(node);
      }
      if (event.key === 'ArrowLeft' && expandedNodeIds.indexOf(node.id) !== -1 || event.key === 'ArrowRight' && expandedNodeIds.indexOf(node.id) === -1 && node.nodes.length > 0) {
        toggleNode(node.id);
      }
    }

    /** */
  }, {
    key: "selectTreeItem",
    value: function selectTreeItem(node) {
      var _this$props2 = this.props,
        setCanvas = _this$props2.setCanvas,
        toggleNode = _this$props2.toggleNode,
        windowId = _this$props2.windowId;
      if (node.nodes.length > 0) {
        toggleNode(node.id);
      }

      // Do not select if there are no canvases listed or it has children
      if (!node.data.getCanvasIds() || node.data.getCanvasIds().length === 0 || node.nodes.length > 0) {
        return;
      }
      var target = getStartCanvasId(node);
      var canvasId = target.indexOf('#') === -1 ? target : target.substr(0, target.indexOf('#'));
      setCanvas(windowId, canvasId);
    }

    /** */
  }, {
    key: "buildTreeItems",
    value: function buildTreeItems(nodes, visibleNodeIds, containerRef, nodeIdToScrollTo) {
      var _this = this;
      var classes = this.props.classes;
      if (!nodes) {
        return null;
      }
      return nodes.map(function (node) {
        return /*#__PURE__*/_react["default"].createElement(_ScrollTo.ScrollTo, {
          containerRef: containerRef,
          key: "".concat(node.id, "-scroll"),
          offsetTop: 96 // offset for the height of the form above
          ,
          scrollTo: nodeIdToScrollTo === node.id
        }, /*#__PURE__*/_react["default"].createElement(_TreeItem["default"], {
          key: node.id,
          nodeId: node.id,
          classes: {
            content: classes.content,
            group: classes.group,
            label: classes.label,
            root: classes.treeItemRoot,
            selected: classes.selected
          },
          label: /*#__PURE__*/_react["default"].createElement("div", {
            className: (0, _clsx2["default"])(_defineProperty({}, classes.visibleNode, visibleNodeIds.indexOf(node.id) !== -1))
          }, node.label),
          onClick: function onClick() {
            return _this.selectTreeItem(node);
          },
          onKeyDown: function onKeyDown(e) {
            return _this.handleKeyPressed(e, node);
          }
        }, node.nodes && node.nodes.length > 0 ? _this.buildTreeItems(node.nodes, visibleNodeIds, containerRef, nodeIdToScrollTo) : null));
      });
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
        classes = _this$props3.classes,
        treeStructure = _this$props3.treeStructure,
        visibleNodeIds = _this$props3.visibleNodeIds,
        expandedNodeIds = _this$props3.expandedNodeIds,
        containerRef = _this$props3.containerRef,
        nodeIdToScrollTo = _this$props3.nodeIdToScrollTo;
      if (!treeStructure) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
      }
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_TreeView["default"], {
        className: classes.root,
        defaultCollapseIcon: /*#__PURE__*/_react["default"].createElement(_ExpandMore["default"], {
          color: "action"
        }),
        defaultExpandIcon: /*#__PURE__*/_react["default"].createElement(_ChevronRight["default"], {
          color: "action"
        }),
        defaultEndIcon: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null),
        expanded: expandedNodeIds
      }, this.buildTreeItems(treeStructure.nodes, visibleNodeIds, containerRef, nodeIdToScrollTo)));
    }
  }]);
}(_react.Component);