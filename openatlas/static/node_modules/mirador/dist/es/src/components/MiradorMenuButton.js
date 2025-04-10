var _excluded = ["badge", "children", "containerId", "dispatch", "BadgeProps", "TooltipProps"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ns from '../config/css-ns';

/**
 * MiradorMenuButton ~ Wrap the given icon prop in an IconButton and a Tooltip.
 * This shares the passed in aria-label w/ the Tooltip (as title) and the IconButton
 * All props besides icon are spread to the IconButton component
*/
export function MiradorMenuButton(props) {
  var ariaLabel = props['aria-label'];
  var badge = props.badge,
    children = props.children,
    containerId = props.containerId,
    dispatch = props.dispatch,
    BadgeProps = props.BadgeProps,
    TooltipProps = props.TooltipProps,
    iconButtonProps = _objectWithoutProperties(props, _excluded);
  var button = /*#__PURE__*/React.createElement(IconButton, iconButtonProps, badge ? /*#__PURE__*/React.createElement(Badge, BadgeProps, children) : children);
  if (iconButtonProps.disabled) return button;
  return /*#__PURE__*/React.createElement(Tooltip, Object.assign({
    PopperProps: {
      container: document.querySelector("#".concat(containerId, " .").concat(ns('viewer')))
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