"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactI18next = require("react-i18next");
var _styles = require("@material-ui/core/styles");
var _withPlugins = require("../extend/withPlugins");
var _WorkspaceControlPanel = require("../components/WorkspaceControlPanel");
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)},
 * drawer: {overflowX: string, height: string}}}
 */
var styles = function styles(theme) {
  return {
    branding: _defineProperty(_defineProperty(_defineProperty({
      display: 'flex',
      position: 'absolute'
    }, theme.breakpoints.up('xs'), {
      display: 'none'
    }), theme.breakpoints.up('sm'), {
      bottom: 0,
      display: 'block',
      "float": 'none',
      right: 'auto',
      width: '100%'
    }), "right", 0),
    ctrlBtn: {
      margin: theme.spacing(1)
    },
    drawer: {
      overflowX: 'hidden'
    },
    root: _defineProperty({
      height: 64
    }, theme.breakpoints.up('sm'), {
      height: '100%',
      left: 0,
      right: 'auto',
      width: 64
    }),
    toolbar: _defineProperty({
      display: 'flex',
      justifyContent: 'space-between'
    }, theme.breakpoints.up('sm'), {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      minHeight: 0
    }),
    wide: {
      width: 'auto'
    },
    workspaceButtons: _defineProperty({}, theme.breakpoints.up('sm'), {
      display: 'flex',
      flexDirection: 'column'
    })
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _withPlugins.withPlugins)('WorkspaceControlPanel')
// further HOC go here
);
var _default = exports["default"] = enhance(_WorkspaceControlPanel.WorkspaceControlPanel);