var _excluded = ["manifest"];
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpwardSharp';
import CompanionWindow from '../containers/CompanionWindow';
import IIIFThumbnail from '../containers/IIIFThumbnail';

/** */
export var WindowSideBarCollectionPanel = /*#__PURE__*/function (_Component) {
  function WindowSideBarCollectionPanel() {
    _classCallCheck(this, WindowSideBarCollectionPanel);
    return _callSuper(this, WindowSideBarCollectionPanel, arguments);
  }
  _inherits(WindowSideBarCollectionPanel, _Component);
  return _createClass(WindowSideBarCollectionPanel, [{
    key: "isMultipart",
    value: /** */
    function isMultipart() {
      var collection = this.props.collection;
      if (!collection) return false;
      var behaviors = collection.getProperty('behavior');
      if (Array.isArray(behaviors)) return behaviors.includes('multi-part');
      return behaviors === 'multi-part';
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        canvasNavigation = _this$props.canvasNavigation,
        classes = _this$props.classes,
        collectionPath = _this$props.collectionPath,
        collection = _this$props.collection,
        id = _this$props.id,
        isFetching = _this$props.isFetching,
        manifestId = _this$props.manifestId,
        parentCollection = _this$props.parentCollection,
        updateCompanionWindow = _this$props.updateCompanionWindow,
        updateWindow = _this$props.updateWindow,
        t = _this$props.t,
        variant = _this$props.variant,
        windowId = _this$props.windowId;

      /** */
      var Item = function Item(_ref) {
        var manifest = _ref.manifest,
          otherProps = _objectWithoutProperties(_ref, _excluded);
        return /*#__PURE__*/React.createElement(MenuItem, Object.assign({
          className: classes.menuItem,
          alignItems: "flex-start",
          button: true,
          component: "li",
          selected: manifestId === manifest.id
        }, otherProps), variant === 'thumbnail' && /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(IIIFThumbnail, {
          resource: manifest,
          maxHeight: canvasNavigation.height,
          maxWidth: canvasNavigation.width
        })), /*#__PURE__*/React.createElement(ListItemText, null, WindowSideBarCollectionPanel.getUseableLabel(manifest)));
      };
      return /*#__PURE__*/React.createElement(CompanionWindow, {
        title: t(this.isMultipart() ? 'multipartCollection' : 'collection'),
        windowId: windowId,
        id: id,
        titleControls: /*#__PURE__*/React.createElement(React.Fragment, null, parentCollection && /*#__PURE__*/React.createElement(List, null, /*#__PURE__*/React.createElement(ListItem, {
          button: true,
          onClick: function onClick() {
            return updateCompanionWindow({
              collectionPath: collectionPath.slice(0, -1)
            });
          }
        }, /*#__PURE__*/React.createElement(ListItemIcon, null, /*#__PURE__*/React.createElement(ArrowUpwardIcon, null)), /*#__PURE__*/React.createElement(ListItemText, {
          primaryTypographyProps: {
            variant: 'body1'
          }
        }, WindowSideBarCollectionPanel.getUseableLabel(parentCollection)))), /*#__PURE__*/React.createElement(Typography, {
          variant: "h6"
        }, collection && WindowSideBarCollectionPanel.getUseableLabel(collection), isFetching && /*#__PURE__*/React.createElement(Skeleton, {
          className: classes.placeholder,
          variant: "text"
        })))
      }, /*#__PURE__*/React.createElement(MenuList, null, isFetching && /*#__PURE__*/React.createElement(MenuItem, null, /*#__PURE__*/React.createElement(ListItemText, null, /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      }), /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      }), /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      }))), collection && collection.getCollections().map(function (manifest) {
        /** select the new manifest and go back to the normal index */
        var onClick = function onClick() {
          // close collection
          updateCompanionWindow({
            collectionPath: [].concat(_toConsumableArray(collectionPath), [manifest.id])
          });
        };
        return /*#__PURE__*/React.createElement(Item, {
          key: manifest.id,
          onClick: onClick,
          manifest: manifest
        });
      }), collection && collection.getManifests().map(function (manifest) {
        /** select the new manifest and go back to the normal index */
        var onClick = function onClick() {
          // select new manifest
          updateWindow({
            canvasId: null,
            collectionPath: collectionPath,
            manifestId: manifest.id
          });
          // close collection
          updateCompanionWindow({
            multipart: false
          });
        };
        return /*#__PURE__*/React.createElement(Item, {
          key: manifest.id,
          onClick: onClick,
          manifest: manifest
        });
      })));
    }
  }], [{
    key: "getUseableLabel",
    value: /** */
    function getUseableLabel(resource, index) {
      return resource && resource.getLabel && resource.getLabel().length > 0 ? resource.getLabel().getValue() : resource.id;
    }
  }]);
}(Component);
WindowSideBarCollectionPanel.defaultProps = {
  collection: null,
  collectionPath: [],
  error: null,
  isFetching: false,
  parentCollection: null,
  ready: false,
  t: function t(k) {
    return k;
  },
  variant: null
};