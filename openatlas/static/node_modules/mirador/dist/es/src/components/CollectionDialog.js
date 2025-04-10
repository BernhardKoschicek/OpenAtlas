function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
import { Button, Chip, Dialog, DialogActions, DialogTitle, Link, MenuList, MenuItem, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBackSharp';
import Skeleton from '@material-ui/lab/Skeleton';
import asArray from '../lib/asArray';
import { LabelValueMetadata } from './LabelValueMetadata';
import CollapsibleSection from '../containers/CollapsibleSection';
import ScrollIndicatedDialogContent from '../containers/ScrollIndicatedDialogContent';
import ManifestInfo from '../containers/ManifestInfo';

/**
 * a dialog providing the possibility to select the collection
 */
export var CollectionDialog = /*#__PURE__*/function (_Component) {
  /** */
  function CollectionDialog(props) {
    var _this;
    _classCallCheck(this, CollectionDialog);
    _this = _callSuper(this, CollectionDialog, [props]);
    _this.state = {
      filter: null
    };
    _this.hideDialog = _this.hideDialog.bind(_this);
    return _this;
  }

  /** */
  _inherits(CollectionDialog, _Component);
  return _createClass(CollectionDialog, [{
    key: "setFilter",
    value: function setFilter(filter) {
      this.setState({
        filter: filter
      });
    }

    /** */
  }, {
    key: "hideDialog",
    value: function hideDialog() {
      var _this$props = this.props,
        hideCollectionDialog = _this$props.hideCollectionDialog,
        windowId = _this$props.windowId;
      hideCollectionDialog(windowId);
    }

    /** */
  }, {
    key: "selectCollection",
    value: function selectCollection(c) {
      var _this$props2 = this.props,
        collectionPath = _this$props2.collectionPath,
        manifestId = _this$props2.manifestId,
        showCollectionDialog = _this$props2.showCollectionDialog,
        windowId = _this$props2.windowId;
      showCollectionDialog(c.id, [].concat(_toConsumableArray(collectionPath), [manifestId]), windowId);
    }

    /** */
  }, {
    key: "goToPreviousCollection",
    value: function goToPreviousCollection() {
      var _this$props3 = this.props,
        collectionPath = _this$props3.collectionPath,
        showCollectionDialog = _this$props3.showCollectionDialog,
        windowId = _this$props3.windowId;
      showCollectionDialog(collectionPath[collectionPath.length - 1], collectionPath.slice(0, -1), windowId);
    }

    /** */
  }, {
    key: "selectManifest",
    value: function selectManifest(m) {
      var _this$props4 = this.props,
        addWindow = _this$props4.addWindow,
        collectionPath = _this$props4.collectionPath,
        manifestId = _this$props4.manifestId,
        setWorkspaceAddVisibility = _this$props4.setWorkspaceAddVisibility,
        updateWindow = _this$props4.updateWindow,
        windowId = _this$props4.windowId;
      if (windowId) {
        updateWindow(windowId, {
          canvasId: null,
          collectionPath: [].concat(_toConsumableArray(collectionPath), [manifestId]),
          manifestId: m.id
        });
      } else {
        addWindow({
          collectionPath: [].concat(_toConsumableArray(collectionPath), [manifestId]),
          manifestId: m.id
        });
      }
      this.hideDialog();
      setWorkspaceAddVisibility(false);
    }

    /** */
  }, {
    key: "dialogContainer",
    value: function dialogContainer() {
      var _this$props5 = this.props,
        containerId = _this$props5.containerId,
        windowId = _this$props5.windowId;
      return document.querySelector("#".concat(containerId, " #").concat(windowId));
    }

    /** */
  }, {
    key: "placeholder",
    value: function placeholder() {
      var classes = this.props.classes;
      return /*#__PURE__*/React.createElement(Dialog, {
        className: classes.dialog,
        onClose: this.hideDialog,
        open: true,
        container: this.dialogContainer(),
        BackdropProps: this.backdropProps()
      }, /*#__PURE__*/React.createElement(DialogTitle, {
        id: "select-collection",
        disableTypography: true
      }, /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      })), /*#__PURE__*/React.createElement(ScrollIndicatedDialogContent, null, /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      }), /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      })));
    }

    /** */
  }, {
    key: "backdropProps",
    value: function backdropProps() {
      var classes = this.props.classes;
      return {
        classes: {
          root: classes.dialog
        }
      };
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props6 = this.props,
        classes = _this$props6.classes,
        collection = _this$props6.collection,
        error = _this$props6.error,
        isMultipart = _this$props6.isMultipart,
        manifest = _this$props6.manifest,
        ready = _this$props6.ready,
        t = _this$props6.t;
      var filter = this.state.filter;
      if (error) return null;
      // If this component is optimistically rendering ahead of the window its in
      // force a re-render so that it is placed correctly. The right thing here is
      // to maybe pass a ref.
      if (!this.dialogContainer()) {
        this.forceUpdate();
        return /*#__PURE__*/React.createElement(React.Fragment, null);
      }
      if (!ready) return this.placeholder();
      var rights = manifest && asArray(manifest.getProperty('rights') || manifest.getProperty('license'));
      var requiredStatement = manifest && asArray(manifest.getRequiredStatement()).filter(function (l) {
        return l.getValue();
      }).map(function (labelValuePair) {
        return {
          label: null,
          values: labelValuePair.getValues()
        };
      });
      var collections = manifest.getCollections();
      var currentFilter = filter || (collections.length > 0 ? 'collections' : 'manifests');
      return /*#__PURE__*/React.createElement(Dialog, {
        className: classes.dialog,
        onClose: this.hideDialog,
        container: this.dialogContainer(),
        BackdropProps: this.backdropProps(),
        open: true
      }, /*#__PURE__*/React.createElement(DialogTitle, {
        id: "select-collection",
        disableTypography: true
      }, /*#__PURE__*/React.createElement(Typography, {
        component: "div",
        variant: "overline"
      }, t(isMultipart ? 'multipartCollection' : 'collection')), /*#__PURE__*/React.createElement(Typography, {
        variant: "h3"
      }, CollectionDialog.getUseableLabel(manifest))), /*#__PURE__*/React.createElement(ScrollIndicatedDialogContent, {
        className: classes.dialogContent
      }, collection && /*#__PURE__*/React.createElement(Button, {
        startIcon: /*#__PURE__*/React.createElement(ArrowBackIcon, null),
        onClick: function onClick() {
          return _this2.goToPreviousCollection();
        }
      }, CollectionDialog.getUseableLabel(collection)), /*#__PURE__*/React.createElement("div", {
        className: classes.collectionMetadata
      }, /*#__PURE__*/React.createElement(ManifestInfo, {
        manifestId: manifest.id
      }), /*#__PURE__*/React.createElement(CollapsibleSection, {
        id: "select-collection-rights",
        label: t('attributionTitle')
      }, requiredStatement && /*#__PURE__*/React.createElement(LabelValueMetadata, {
        labelValuePairs: requiredStatement,
        defaultLabel: t('attribution')
      }), rights && rights.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
        variant: "subtitle2",
        component: "dt"
      }, t('rights')), rights.map(function (v) {
        return /*#__PURE__*/React.createElement(Typography, {
          variant: "body1",
          component: "dd",
          key: v
        }, /*#__PURE__*/React.createElement(Link, {
          target: "_blank",
          rel: "noopener noreferrer",
          href: v
        }, v));
      })))), /*#__PURE__*/React.createElement("div", {
        className: classes.collectionFilter
      }, manifest.getTotalCollections() > 0 && /*#__PURE__*/React.createElement(Chip, {
        clickable: true,
        color: currentFilter === 'collections' ? 'primary' : 'default',
        onClick: function onClick() {
          return _this2.setFilter('collections');
        },
        label: t('totalCollections', {
          count: manifest.getTotalCollections()
        })
      }), manifest.getTotalManifests() > 0 && /*#__PURE__*/React.createElement(Chip, {
        clickable: true,
        color: currentFilter === 'manifests' ? 'primary' : 'default',
        onClick: function onClick() {
          return _this2.setFilter('manifests');
        },
        label: t('totalManifests', {
          count: manifest.getTotalManifests()
        })
      })), currentFilter === 'collections' && /*#__PURE__*/React.createElement(MenuList, null, collections.map(function (c) {
        return /*#__PURE__*/React.createElement(MenuItem, {
          key: c.id,
          onClick: function onClick() {
            _this2.selectCollection(c);
          },
          className: classes.collectionItem
        }, CollectionDialog.getUseableLabel(c));
      })), currentFilter === 'manifests' && /*#__PURE__*/React.createElement(MenuList, null, manifest.getManifests().map(function (m) {
        return /*#__PURE__*/React.createElement(MenuItem, {
          key: m.id,
          onClick: function onClick() {
            _this2.selectManifest(m);
          },
          className: classes.collectionItem
        }, CollectionDialog.getUseableLabel(m));
      }))), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
        onClick: this.hideDialog
      }, t('close'))));
    }
  }], [{
    key: "getUseableLabel",
    value: /** */
    function getUseableLabel(resource, index) {
      return resource && resource.getLabel && resource.getLabel().length > 0 ? resource.getLabel().getValue() : String(index + 1);
    }
  }]);
}(Component);
CollectionDialog.defaultProps = {
  collection: null,
  collectionPath: [],
  containerId: null,
  error: null,
  isMultipart: false,
  ready: false,
  windowId: null
};