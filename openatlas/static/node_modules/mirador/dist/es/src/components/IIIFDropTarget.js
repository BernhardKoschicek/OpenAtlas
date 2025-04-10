function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import InsertDriveFileSharpIcon from '@material-ui/icons/InsertDriveFileSharp';
import { grey } from '@material-ui/core/colors';
import { v4 as uuid } from 'uuid';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrop } from 'react-dnd';
import { readImageMetadata } from '../lib/readImageMetadata';

/** */
export var handleDrop = function handleDrop(item, monitor, props) {
  var onDrop = props.onDrop;
  if (item.urls) {
    item.urls.forEach(function (str) {
      var url = new URL(str);
      var manifestId = url.searchParams.get('manifest');
      var canvasId = url.searchParams.get('canvas');
      if (manifestId) onDrop({
        canvasId: canvasId,
        manifestId: manifestId
      }, props, monitor);
    });
  }
  if (item.files) {
    var manifestFiles = item.files.filter(function (f) {
      return f.type === 'application/json';
    });
    var manifestPromises = manifestFiles.map(function (file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          var manifestJson = reader.result;
          var manifestId = uuid();
          if (manifestJson) onDrop({
            manifestId: manifestId,
            manifestJson: manifestJson
          }, props, monitor);
          resolve();
        });
        reader.readAsText(file);
      });
    });
    var imageFiles = item.files.filter(function (_ref) {
      var type = _ref.type;
      return type.startsWith('image/');
    });
    var imagePromise;
    if (imageFiles.length > 0) {
      var id = uuid();
      var imageData = imageFiles.map(function (file) {
        return readImageMetadata(file);
      });
      imagePromise = Promise.all(imageData).then(function (images) {
        var manifestJson = {
          '@context': 'http://iiif.io/api/presentation/3/context.json',
          id: id,
          items: images.map(function (_ref2, index) {
            var name = _ref2.name,
              type = _ref2.type,
              width = _ref2.width,
              height = _ref2.height,
              url = _ref2.url;
            return {
              height: height,
              id: "".concat(id, "/canvas/").concat(index),
              items: [{
                id: "".concat(id, "/canvas/").concat(index, "/1"),
                items: [{
                  body: {
                    format: type,
                    id: url,
                    type: 'Image'
                  },
                  height: height,
                  id: "".concat(id, "/canvas/").concat(index, "/1/image"),
                  motivation: 'painting',
                  target: "".concat(id, "/canvas/").concat(index, "/1"),
                  type: 'Annotation',
                  width: width
                }],
                type: 'AnnotationPage'
              }],
              label: name,
              type: 'Canvas',
              width: width
            };
          }),
          label: images[0].name,
          type: 'Manifest'
        };
        var manifestId = uuid();
        if (manifestJson) onDrop({
          manifestId: manifestId,
          manifestJson: manifestJson
        }, props, monitor);
      });
    }
    return Promise.all([].concat(_toConsumableArray(manifestPromises), [imagePromise]));
  }
  return undefined;
};

/** */
export var IIIFDropTarget = function IIIFDropTarget(props) {
  var children = props.children,
    onDrop = props.onDrop;
  var _useDrop = useDrop({
      accept: [NativeTypes.URL, NativeTypes.FILE],
      collect: function collect(monitor) {
        return {
          canDrop: monitor.canDrop(),
          isOver: monitor.isOver()
        };
      },
      /** */drop: function drop(item, monitor) {
        if (!onDrop) return;
        handleDrop(item, monitor, props);
      }
    }),
    _useDrop2 = _slicedToArray(_useDrop, 2),
    _useDrop2$ = _useDrop2[0],
    canDrop = _useDrop2$.canDrop,
    isOver = _useDrop2$.isOver,
    drop = _useDrop2[1];

  /**
   * Safari reports drag+drop'ed urls as both a file and uri-list
   * which gets mis-classified by react-dnd.
   */
  var hackForSafari = function hackForSafari(e) {
    if (!window.safari || !onDrop || !e.dataTransfer) return;
    if (e.dataTransfer.types.includes('Files') && e.dataTransfer.types.includes('text/uri-list')) {
      var url = e.dataTransfer.getData('text/uri-list');
      if (!url) return;
      handleDrop({
        urls: [url]
      }, null, props);
    }
  };
  var isActive = canDrop && isOver;
  return /*#__PURE__*/React.createElement("div", {
    ref: drop,
    onDrop: hackForSafari,
    style: {
      height: '100%',
      width: '100%'
    }
  }, children, /*#__PURE__*/React.createElement(Backdrop, {
    open: isActive,
    style: {
      zIndex: 9999
    }
  }, /*#__PURE__*/React.createElement(InsertDriveFileSharpIcon, {
    style: {
      color: grey[400],
      fontSize: 256
    }
  })));
};