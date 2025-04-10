function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { compose } from 'redux';
import { connect } from 'react-redux';
import flatten from 'lodash/flatten';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../state/actions';
import { GalleryViewThumbnail } from '../components/GalleryViewThumbnail';
import { getSearchAnnotationsForWindow, getCurrentCanvas, getConfig, getPresentAnnotationsOnSelectedCanvases, getCompanionWindowsForContent } from '../state/selectors';

/**
 * Styles to be passed to the withStyles HOC
 */
var styles = function styles(theme) {
  return {
    annotationIcon: {
      height: '1rem',
      width: '1rem'
    },
    annotationsChip: _objectSpread({}, theme.typography.caption),
    avatar: {
      backgroundColor: 'transparent'
    },
    chips: {
      opacity: 0.875,
      position: 'absolute',
      right: 0,
      textAlign: 'right',
      top: 0
    },
    galleryViewItem: {
      '&$hasAnnotations': {
        border: "2px solid ".concat(theme.palette.action.selected)
      },
      '&$selected,&$selected$hasAnnotations': {
        border: "2px solid ".concat(theme.palette.primary.main)
      },
      '&:focus': {
        outline: 'none'
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      },
      border: '2px solid transparent',
      cursor: 'pointer',
      display: 'inline-block',
      margin: "".concat(theme.spacing(1), "px ").concat(theme.spacing(0.5), "px"),
      maxHeight: function maxHeight(props) {
        return props.config.height + 45;
      },
      minWidth: '60px',
      overflow: 'hidden',
      padding: theme.spacing(0.5),
      position: 'relative',
      width: 'min-content'
    },
    hasAnnotations: {},
    searchChip: _objectSpread(_objectSpread({}, theme.typography.caption), {}, {
      '&$selected $avatar': {
        backgroundColor: theme.palette.highlights.primary
      },
      marginTop: 2
    }),
    selected: {}
  };
};

/** */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var canvas = _ref.canvas,
    windowId = _ref.windowId;
  var currentCanvas = getCurrentCanvas(state, {
    windowId: windowId
  });
  var searchAnnotations = getSearchAnnotationsForWindow(state, {
    windowId: windowId
  });
  var canvasAnnotations = flatten(searchAnnotations.map(function (a) {
    return a.resources;
  })).filter(function (a) {
    return a.targetId === canvas.id;
  });
  var hasOpenAnnotationsWindow = getCompanionWindowsForContent(state, {
    content: 'annotations',
    windowId: windowId
  }).length > 0;
  return {
    annotationsCount: function () {
      if (!hasOpenAnnotationsWindow) return undefined;
      var annotations = getPresentAnnotationsOnSelectedCanvases(state, {
        canvasId: canvas.id
      });
      return annotations.reduce(function (v, a) {
        return v + a.resources.filter(function (r) {
          return r.targetId === canvas.id;
        }).length;
      }, 0);
    }(),
    config: getConfig(state).galleryView,
    searchAnnotationsCount: canvasAnnotations.length,
    selected: currentCanvas && currentCanvas.id === canvas.id
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowViewer
 * @private
 */
var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref2) {
  var canvas = _ref2.canvas,
    id = _ref2.id,
    windowId = _ref2.windowId;
  return {
    focusOnCanvas: function focusOnCanvas() {
      return dispatch(actions.setWindowViewType(windowId, 'single'));
    },
    requestCanvasAnnotations: function requestCanvasAnnotations() {
      return dispatch(actions.requestCanvasAnnotations(windowId, canvas.id));
    },
    setCanvas: function setCanvas() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return dispatch(actions.setCanvas.apply(actions, [windowId].concat(args)));
    }
  };
};
var enhance = compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles)
// further HOC go here
);
export default enhance(GalleryViewThumbnail);