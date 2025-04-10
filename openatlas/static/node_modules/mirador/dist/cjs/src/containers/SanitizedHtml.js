"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _styles = require("@material-ui/core/styles");
var _SanitizedHtml = require("../components/SanitizedHtml");
/**
 * Styles for withStyles HOC
 */
var styles = function styles(theme) {
  return {
    root: {
      '& a': {
        color: theme.palette.primary.main,
        textDecoration: 'underline'
      }
    }
  };
};
var _default = exports["default"] = (0, _styles.withStyles)(styles)(_SanitizedHtml.SanitizedHtml);