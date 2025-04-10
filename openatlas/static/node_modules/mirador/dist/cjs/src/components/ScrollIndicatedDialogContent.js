"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollIndicatedDialogContent = ScrollIndicatedDialogContent;
var _react = _interopRequireDefault(require("react"));
var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));
var _excluded = ["classes", "className"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
/**
 * ScrollIndicatedDialogContent ~ Inject a style into the DialogContent component
 *                                to indicate there is scrollable content
*/
function ScrollIndicatedDialogContent(props) {
  var classes = props.classes,
    className = props.className,
    otherProps = _objectWithoutProperties(props, _excluded);
  var ourClassName = [className, classes.shadowScrollDialog].join(' ');
  return /*#__PURE__*/_react["default"].createElement(_DialogContent["default"], Object.assign({
    className: ourClassName
  }, otherProps));
}
ScrollIndicatedDialogContent.defaultProps = {
  className: ''
};