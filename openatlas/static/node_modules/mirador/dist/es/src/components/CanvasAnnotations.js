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
import React, { Component } from 'react';
import clsx from 'clsx';
import Chip from '@material-ui/core/Chip';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SanitizedHtml from '../containers/SanitizedHtml';
import { ScrollTo } from './ScrollTo';

/**
 * CanvasAnnotations ~
*/
export var CanvasAnnotations = /*#__PURE__*/function (_Component) {
  /**
   * constructor -
   */
  function CanvasAnnotations(props) {
    var _this;
    _classCallCheck(this, CanvasAnnotations);
    _this = _callSuper(this, CanvasAnnotations, [props]);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleAnnotationHover = _this.handleAnnotationHover.bind(_this);
    _this.handleAnnotationBlur = _this.handleAnnotationBlur.bind(_this);
    return _this;
  }

  /**
   * Handle click event of an annotation.
  */
  _inherits(CanvasAnnotations, _Component);
  return _createClass(CanvasAnnotations, [{
    key: "handleClick",
    value: function handleClick(event, annotation) {
      var _this$props = this.props,
        deselectAnnotation = _this$props.deselectAnnotation,
        selectAnnotation = _this$props.selectAnnotation,
        selectedAnnotationId = _this$props.selectedAnnotationId,
        windowId = _this$props.windowId;
      if (selectedAnnotationId === annotation.id) {
        deselectAnnotation(windowId, annotation.id);
      } else {
        selectAnnotation(windowId, annotation.id);
      }
    }

    /** */
  }, {
    key: "handleAnnotationHover",
    value: function handleAnnotationHover(annotation) {
      var _this$props2 = this.props,
        hoverAnnotation = _this$props2.hoverAnnotation,
        windowId = _this$props2.windowId;
      hoverAnnotation(windowId, [annotation.id]);
    }

    /** */
  }, {
    key: "handleAnnotationBlur",
    value: function handleAnnotationBlur() {
      var _this$props3 = this.props,
        hoverAnnotation = _this$props3.hoverAnnotation,
        windowId = _this$props3.windowId;
      hoverAnnotation(windowId, []);
    }

    /**
     * Returns the rendered component
    */
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props4 = this.props,
        annotations = _this$props4.annotations,
        classes = _this$props4.classes,
        index = _this$props4.index,
        label = _this$props4.label,
        selectedAnnotationId = _this$props4.selectedAnnotationId,
        t = _this$props4.t,
        totalSize = _this$props4.totalSize,
        listContainerComponent = _this$props4.listContainerComponent,
        htmlSanitizationRuleSet = _this$props4.htmlSanitizationRuleSet,
        hoveredAnnotationIds = _this$props4.hoveredAnnotationIds,
        containerRef = _this$props4.containerRef;
      if (annotations.length === 0) return /*#__PURE__*/React.createElement(React.Fragment, null);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
        className: classes.sectionHeading,
        variant: "overline"
      }, t('annotationCanvasLabel', {
        context: "".concat(index + 1, "/").concat(totalSize),
        label: label
      })), /*#__PURE__*/React.createElement(MenuList, {
        autoFocusItem: true,
        variant: "selectedMenu"
      }, annotations.map(function (annotation) {
        return /*#__PURE__*/React.createElement(ScrollTo, {
          containerRef: containerRef,
          key: "".concat(annotation.id, "-scroll"),
          offsetTop: 96 // offset for the height of the form above
          ,
          scrollTo: selectedAnnotationId === annotation.id
        }, /*#__PURE__*/React.createElement(MenuItem, {
          button: true,
          component: listContainerComponent,
          className: clsx(classes.annotationListItem, _defineProperty({}, classes.hovered, hoveredAnnotationIds.includes(annotation.id))),
          key: annotation.id,
          annotationid: annotation.id,
          selected: selectedAnnotationId === annotation.id,
          onClick: function onClick(e) {
            return _this2.handleClick(e, annotation);
          },
          onFocus: function onFocus() {
            return _this2.handleAnnotationHover(annotation);
          },
          onBlur: _this2.handleAnnotationBlur,
          onMouseEnter: function onMouseEnter() {
            return _this2.handleAnnotationHover(annotation);
          },
          onMouseLeave: _this2.handleAnnotationBlur
        }, /*#__PURE__*/React.createElement(ListItemText, {
          primaryTypographyProps: {
            variant: 'body2'
          }
        }, /*#__PURE__*/React.createElement(SanitizedHtml, {
          ruleSet: htmlSanitizationRuleSet,
          htmlString: annotation.content
        }), /*#__PURE__*/React.createElement("div", null, annotation.tags.map(function (tag) {
          return /*#__PURE__*/React.createElement(Chip, {
            size: "small",
            variant: "outlined",
            label: tag,
            id: tag,
            className: classes.chip,
            key: tag.toString()
          });
        })))));
      })));
    }
  }]);
}(Component);
CanvasAnnotations.defaultProps = {
  annotations: [],
  classes: {},
  containerRef: undefined,
  hoveredAnnotationIds: [],
  htmlSanitizationRuleSet: 'iiif',
  listContainerComponent: 'li',
  selectedAnnotationId: undefined
};