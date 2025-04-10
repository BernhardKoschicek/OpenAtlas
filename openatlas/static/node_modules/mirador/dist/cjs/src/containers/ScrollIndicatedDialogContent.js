"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _styles = require("@material-ui/core/styles");
var _ScrollIndicatedDialogContent = require("../components/ScrollIndicatedDialogContent");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Styles for the withStyles HOC
 */
var styles = function styles(theme) {
  return {
    shadowScrollDialog: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      /* Shadow covers */
      background: "linear-gradient(".concat(theme.palette.background.paper, " 30%, rgba(255, 255, 255, 0)), ") + "linear-gradient(rgba(255, 255, 255, 0), ".concat(theme.palette.background.paper, " 70%) 0 100%, ")
      // Shaddows
      + 'radial-gradient(50% 0, farthest-side, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)), ' + 'radial-gradient(50% 100%, farthest-side, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)) 0 100%,'
    }, "background", "linear-gradient(".concat(theme.palette.background.paper, " 30%, rgba(255, 255, 255, 0)), ") // eslint-disable-line no-dupe-keys
    + "linear-gradient(rgba(255, 255, 255, 0), ".concat(theme.palette.background.paper, " 70%) 0 100%, ")
    // Shaddows
    + 'radial-gradient(farthest-side at 50% 0, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)), ' + 'radial-gradient(farthest-side at 50% 100%, rgba(0, 0, 0, .2), rgba(0, 0, 0, 0)) 0 100%;'), "backgroundAttachment", 'local, local, scroll, scroll'), "backgroundRepeat", 'no-repeat'), "backgroundSize", '100% 40px, 100% 40px, 100% 14px, 100% 14px'), "overflowY", 'auto')
  };
};
var _default = exports["default"] = (0, _styles.withStyles)(styles)(_ScrollIndicatedDialogContent.ScrollIndicatedDialogContent);