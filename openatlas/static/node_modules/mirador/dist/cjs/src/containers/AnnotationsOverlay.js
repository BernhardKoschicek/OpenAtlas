"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactI18next = require("react-i18next");
var _withPlugins = require("../extend/withPlugins");
var _AnnotationsOverlay = require("../components/AnnotationsOverlay");
var actions = _interopRequireWildcard(require("../state/actions"));
var _selectors = require("../state/selectors");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var windowId = _ref.windowId;
  return {
    annotations: (0, _selectors.getPresentAnnotationsOnSelectedCanvases)(state, {
      windowId: windowId
    }),
    canvasWorld: (0, _selectors.getCurrentCanvasWorld)(state, {
      windowId: windowId
    }),
    drawAnnotations: (0, _selectors.getConfig)(state).window.forceDrawAnnotations || (0, _selectors.getCompanionWindowsForContent)(state, {
      content: 'annotations',
      windowId: windowId
    }).length > 0,
    drawSearchAnnotations: (0, _selectors.getConfig)(state).window.forceDrawAnnotations || (0, _selectors.getCompanionWindowsForContent)(state, {
      content: 'search',
      windowId: windowId
    }).length > 0,
    highlightAllAnnotations: (0, _selectors.getWindow)(state, {
      windowId: windowId
    }).highlightAllAnnotations,
    hoveredAnnotationIds: (0, _selectors.getWindow)(state, {
      windowId: windowId
    }).hoveredAnnotationIds,
    palette: (0, _selectors.getTheme)(state).palette,
    searchAnnotations: (0, _selectors.getSearchAnnotationsForWindow)(state, {
      windowId: windowId
    }),
    selectedAnnotationId: (0, _selectors.getSelectedAnnotationId)(state, {
      windowId: windowId
    })
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
var mapDispatchToProps = {
  deselectAnnotation: actions.deselectAnnotation,
  hoverAnnotation: actions.hoverAnnotation,
  selectAnnotation: actions.selectAnnotation
};
var enhance = (0, _redux.compose)((0, _reactI18next.withTranslation)(), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _withPlugins.withPlugins)('AnnotationsOverlay'));
var _default = exports["default"] = enhance(_AnnotationsOverlay.AnnotationsOverlay);