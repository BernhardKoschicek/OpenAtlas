"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectInfoResponses = exports.selectInfoResponse = exports.getVisibleCanvases = exports.getVisibleCanvasVideoResources = exports.getVisibleCanvasNonTiledResources = exports.getVisibleCanvasIds = exports.getVisibleCanvasCaptions = exports.getVisibleCanvasAudioResources = exports.getPreviousCanvasGrouping = exports.getNextCanvasGrouping = exports.getCurrentCanvas = exports.getCanvases = exports.getCanvasLabel = exports.getCanvasGroupings = exports.getCanvasGrouping = exports.getCanvasDescription = exports.getCanvas = void 0;
var _reselect = require("reselect");
var _flatten = _interopRequireDefault(require("lodash/flatten"));
var _CanvasGroupings = _interopRequireDefault(require("../../lib/CanvasGroupings"));
var _MiradorCanvas = _interopRequireDefault(require("../../lib/MiradorCanvas"));
var _utils = require("./utils");
var _getters = require("./getters");
var _sequences = require("./sequences");
var _windows = require("./windows");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/** */
var selectInfoResponses = exports.selectInfoResponses = function selectInfoResponses(state) {
  return (0, _utils.miradorSlice)(state).infoResponses;
};
var getCanvases = exports.getCanvases = (0, _reselect.createSelector)([_sequences.getSequence], function (sequence) {
  return sequence && sequence.getCanvases() || [];
});

/**
* Return the canvas selected by an id
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Object}
*/
var getCanvas = exports.getCanvas = (0, _reselect.createSelector)([_sequences.getSequence, function (state, _ref) {
  var canvasId = _ref.canvasId;
  return canvasId;
}], function (sequence, canvasId) {
  if (!sequence || !canvasId) return undefined;
  return sequence.getCanvasById(canvasId);
});
var getCurrentCanvas = exports.getCurrentCanvas = (0, _reselect.createSelector)([_sequences.getSequence, _getters.getWindow], function (sequence, window) {
  if (!sequence || !window) return undefined;
  if (!window.canvasId) return sequence.getCanvasByIndex(0);
  return sequence.getCanvasById(window.canvasId);
});

/** */
var getVisibleCanvasIds = exports.getVisibleCanvasIds = (0, _reselect.createSelector)([_getters.getWindow], function (window) {
  return window && (window.visibleCanvases || window.canvasId && [window.canvasId]) || [];
});

/** */
var getVisibleCanvases = exports.getVisibleCanvases = (0, _reselect.createSelector)([getVisibleCanvasIds, getCanvases], function (canvasIds, canvases) {
  return (canvases || []).filter(function (c) {
    return canvasIds.includes(c.id);
  });
});

/**
* Return the current canvases grouped by how they'll appear in the viewer
* For book view returns groups of 2, for single returns 1
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Array}
*/
var getCanvasGroupings = exports.getCanvasGroupings = (0, _reselect.createSelector)([getCanvases, _windows.getWindowViewType], function (canvases, view) {
  return canvases && new _CanvasGroupings["default"](canvases, view).groupings();
});

/**
* Return the current canvases selected in a window
* For book view returns 2, for single returns 1
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Array}
*/
var getCanvasGrouping = exports.getCanvasGrouping = (0, _reselect.createSelector)([getCanvasGroupings, function (state, _ref2) {
  var canvasId = _ref2.canvasId;
  return canvasId;
}], function (groupings, canvasId) {
  return groupings && groupings.find(function (group) {
    return group.some(function (c) {
      return c.id === canvasId;
    });
  }) || [];
});

/**
* Return the next canvas(es) for a window
* For book view returns 2, for single returns 1
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Array}
*/
var getNextCanvasGrouping = exports.getNextCanvasGrouping = (0, _reselect.createSelector)([getCanvasGroupings, getCurrentCanvas], function (groupings, canvas, view) {
  if (!groupings || !canvas) return undefined;
  var currentGroupIndex = groupings.findIndex(function (group) {
    return group.some(function (c) {
      return c.id === canvas.id;
    });
  });
  if (currentGroupIndex < 0 || currentGroupIndex + 1 >= groupings.length) return undefined;
  var newGroup = groupings[currentGroupIndex + 1];
  return newGroup;
});

/**
* Return the previous canvas(es) for a window
* For book view returns 2, for single returns 1
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {Array}
*/
var getPreviousCanvasGrouping = exports.getPreviousCanvasGrouping = (0, _reselect.createSelector)([getCanvasGroupings, getCurrentCanvas], function (groupings, canvas, view) {
  if (!groupings || !canvas) return undefined;
  var currentGroupIndex = groupings.findIndex(function (group) {
    return group.some(function (c) {
      return c.id === canvas.id;
    });
  });
  if (currentGroupIndex < 1) return undefined;
  var newGroup = groupings[currentGroupIndex - 1];
  return newGroup;
});

/**
* Return canvas label, or alternatively return the given index + 1 to be displayed
* @param {object} canvas
* @return {String|Integer}
*/
var getCanvasLabel = exports.getCanvasLabel = (0, _reselect.createSelector)([getCanvas], function (canvas) {
  return canvas && (canvas.getLabel().length > 0 ? canvas.getLabel().getValue() : String(canvas.index + 1));
});

/**
* Return canvas description
* @param {object} canvas
* @param {String}
*/
var getCanvasDescription = exports.getCanvasDescription = (0, _reselect.createSelector)([getCanvas], function (canvas) {
  return canvas && canvas.getProperty('description');
});
var getVisibleCanvasNonTiledResources = exports.getVisibleCanvasNonTiledResources = (0, _reselect.createSelector)([getVisibleCanvases], function (canvases) {
  return (0, _flatten["default"])(canvases.map(function (canvas) {
    return new _MiradorCanvas["default"](canvas).imageResources;
  })).filter(function (resource) {
    return resource.getServices().length < 1;
  });
});
var getVisibleCanvasVideoResources = exports.getVisibleCanvasVideoResources = (0, _reselect.createSelector)([getVisibleCanvases], function (canvases) {
  return (0, _flatten["default"])(canvases.map(function (canvas) {
    return new _MiradorCanvas["default"](canvas).videoResources;
  }));
});
var getVisibleCanvasCaptions = exports.getVisibleCanvasCaptions = (0, _reselect.createSelector)([getVisibleCanvases], function (canvases) {
  return (0, _flatten["default"])(canvases.map(function (canvas) {
    return new _MiradorCanvas["default"](canvas).vttContent;
  }));
});
var getVisibleCanvasAudioResources = exports.getVisibleCanvasAudioResources = (0, _reselect.createSelector)([getVisibleCanvases], function (canvases) {
  return (0, _flatten["default"])(canvases.map(function (canvas) {
    return new _MiradorCanvas["default"](canvas).audioResources;
  }));
});
var selectInfoResponse = exports.selectInfoResponse = (0, _reselect.createSelector)([function (state, _ref3) {
  var infoId = _ref3.infoId;
  return infoId;
}, getCanvas, selectInfoResponses], function (infoId, canvas, infoResponses) {
  var iiifServiceId = infoId;
  if (!infoId) {
    if (!canvas) return undefined;
    var miradorCanvas = new _MiradorCanvas["default"](canvas);
    var image = miradorCanvas.iiifImageResources[0];
    iiifServiceId = image && image.getServices()[0].id;
  }
  return iiifServiceId && infoResponses[iiifServiceId] && !infoResponses[iiifServiceId].isFetching && infoResponses[iiifServiceId];
});