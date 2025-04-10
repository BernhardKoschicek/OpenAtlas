"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollTo = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
 * ScrollTo ~
*/
var ScrollTo = exports.ScrollTo = /*#__PURE__*/function (_Component) {
  /** */
  function ScrollTo(props) {
    var _this;
    _classCallCheck(this, ScrollTo);
    _this = _callSuper(this, ScrollTo, [props]);
    _this.scrollToRef = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  /** */
  _inherits(ScrollTo, _Component);
  return _createClass(ScrollTo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var scrollTo = this.props.scrollTo;
      if (!scrollTo) return;
      this.scrollToElement();
    }

    /**
     * If the scrollTo prop is true (and has been updated) scroll to the selected element
    */
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var scrollTo = this.props.scrollTo;
      if (scrollTo && prevProps.scrollTo !== scrollTo) {
        this.scrollToElement();
      }
    }

    /**
     * Return the getBoundingClientRect() of the containerRef prop
    */
  }, {
    key: "containerBoundingRect",
    value: function containerBoundingRect() {
      var containerRef = this.props.containerRef;
      if (!containerRef || !containerRef.current || !containerRef.current.domEl) return {};
      return containerRef.current.domEl.getBoundingClientRect();
    }

    /**
     * Return the getBoundingClientRect() of the scrollTo ref prop
    */
  }, {
    key: "scrollToBoundingRect",
    value: function scrollToBoundingRect() {
      if (!this.elementToScrollTo()) return {};
      return this.elementToScrollTo().getBoundingClientRect();
    }

    /**
     * Return the current scrollToRef
    */
  }, {
    key: "elementToScrollTo",
    value: function elementToScrollTo() {
      if (!this.scrollToRef || !this.scrollToRef.current) return null;
      return this.scrollToRef.current;
    }

    /**
     * The container provided in the containersRef dome structure in which scrolling
     * should happen.
    */
  }, {
    key: "scrollabelContainer",
    value: function scrollabelContainer() {
      var containerRef = this.props.containerRef;
      if (!containerRef || !containerRef.current || !containerRef.current.domEl) return null;
      return containerRef.current.domEl.getElementsByClassName('mirador-scrollto-scrollable')[0];
    }

    /**
     * Determine if the scrollTo element is visible within the given containerRef prop.
     * Currently only supports vertical elements but could be extended to support horizontal
    */
  }, {
    key: "elementIsVisible",
    value: function elementIsVisible() {
      var offsetTop = this.props.offsetTop;
      if (this.scrollToBoundingRect().top < this.containerBoundingRect().top + offsetTop) {
        return false;
      }
      if (this.scrollToBoundingRect().bottom > this.containerBoundingRect().bottom) {
        return false;
      }
      return true;
    }

    /**
     * Scroll to the element if it is set to be scolled and is not visible
    */
  }, {
    key: "scrollToElement",
    value: function scrollToElement() {
      var _this$props = this.props,
        offsetTop = _this$props.offsetTop,
        scrollTo = _this$props.scrollTo;
      if (!scrollTo) return;
      if (!this.elementToScrollTo()) return;
      if (this.elementIsVisible()) return;
      if (!this.scrollabelContainer()) return;
      var scrollBy = this.elementToScrollTo().offsetTop - this.containerBoundingRect().height / 2 + offsetTop;
      this.scrollabelContainer().scrollTo(0, scrollBy);
    }

    /**
     * Returns the rendered component
    */
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        children = _this$props2.children,
        scrollTo = _this$props2.scrollTo;
      if (!scrollTo) return children;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.scrollToRef
      }, children);
    }
  }]);
}(_react.Component);
ScrollTo.defaultProps = {
  offsetTop: 0
};