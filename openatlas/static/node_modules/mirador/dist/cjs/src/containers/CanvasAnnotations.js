"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var _styles = require("@material-ui/core/styles");
var _withPlugins = require("../extend/withPlugins");
var actions = _interopRequireWildcard(require("../state/actions"));
var _selectors = require("../state/selectors");
var _CanvasAnnotations = require("../components/CanvasAnnotations");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * @param {Array} resources
 * @return {Array} [{ id: 'abc123', content: 'Annotation Content' }, ...]
 */
function getIdAndContentOfResources(resources) {
  return resources.map(function (resource, i) {
    return {
      content: resource.chars,
      id: resource.id,
      tags: resource.tags,
      targetId: resource.targetId
    };
  });
}

/** For connect */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var canvasId = _ref.canvasId,
    windowId = _ref.windowId;
  return {
    annotations: getIdAndContentOfResources((0, _selectors.getAnnotationResourcesByMotivationForCanvas)(state, {
      canvasId: canvasId,
      windowId: windowId
    })),
    htmlSanitizationRuleSet: (0, _selectors.getConfig)(state).annotations.htmlSanitizationRuleSet,
    label: (0, _selectors.getCanvasLabel)(state, {
      canvasId: canvasId,
      windowId: windowId
    }),
    selectedAnnotationId: (0, _selectors.getSelectedAnnotationId)(state, {
      windowId: windowId
    })
  };
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
var mapDispatchToProps = {
  deselectAnnotation: actions.deselectAnnotation,
  hoverAnnotation: actions.hoverAnnotation,
  selectAnnotation: actions.selectAnnotation
};

/** For withStlyes */
var styles = function styles(theme) {
  return {
    annotationListItem: {
      '&$hovered': {
        backgroundColor: theme.palette.action.hover
      },
      '&:hover,&:focus': {
        backgroundColor: theme.palette.action.hover
      },
      borderBottom: "0.5px solid ".concat(theme.palette.divider),
      cursor: 'pointer',
      whiteSpace: 'normal'
    },
    chip: {
      backgroundColor: theme.palette.background.paper,
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(1)
    },
    hovered: {},
    sectionHeading: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(2)
    }
  };
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _styles.withStyles)(styles), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('CanvasAnnotations'));
var _default = exports["default"] = enhance(_CanvasAnnotations.CanvasAnnotations);