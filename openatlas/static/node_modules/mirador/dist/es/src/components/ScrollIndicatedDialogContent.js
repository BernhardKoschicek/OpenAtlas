var _excluded = ["classes", "className"];
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';

/**
 * ScrollIndicatedDialogContent ~ Inject a style into the DialogContent component
 *                                to indicate there is scrollable content
*/
export function ScrollIndicatedDialogContent(props) {
  var classes = props.classes,
    className = props.className,
    otherProps = _objectWithoutProperties(props, _excluded);
  var ourClassName = [className, classes.shadowScrollDialog].join(' ');
  return /*#__PURE__*/React.createElement(DialogContent, Object.assign({
    className: ourClassName
  }, otherProps));
}
ScrollIndicatedDialogContent.defaultProps = {
  className: ''
};