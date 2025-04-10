function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { createRemoveUpdate, updateTree } from 'react-mosaic-component/lib/util/mosaicUpdates';
import { getNodeAtPath, getOtherDirection, getPathToCorner, Corner } from 'react-mosaic-component/lib/util/mosaicUtilities';
import dropRight from 'lodash/dropRight';

/** */
var MosaicLayout = /*#__PURE__*/function () {
  /** */
  function MosaicLayout(layout) {
    _classCallCheck(this, MosaicLayout);
    this.layout = layout;
  }

  /** */
  return _createClass(MosaicLayout, [{
    key: "pathToCorner",
    value: function pathToCorner() {
      var corner = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Corner.TOP_RIGHT;
      return getPathToCorner(this.layout, corner);
    }

    /** */
  }, {
    key: "pathToParent",
    value: function pathToParent(path) {
      return getNodeAtPath(this.layout, dropRight(path));
    }

    /** */
  }, {
    key: "nodeAtPath",
    value: function nodeAtPath(path) {
      return getNodeAtPath(this.layout, path);
    }

    /**
     * addWindows - updates the layout with new windows using an algorithm ported
     * from the react-mosaic-components examples. Will always add to the Top Right
     * https://github.com/nomcopter/react-mosaic/blob/5081df8d1528d4c3b83a72763a46a30b3048fe95/demo/ExampleApp.tsx#L119-L154
     * @param {Array} addedWindowIds [description]
     */
  }, {
    key: "addWindows",
    value: function addWindows(addedWindowIds) {
      var _this = this;
      addedWindowIds.forEach(function (windowId, i) {
        var path = _this.pathToCorner();
        var parent = _this.pathToParent(path);
        var destination = _this.nodeAtPath(path);
        var direction = parent ? getOtherDirection(parent.direction) : 'row';
        var first;
        var second;
        if (direction === 'row') {
          first = destination;
          second = addedWindowIds[i];
        } else {
          first = addedWindowIds[i];
          second = destination;
        }
        var update = {
          path: path,
          spec: {
            $set: {
              direction: direction,
              first: first,
              second: second
            }
          }
        };
        // We cannot batch the updates together because we need to recalculate
        // the new location for each new window
        _this.layout = updateTree(_this.layout, [update]);
      });
    }

    /**
     * removeWindows - Generate a set of "removeUpdates" to update layout binary
     * tree. Then update the layout.
     * @param  {Array} removedWindowIds
     * @param  {Object} windowPaths - a lookup table for window paths
     */
  }, {
    key: "removeWindows",
    value: function removeWindows(removedWindowIds, windowPaths) {
      var _this2 = this;
      var removeUpdates = removedWindowIds.map(function (windowId) {
        return createRemoveUpdate(_this2.layout, windowPaths[windowId]);
      });
      this.layout = updateTree(this.layout, removeUpdates);
    }
  }]);
}();
export { MosaicLayout as default };