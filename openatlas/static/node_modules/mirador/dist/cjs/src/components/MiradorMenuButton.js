"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiradorMenuButton = MiradorMenuButton;
var _react = _interopRequireDefault(require("react"));
var _Badge = _interopRequireDefault(require("@material-ui/core/Badge"));
var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));
var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));
var _cssNs = _interopRequireDefault(require("../config/css-ns"));
var _excluded = ["badge", "children", "containerId", "dispatch", "BadgeProps", "TooltipProps"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
/**
 * MiradorMenuButton ~ Wrap the given icon prop in an IconButton and a Tooltip.
 * This shares the passed in aria-label w/ the Tooltip (as title) and the IconButton
 * All props besides icon are spread to the IconButton component
*/
function MiradorMenuButton(props) {
  var ariaLabel = props['aria-label'];
  var badge = props.badge,
    children = props.children,
    containerId = props.containerId,
    dispatch = props.dispatch,
    BadgeProps = props.BadgeProps,
    TooltipProps = props.TooltipProps,
    iconButtonProps = _objectWithoutProperties(props, _excluded);
  var button = /*#__PURE__*/_react["default"].createElement(_IconButton["default"], iconButtonProps, badge ? /*#__PURE__*/_react["default"].createElement(_Badge["default"], BadgeProps, children) : children);
  if (iconButtonProps.disabled) return button;
  return /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], Object.assign({
    PopperProps: {
      container: document.querySelector("#".concat(containerId, " .").concat((0, _cssNs["default"])('viewer')))
    },
    title: ariaLabel
  }, TooltipProps), button);
}
MiradorMenuButton.defaultProps = {
  badge: false,
  BadgeProps: {},
  dispatch: function dispatch() {},
  TooltipProps: {}
};