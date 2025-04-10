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
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { Img } from 'react-image';
import ManifestListItemError from '../containers/ManifestListItemError';
import ns from '../config/css-ns';

/**
 * Represents an item in a list of currently-loaded or loading manifests
 * @param {object} props
 * @param {object} [props.manifest = string]
 */

/** */
export var ManifestListItem = /*#__PURE__*/function (_React$Component) {
  /** */
  function ManifestListItem(props) {
    var _this;
    _classCallCheck(this, ManifestListItem);
    _this = _callSuper(this, ManifestListItem, [props]);
    _this.handleOpenButtonClick = _this.handleOpenButtonClick.bind(_this);
    return _this;
  }

  /** */
  _inherits(ManifestListItem, _React$Component);
  return _createClass(ManifestListItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
        fetchManifest = _this$props.fetchManifest,
        manifestId = _this$props.manifestId,
        ready = _this$props.ready,
        isFetching = _this$props.isFetching,
        error = _this$props.error,
        provider = _this$props.provider;
      if (!ready && !error && !isFetching && provider !== 'file') fetchManifest(manifestId);
    }

    /**
     * Handling open button click
     */
  }, {
    key: "handleOpenButtonClick",
    value: function handleOpenButtonClick() {
      var _this$props2 = this.props,
        addWindow = _this$props2.addWindow,
        handleClose = _this$props2.handleClose,
        manifestId = _this$props2.manifestId;
      addWindow({
        manifestId: manifestId
      });
      handleClose();
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
        active = _this$props3.active,
        buttonRef = _this$props3.buttonRef,
        manifestId = _this$props3.manifestId,
        ready = _this$props3.ready,
        title = _this$props3.title,
        thumbnail = _this$props3.thumbnail,
        manifestLogo = _this$props3.manifestLogo,
        size = _this$props3.size,
        classes = _this$props3.classes,
        provider = _this$props3.provider,
        t = _this$props3.t,
        error = _this$props3.error,
        isCollection = _this$props3.isCollection,
        isMultipart = _this$props3.isMultipart;
      var placeholder = /*#__PURE__*/React.createElement(Grid, {
        container: true,
        className: ns('manifest-list-item'),
        spacing: 2
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 3,
        sm: 2
      }, /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "rect",
        height: 80,
        width: 120
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 9,
        sm: 6
      }, /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 8,
        sm: 2
      }, /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      }), /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "text"
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 4,
        sm: 2
      }, /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "rect",
        height: 60,
        width: 60
      })));
      if (error) {
        return /*#__PURE__*/React.createElement(ListItem, {
          divider: true,
          className: classes.root,
          "data-manifestid": manifestId
        }, /*#__PURE__*/React.createElement(ManifestListItemError, {
          manifestId: manifestId
        }));
      }
      return /*#__PURE__*/React.createElement(ListItem, {
        divider: true,
        className: [classes.root, active ? classes.active : ''].join(' '),
        "data-manifestid": manifestId
      }, ready ? /*#__PURE__*/React.createElement(Grid, {
        container: true,
        className: ns('manifest-list-item'),
        spacing: 2
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 12,
        sm: 6,
        className: classes.buttonGrid
      }, /*#__PURE__*/React.createElement(ButtonBase, {
        ref: buttonRef,
        className: ns('manifest-list-item-title'),
        style: {
          width: '100%'
        },
        onClick: this.handleOpenButtonClick
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true,
        spacing: 2,
        className: classes.label,
        component: "span"
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 4,
        sm: 3,
        component: "span"
      }, thumbnail ? /*#__PURE__*/React.createElement(Img, {
        className: [classes.thumbnail, ns('manifest-list-item-thumb')].join(' '),
        src: [thumbnail],
        alt: "",
        height: "80",
        unloader: /*#__PURE__*/React.createElement(Skeleton, {
          variant: "rect",
          animation: false,
          className: classes.placeholder,
          height: 80,
          width: 120
        })
      }) : /*#__PURE__*/React.createElement(Skeleton, {
        className: classes.placeholder,
        variant: "rect",
        height: 80,
        width: 120
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 8,
        sm: 9,
        component: "span"
      }, isCollection && /*#__PURE__*/React.createElement(Typography, {
        component: "div",
        variant: "overline"
      }, t(isMultipart ? 'multipartCollection' : 'collection')), /*#__PURE__*/React.createElement(Typography, {
        component: "span",
        variant: "h6"
      }, title || manifestId))))), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 8,
        sm: 4
      }, /*#__PURE__*/React.createElement(Typography, {
        className: ns('manifest-list-item-provider')
      }, provider), /*#__PURE__*/React.createElement(Typography, null, t('numItems', {
        count: size,
        number: size
      }))), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 4,
        sm: 2
      }, manifestLogo && /*#__PURE__*/React.createElement(Img, {
        src: [manifestLogo],
        alt: "",
        role: "presentation",
        className: classes.logo,
        unloader: /*#__PURE__*/React.createElement(Skeleton, {
          variant: "rect",
          animation: false,
          className: classes.placeholder,
          height: 60,
          width: 60
        })
      }))) : placeholder);
    }
  }]);
}(React.Component);
ManifestListItem.defaultProps = {
  active: false,
  buttonRef: undefined,
  classes: {},
  error: null,
  handleClose: function handleClose() {},
  isCollection: false,
  isFetching: false,
  isMultipart: false,
  manifestLogo: null,
  provider: null,
  ready: false,
  size: 0,
  t: function t(key) {
    return key;
  },
  thumbnail: null,
  title: null
};