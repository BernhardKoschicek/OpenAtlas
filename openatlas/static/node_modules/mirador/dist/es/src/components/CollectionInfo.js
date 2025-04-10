function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == typeof e || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ViewListIcon from '@material-ui/icons/ViewListSharp';
import CollapsibleSection from '../containers/CollapsibleSection';

/**
 * ManifestInfo
 */
export var CollectionInfo = /*#__PURE__*/function (_Component) {
  /** */
  function CollectionInfo(props) {
    var _this;
    _classCallCheck(this, CollectionInfo);
    _this = _callSuper(this, CollectionInfo, [props]);
    _this.openCollectionDialog = _this.openCollectionDialog.bind(_this);
    return _this;
  }

  /** */
  _inherits(CollectionInfo, _Component);
  return _createClass(CollectionInfo, [{
    key: "openCollectionDialog",
    value: function openCollectionDialog() {
      var _this$props = this.props,
        collectionPath = _this$props.collectionPath,
        showCollectionDialog = _this$props.showCollectionDialog,
        windowId = _this$props.windowId;
      var manifestId = collectionPath[collectionPath.length - 1];
      showCollectionDialog(manifestId, collectionPath.slice(0, -1), windowId);
    }

    /**
     * render
     * @return
     */
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        collectionLabel = _this$props2.collectionLabel,
        collectionPath = _this$props2.collectionPath,
        id = _this$props2.id,
        t = _this$props2.t;
      if (collectionPath.length === 0) return null;
      return /*#__PURE__*/React.createElement(CollapsibleSection, {
        id: "".concat(id, "-collection"),
        label: t('collection')
      }, collectionLabel && /*#__PURE__*/React.createElement(Typography, {
        "aria-labelledby": "".concat(id, "-resource ").concat(id, "-resource-heading"),
        id: "".concat(id, "-resource-heading"),
        variant: "h4"
      }, collectionLabel), /*#__PURE__*/React.createElement(Button, {
        color: "primary",
        onClick: this.openCollectionDialog,
        startIcon: /*#__PURE__*/React.createElement(ViewListIcon, null)
      }, t('showCollection')));
    }
  }]);
}(Component);
CollectionInfo.defaultProps = {
  collectionLabel: null,
  collectionPath: [],
  t: function t(key) {
    return key;
  },
  windowId: null
};