"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IIIFThumbnail = void 0;
var _react = _interopRequireWildcard(require("react"));
require("intersection-observer");
var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));
var _reactIntersectionObserver = _interopRequireDefault(require("@researchgate/react-intersection-observer"));
var _classnames = _interopRequireDefault(require("classnames"));
var _ThumbnailFactory = _interopRequireDefault(require("../lib/ThumbnailFactory"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } // polyfill needed for Safari
/**
 * Uses InteractionObserver to "lazy" load canvas thumbnails that are in view.
 */
var IIIFThumbnail = exports.IIIFThumbnail = /*#__PURE__*/function (_Component) {
  /**
   */
  function IIIFThumbnail(props) {
    var _this;
    _classCallCheck(this, IIIFThumbnail);
    _this = _callSuper(this, IIIFThumbnail, [props]);
    _this.state = {
      loaded: false
    };
    _this.handleIntersection = _this.handleIntersection.bind(_this);
    return _this;
  }

  /** */
  _inherits(IIIFThumbnail, _Component);
  return _createClass(IIIFThumbnail, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.setState(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          image: _this2.image()
        });
      });
    }

    /** */
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;
      var _this$props = this.props,
        maxHeight = _this$props.maxHeight,
        maxWidth = _this$props.maxWidth,
        resource = _this$props.resource;
      if (prevProps.maxHeight !== maxHeight || prevProps.maxWidth !== maxWidth || prevProps.resource !== resource) {
        this.setState(function (state) {
          return _objectSpread(_objectSpread({}, state), {}, {
            image: _this3.image()
          });
        }); // eslint-disable-line
      }
    }

    /**
     * Handles the intersection (visibility) of a given thumbnail, by requesting
     * the image and then updating the state.
     */
  }, {
    key: "handleIntersection",
    value: function handleIntersection(event) {
      var loaded = this.state.loaded;
      if (loaded || !event.isIntersecting) return;
      this.setState(function (state) {
        return _objectSpread(_objectSpread({}, state), {}, {
          loaded: true
        });
      });
    }

    /**
     *
    */
  }, {
    key: "imageStyles",
    value: function imageStyles() {
      var _this$props2 = this.props,
        maxHeight = _this$props2.maxHeight,
        maxWidth = _this$props2.maxWidth,
        style = _this$props2.style;
      var image = this.image();
      var styleProps = {
        height: 'auto',
        width: 'auto'
      };
      if (!image) return _objectSpread(_objectSpread({}, style), {}, {
        height: maxHeight || 'auto',
        width: maxWidth || 'auto'
      });
      var thumbHeight = image.height,
        thumbWidth = image.width;
      if (thumbHeight && thumbWidth) {
        if (maxHeight && thumbHeight > maxHeight || maxWidth && thumbWidth > maxWidth) {
          var aspectRatio = thumbWidth / thumbHeight;
          if (maxHeight && maxWidth) {
            if (maxWidth / maxHeight < aspectRatio) {
              styleProps.height = Math.round(maxWidth / aspectRatio);
              styleProps.width = maxWidth;
            } else {
              styleProps.height = maxHeight;
              styleProps.width = Math.round(maxHeight * aspectRatio);
            }
          } else if (maxHeight) {
            styleProps.height = maxHeight;
            styleProps.maxWidth = Math.round(maxHeight * aspectRatio);
          } else if (maxWidth) {
            styleProps.width = maxWidth;
            styleProps.maxHeight = Math.round(maxWidth / aspectRatio);
          }
        } else {
          styleProps.width = thumbWidth;
          styleProps.height = thumbHeight;
        }
      } else if (thumbHeight && !thumbWidth) {
        styleProps.height = maxHeight;
      } else if (!thumbHeight && thumbWidth) {
        styleProps.width = maxWidth;
      } else {
        // The thumbnail wasn't retrieved via an Image API service,
        // and its dimensions are not specified in the JSON-LD
        // (note that this may result in a blurry image)
        styleProps.width = maxWidth;
        styleProps.height = maxHeight;
      }
      return _objectSpread(_objectSpread({}, styleProps), style);
    }

    /** */
  }, {
    key: "image",
    value: function image() {
      var _this$props3 = this.props,
        thumbnail = _this$props3.thumbnail,
        resource = _this$props3.resource,
        maxHeight = _this$props3.maxHeight,
        maxWidth = _this$props3.maxWidth,
        thumbnailsConfig = _this$props3.thumbnailsConfig;
      if (thumbnail) return thumbnail;
      var image = (0, _ThumbnailFactory["default"])(resource, _objectSpread(_objectSpread({}, thumbnailsConfig), {}, {
        maxHeight: maxHeight,
        maxWidth: maxWidth
      }));
      if (image && image.url) return image;
      return undefined;
    }

    /** */
  }, {
    key: "label",
    value: function label() {
      var _this$props4 = this.props,
        label = _this$props4.label,
        resource = _this$props4.resource;
      return label || IIIFThumbnail.getUseableLabel(resource);
    }

    /**
     */
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
        children = _this$props5.children,
        classes = _this$props5.classes,
        imagePlaceholder = _this$props5.imagePlaceholder,
        labelled = _this$props5.labelled,
        thumbnail = _this$props5.thumbnail,
        variant = _this$props5.variant;
      var _this$state = this.state,
        image = _this$state.image,
        loaded = _this$state.loaded;
      var _ref = loaded && (thumbnail || image) || {},
        _ref$url = _ref.url,
        src = _ref$url === void 0 ? imagePlaceholder : _ref$url;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(classes.root, _defineProperty({}, classes["".concat(variant, "Root")], variant))
      }, /*#__PURE__*/_react["default"].createElement(_reactIntersectionObserver["default"], {
        onChange: this.handleIntersection
      }, /*#__PURE__*/_react["default"].createElement("img", {
        alt: "",
        role: "presentation",
        src: src,
        style: this.imageStyles(),
        className: classes.image
      })), labelled && /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(classes.label, _defineProperty({}, classes["".concat(variant, "Label")], variant))
      }, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
        variant: "caption",
        classes: {
          root: (0, _classnames["default"])(classes.caption, _defineProperty({}, classes["".concat(variant, "Caption")], variant))
        }
      }, this.label())), children);
    }
  }], [{
    key: "getUseableLabel",
    value: /** */
    function getUseableLabel(resource, index) {
      return resource && resource.getLabel && resource.getLabel().length > 0 ? resource.getLabel().getValue() : String(index + 1);
    }
  }]);
}(_react.Component);
IIIFThumbnail.defaultProps = {
  children: null,
  classes: {},
  // Transparent "gray"
  imagePlaceholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMDQmtBwADgwF/Op8FmAAAAABJRU5ErkJggg==',
  label: undefined,
  labelled: false,
  maxHeight: null,
  maxWidth: null,
  style: {},
  thumbnail: null,
  thumbnailsConfig: {},
  variant: null
};