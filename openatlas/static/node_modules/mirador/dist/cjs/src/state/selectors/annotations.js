"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectedAnnotationsOnCanvases = exports.getSelectedAnnotationId = exports.getPresentAnnotationsOnSelectedCanvases = exports.getAnnotations = exports.getAnnotationResourcesByMotivationForCanvas = exports.getAnnotationResourcesByMotivation = void 0;
var _reselect = require("reselect");
var _filter = _interopRequireDefault(require("lodash/filter"));
var _flatten = _interopRequireDefault(require("lodash/flatten"));
var _AnnotationFactory = _interopRequireDefault(require("../../lib/AnnotationFactory"));
var _utils = require("./utils");
var _canvases = require("./canvases");
var _config = require("./config");
var _getters = require("./getters");
var _excluded = ["canvasId"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
/** */
var getAnnotations = exports.getAnnotations = function getAnnotations(state) {
  return (0, _utils.miradorSlice)(state).annotations;
};
var getMotivation = (0, _reselect.createSelector)([_config.getConfig, function (state, _ref) {
  var motivations = _ref.motivations;
  return motivations;
}], function (config, motivations) {
  return motivations || config.annotations.filteredMotivations;
});
var getAnnotationsOnCanvas = (0, _reselect.createSelector)([_canvases.getCanvas, getAnnotations], function (canvas, annotations) {
  if (!annotations || !canvas) return [];
  if (!annotations[canvas.id]) return [];
  return (0, _flatten["default"])(Object.values(annotations[canvas.id]));
});
var getPresentAnnotationsCanvas = (0, _reselect.createSelector)([getAnnotationsOnCanvas], function (annotations) {
  return (0, _filter["default"])(Object.values(annotations).map(function (annotation) {
    return annotation && _AnnotationFactory["default"].determineAnnotation(annotation.json);
  }), function (annotation) {
    return annotation && annotation.present();
  });
});
var getAnnotationsOnSelectedCanvases = (0, _reselect.createSelector)([function (state, _ref2) {
  var canvasId = _ref2.canvasId,
    otherProps = _objectWithoutProperties(_ref2, _excluded);
  return canvasId ? [canvasId] : (0, _canvases.getVisibleCanvasIds)(state, otherProps);
}, getAnnotations], function (canvasIds, annotations) {
  if (!annotations || canvasIds.length === 0) return [];
  return (0, _flatten["default"])(canvasIds.map(function (targetId) {
    return annotations[targetId] && Object.values(annotations[targetId]);
  }));
});
var getPresentAnnotationsOnSelectedCanvases = exports.getPresentAnnotationsOnSelectedCanvases = (0, _reselect.createSelector)([getAnnotationsOnSelectedCanvases], function (annotations) {
  return (0, _filter["default"])(Object.values(annotations).map(function (annotation) {
    return annotation && _AnnotationFactory["default"].determineAnnotation(annotation.json);
  }), function (annotation) {
    return annotation && annotation.present();
  });
});

/**
* Return an array of annotation resources filtered by the given motivation for a particular canvas
* @param {Array} annotations
* @param {Array} motivations
* @return {Array}
*/
var getAnnotationResourcesByMotivationForCanvas = exports.getAnnotationResourcesByMotivationForCanvas = (0, _reselect.createSelector)([getPresentAnnotationsCanvas, getMotivation], function (annotations, motivations) {
  return (0, _filter["default"])((0, _flatten["default"])(annotations.map(function (annotation) {
    return annotation.resources;
  })), function (resource) {
    return resource.motivations.some(function (motivation) {
      return motivations.includes(motivation);
    });
  });
});

/**
* Return an array of annotation resources filtered by the given motivation
* @param {Array} annotations
* @param {Array} motivations
* @return {Array}
*/
var getAnnotationResourcesByMotivation = exports.getAnnotationResourcesByMotivation = (0, _reselect.createSelector)([getPresentAnnotationsOnSelectedCanvases, getMotivation], function (annotations, motivations) {
  return (0, _filter["default"])((0, _flatten["default"])(annotations.map(function (annotation) {
    return annotation.resources;
  })), function (resource) {
    return resource.motivations.some(function (motivation) {
      return motivations.includes(motivation);
    });
  });
});

/**
 * Return the selected annotations IDs of a given CanvasId
 * @param {Object} state
 * @param {String} windowId
 * @param {Array} targetIds
 * @return {Array}
 */
var getSelectedAnnotationId = exports.getSelectedAnnotationId = (0, _reselect.createSelector)([_getters.getWindow], function (_ref3) {
  var selectedAnnotationId = _ref3.selectedAnnotationId;
  return selectedAnnotationId;
});
var getSelectedAnnotationsOnCanvases = exports.getSelectedAnnotationsOnCanvases = (0, _reselect.createSelector)([getPresentAnnotationsOnSelectedCanvases, getSelectedAnnotationId], function (canvasAnnotations, selectedAnnotationId) {
  return canvasAnnotations.map(function (annotation) {
    return {
      id: annotation['@id'] || annotation.id,
      resources: annotation.resources.filter(function (r) {
        return selectedAnnotationId === r.id;
      })
    };
  }).filter(function (val) {
    return val.resources.length > 0;
  });
});