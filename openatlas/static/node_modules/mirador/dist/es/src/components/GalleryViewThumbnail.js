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
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import AnnotationIcon from '@material-ui/icons/CommentSharp';
import SearchIcon from '@material-ui/icons/SearchSharp';
import classNames from 'classnames';
import 'intersection-observer'; // polyfill needed for Safari
import IntersectionObserver from '@researchgate/react-intersection-observer';
import MiradorCanvas from '../lib/MiradorCanvas';
import IIIFThumbnail from '../containers/IIIFThumbnail';

/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * OSD and Navigation
 */
export var GalleryViewThumbnail = /*#__PURE__*/function (_Component) {
  /** */
  function GalleryViewThumbnail(props) {
    var _this;
    _classCallCheck(this, GalleryViewThumbnail);
    _this = _callSuper(this, GalleryViewThumbnail, [props]);
    _this.state = {
      requestedAnnotations: false
    };
    _this.handleSelect = _this.handleSelect.bind(_this);
    _this.handleKey = _this.handleKey.bind(_this);
    _this.handleIntersection = _this.handleIntersection.bind(_this);
    return _this;
  }

  /** @private */
  _inherits(GalleryViewThumbnail, _Component);
  return _createClass(GalleryViewThumbnail, [{
    key: "handleSelect",
    value: function handleSelect() {
      var _this$props = this.props,
        canvas = _this$props.canvas,
        selected = _this$props.selected,
        setCanvas = _this$props.setCanvas,
        focusOnCanvas = _this$props.focusOnCanvas;
      if (selected) {
        focusOnCanvas();
      } else {
        setCanvas(canvas.id);
      }
    }

    /** @private */
  }, {
    key: "handleKey",
    value: function handleKey(event) {
      var _this$props2 = this.props,
        canvas = _this$props2.canvas,
        setCanvas = _this$props2.setCanvas,
        focusOnCanvas = _this$props2.focusOnCanvas;
      this.keys = {
        enter: 'Enter',
        space: ' '
      };
      this.chars = {
        enter: 13,
        space: 32
      };
      var enterOrSpace = event.key === this.keys.enter || event.which === this.chars.enter || event.key === this.keys.space || event.which === this.chars.space;
      if (enterOrSpace) {
        focusOnCanvas();
      } else {
        setCanvas(canvas.id);
      }
    }

    /** */
  }, {
    key: "handleIntersection",
    value: function handleIntersection(_ref) {
      var isIntersecting = _ref.isIntersecting;
      var _this$props3 = this.props,
        annotationsCount = _this$props3.annotationsCount,
        requestCanvasAnnotations = _this$props3.requestCanvasAnnotations;
      var requestedAnnotations = this.state.requestedAnnotations;
      if (!isIntersecting || annotationsCount === undefined || annotationsCount > 0 || requestedAnnotations) return;
      this.setState({
        requestedAnnotations: true
      });
      requestCanvasAnnotations();
    }

    /**
     * Renders things
     */
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
        annotationsCount = _this$props4.annotationsCount,
        searchAnnotationsCount = _this$props4.searchAnnotationsCount,
        canvas = _this$props4.canvas,
        classes = _this$props4.classes,
        config = _this$props4.config,
        selected = _this$props4.selected;
      var miradorCanvas = new MiradorCanvas(canvas);
      return /*#__PURE__*/React.createElement(IntersectionObserver, {
        onChange: this.handleIntersection
      }, /*#__PURE__*/React.createElement("div", {
        key: canvas.index,
        className: classNames(classes.galleryViewItem, selected ? classes.selected : '', searchAnnotationsCount > 0 ? classes.hasAnnotations : ''),
        onClick: this.handleSelect,
        onKeyUp: this.handleKey,
        role: "button",
        tabIndex: 0
      }, /*#__PURE__*/React.createElement(IIIFThumbnail, {
        resource: canvas,
        labelled: true,
        variant: "outside",
        maxWidth: config.width,
        maxHeight: config.height,
        style: {
          margin: '0 auto',
          maxWidth: "".concat(Math.ceil(config.height * miradorCanvas.aspectRatio), "px")
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: classes.chips
      }, searchAnnotationsCount > 0 && /*#__PURE__*/React.createElement(Chip, {
        avatar: /*#__PURE__*/React.createElement(Avatar, {
          className: classes.avatar,
          classes: {
            circle: classes.avatarIcon
          }
        }, /*#__PURE__*/React.createElement(SearchIcon, {
          fontSize: "small"
        })),
        label: searchAnnotationsCount,
        className: classNames(classes.searchChip),
        size: "small"
      }), (annotationsCount || 0) > 0 && /*#__PURE__*/React.createElement(Chip, {
        avatar: /*#__PURE__*/React.createElement(Avatar, {
          className: classes.avatar,
          classes: {
            circle: classes.avatarIcon
          }
        }, /*#__PURE__*/React.createElement(AnnotationIcon, {
          className: classes.annotationIcon
        })),
        label: annotationsCount,
        className: classNames(classes.annotationsChip),
        size: "small"
      })))));
    }
  }]);
}(Component);
GalleryViewThumbnail.defaultProps = {
  annotationsCount: undefined,
  config: {
    height: 100,
    width: null
  },
  requestCanvasAnnotations: function requestCanvasAnnotations() {},
  searchAnnotationsCount: 0,
  selected: false
};