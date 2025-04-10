function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
import deburr from 'lodash/deburr';
import debounce from 'lodash/debounce';
import isObject from 'lodash/isObject';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/SearchSharp';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import SearchPanelNavigation from '../containers/SearchPanelNavigation';

/** Sometimes an autocomplete match can be a simple string, other times an object
    with a `match` property, this function abstracts that away */
var getMatch = function getMatch(option) {
  return isObject(option) ? option.match : option;
};

/** */
export var SearchPanelControls = /*#__PURE__*/function (_Component) {
  /** */
  function SearchPanelControls(props) {
    var _this;
    _classCallCheck(this, SearchPanelControls);
    _this = _callSuper(this, SearchPanelControls, [props]);
    _this.state = {
      search: props.query,
      suggestions: []
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.submitSearch = _this.submitSearch.bind(_this);
    _this.getSuggestions = _this.getSuggestions.bind(_this);
    _this.selectItem = _this.selectItem.bind(_this);
    _this.fetchAutocomplete = debounce(_this.fetchAutocomplete.bind(_this), 500);
    _this.receiveAutocomplete = _this.receiveAutocomplete.bind(_this);
    return _this;
  }

  /**
   * Update the query in the component state if the query has changed in the redux store
   */
  _inherits(SearchPanelControls, _Component);
  return _createClass(SearchPanelControls, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var query = this.props.query;
      if (query !== prevProps.query) {
        // We are setting local state directly here ONLY when the query prop (from redux)
        // changed
        this.setState({
          // eslint-disable-line react/no-did-update-set-state
          search: query
        });
      }
    }

    /** */
  }, {
    key: "handleChange",
    value: function handleChange(event, value, reason) {
      // For some reason the value gets reset to an empty value from the
      // useAutocomplete hook sometimes, we just ignore these cases
      if (reason === 'reset' && !value) {
        return;
      }
      this.setState({
        search: value,
        suggestions: []
      });
      if (value) {
        this.fetchAutocomplete(value);
      }
    }

    /** */
  }, {
    key: "getSuggestions",
    value: function getSuggestions(value) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$showEmpty = _ref.showEmpty,
        showEmpty = _ref$showEmpty === void 0 ? false : _ref$showEmpty;
      var suggestions = this.state.suggestions;
      var inputValue = deburr(value.trim()).toLowerCase();
      var inputLength = inputValue.length;
      return inputLength === 0 && !showEmpty ? [] : suggestions;
    }

    /** */
  }, {
    key: "fetchAutocomplete",
    value: function fetchAutocomplete(value) {
      var autocompleteService = this.props.autocompleteService;
      if (!autocompleteService) return;
      if (!value) return;
      fetch("".concat(autocompleteService.id, "?q=").concat(value)).then(function (response) {
        return response.json();
      }).then(this.receiveAutocomplete);
    }

    /** */
  }, {
    key: "receiveAutocomplete",
    value: function receiveAutocomplete(json) {
      this.setState({
        suggestions: json.terms
      });
    }

    /** */
  }, {
    key: "submitSearch",
    value: function submitSearch(event) {
      var _this$props = this.props,
        companionWindowId = _this$props.companionWindowId,
        fetchSearch = _this$props.fetchSearch,
        searchService = _this$props.searchService,
        windowId = _this$props.windowId;
      var search = this.state.search;
      event && event.preventDefault();
      if (!search) return;
      fetchSearch(windowId, companionWindowId, "".concat(searchService.id, "?q=").concat(search), search);
    }

    /** */
  }, {
    key: "selectItem",
    value: function selectItem(_event, selectedItem, _reason) {
      if (selectedItem && getMatch(selectedItem)) {
        this.setState({
          search: getMatch(selectedItem)
        }, this.submitSearch);
      }
    }

    /** */
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        classes = _this$props2.classes,
        companionWindowId = _this$props2.companionWindowId,
        searchIsFetching = _this$props2.searchIsFetching,
        t = _this$props2.t,
        windowId = _this$props2.windowId;
      var _this$state = this.state,
        search = _this$state.search,
        suggestions = _this$state.suggestions;
      var id = "search-".concat(companionWindowId);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
        onSubmit: this.submitSearch,
        className: classes.form
      }, /*#__PURE__*/React.createElement(Autocomplete, {
        id: id,
        inputValue: search,
        options: suggestions,
        getOptionLabel: getMatch,
        getOptionSelected: function getOptionSelected(option, value) {
          return deburr(getMatch(option).trim()).toLowerCase() === deburr(getMatch(value).trim()).toLowerCase();
        },
        noOptionsText: "",
        onChange: this.selectItem,
        onInputChange: this.handleChange,
        freeSolo: true,
        renderInput: function renderInput(params) {
          return /*#__PURE__*/React.createElement(TextField, Object.assign({}, params, {
            label: t('searchInputLabel'),
            InputProps: _objectSpread(_objectSpread({}, params.InputProps), {}, {
              endAdornment: /*#__PURE__*/React.createElement("div", {
                className: classes.endAdornment
              }, /*#__PURE__*/React.createElement(MiradorMenuButton, {
                "aria-label": t('searchSubmitAria'),
                type: "submit"
              }, /*#__PURE__*/React.createElement(SearchIcon, null)), Boolean(searchIsFetching) && /*#__PURE__*/React.createElement(CircularProgress, {
                className: classes.searchProgress,
                size: 50
              }))
            })
          }));
        }
      })), /*#__PURE__*/React.createElement(SearchPanelNavigation, {
        windowId: windowId,
        companionWindowId: companionWindowId
      }));
    }
  }]);
}(Component);
SearchPanelControls.defaultProps = {
  autocompleteService: undefined,
  classes: {},
  query: '',
  t: function t(key) {
    return key;
  }
};