"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDestructuredMetadata = getDestructuredMetadata;
exports.getManifestStatus = exports.getManifestSearchService = exports.getManifestRenderings = exports.getManifestRelatedContent = exports.getManifestProvider = exports.getManifestMetadata = exports.getManifestLogo = exports.getManifestLocale = exports.getManifestHomepage = exports.getManifestError = exports.getManifestDescription = exports.getManifestAutocompleteService = void 0;
exports.getManifestThumbnail = getManifestThumbnail;
exports.getRights = exports.getRequiredStatement = exports.getMetadataLocales = exports.getManifestoInstance = exports.getManifestUrl = exports.getManifestTitle = void 0;
var _reselect = require("reselect");
var _reReselect = _interopRequireDefault(require("re-reselect"));
var _manifesto = require("manifesto.js");
var _ThumbnailFactory = _interopRequireDefault(require("../../lib/ThumbnailFactory"));
var _asArray = _interopRequireDefault(require("../../lib/asArray"));
var _companionWindows = require("./companionWindows");
var _getters = require("./getters");
var _config = require("./config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/** */
function createManifestoInstance(json, locale) {
  if (!json) return undefined;
  var manifestoObject = _manifesto.Utils.parseManifest(json, locale ? {
    locale: locale
  } : undefined);
  // Local patching of Manifesto so that when its a Collection, it behaves similarly
  if (typeof manifestoObject.getSequences != 'function') {
    manifestoObject.getSequences = function () {
      return [];
    };
  }
  return manifestoObject;
}

/** */
var getLocale = (0, _reselect.createSelector)([_companionWindows.getCompanionWindow, _config.getConfig], function () {
  var companionWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return companionWindow.locale || config.language;
});

/** Convenience selector to get a manifest (or placeholder) */
var getManifestStatus = exports.getManifestStatus = (0, _reselect.createSelector)([_getters.getManifest], function (manifest) {
  return manifest || {
    missing: true
  };
});

/** Convenience selector to get a manifest loading error */
var getManifestError = exports.getManifestError = (0, _reselect.createSelector)([_getters.getManifest], function (manifest) {
  return manifest && manifest.error;
});

/** Instantiate a manifesto instance */
var getContextualManifestoInstance = (0, _reReselect["default"])(_getters.getManifest, getLocale, function (manifest, locale) {
  return manifest && createManifestoInstance(manifest.json, locale);
})(function (state, _ref) {
  var companionWindowId = _ref.companionWindowId,
    manifestId = _ref.manifestId,
    windowId = _ref.windowId;
  return [manifestId, windowId, getLocale(state, {
    companionWindowId: companionWindowId
  })].join(' - ');
} // Cache key consisting of manifestId, windowId, and locale
);

/** Instantiate a manifesto instance */
var getManifestoInstance = exports.getManifestoInstance = (0, _reselect.createSelector)(getContextualManifestoInstance, function (state, _ref2) {
  var json = _ref2.json;
  return json;
}, getLocale, function (manifesto, manifestJson, locale) {
  return manifestJson && createManifestoInstance(manifestJson, locale) || manifesto;
});
var getManifestLocale = exports.getManifestLocale = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && manifest.options && manifest.options.locale && manifest.options.locale.replace(/-.*$/, '');
});

/** */
function getProperty(property) {
  return (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
    return manifest && manifest.getProperty(property);
  });
}

/**
 * Get the logo for a manifest
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {String|null}
 */
var getManifestLogo = exports.getManifestLogo = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && manifest.getLogo();
});

/**
* Return the IIIF v3 provider of a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
var getManifestProvider = exports.getManifestProvider = (0, _reselect.createSelector)([getProperty('provider'), getManifestLocale], function (provider, locale) {
  return provider && provider[0].label && _manifesto.PropertyValue.parse(provider[0].label, locale).getValue();
});

/**
* Return the IIIF v3 homepage of a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
var getManifestHomepage = exports.getManifestHomepage = (0, _reselect.createSelector)([getProperty('homepage'), getManifestLocale], function (homepages, locale) {
  return homepages && (0, _asArray["default"])(homepages).map(function (homepage) {
    return {
      label: _manifesto.PropertyValue.parse(homepage.label, locale).getValue(),
      value: homepage.id || homepage['@id']
    };
  });
});

/**
* Return the IIIF v3 renderings of a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
var getManifestRenderings = exports.getManifestRenderings = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && manifest.getRenderings().map(function (rendering) {
    return {
      label: rendering.getLabel().getValue(),
      value: rendering.id
    };
  });
});

/**
* Return the IIIF v2/v3 seeAlso data from a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
var getManifestRelatedContent = exports.getManifestRelatedContent = (0, _reselect.createSelector)([getProperty('seeAlso'), getManifestLocale], function (seeAlso, locale) {
  return seeAlso && (0, _asArray["default"])(seeAlso).map(function (related) {
    return {
      format: related.format,
      label: _manifesto.PropertyValue.parse(related.label, locale).getValue(),
      value: related.id || related['@id']
    };
  });
});

/**
* Return the IIIF requiredStatement (v3) or attribution (v2) data from a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
var getRequiredStatement = exports.getRequiredStatement = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && (0, _asArray["default"])(manifest.getRequiredStatement()).filter(function (l) {
    return l.getValues().some(function (v) {
      return v;
    });
  }).map(function (labelValuePair) {
    return {
      label: labelValuePair.label && labelValuePair.label.getValue() || null,
      values: labelValuePair.getValues()
    };
  });
});

/**
* Return the IIIF v2 rights (v3) or license (v2) data from a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
var getRights = exports.getRights = (0, _reselect.createSelector)([getProperty('rights'), getProperty('license'), getManifestLocale], function (rights, license, locale) {
  var data = rights || license;
  return (0, _asArray["default"])(_manifesto.PropertyValue.parse(data, locale).getValues());
});

/**
* Return the supplied thumbnail for a manifest or null
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String|null}
*/
function getManifestThumbnail(state, props) {
  var manifest = getManifestoInstance(state, props);
  var _getConfig = (0, _config.getConfig)(state),
    _getConfig$thumbnails = _getConfig.thumbnails,
    thumbnails = _getConfig$thumbnails === void 0 ? {} : _getConfig$thumbnails;
  if (!manifest) return undefined;
  var thumbnail = (0, _ThumbnailFactory["default"])(manifest, {
    maxHeight: 80,
    maxWidth: 120,
    preferredFormats: thumbnails.preferredFormats
  });
  return thumbnail && thumbnail.url;
}

/**
* Return manifest title
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String}
*/
var getManifestTitle = exports.getManifestTitle = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && manifest.getLabel().getValue();
});

/**
* Return manifest description
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String}
*/
var getManifestDescription = exports.getManifestDescription = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && manifest.getDescription().getValue();
});

/**
* Return manifest title
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @return {String}
*/
var getManifestUrl = exports.getManifestUrl = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && manifest.id;
});

/**
* Return metadata in a label / value structure
* This is a potential seam for pulling the i18n locale from
* state and plucking out the appropriate language.
* For now we're just getting the first.
* @param {object} Manifesto IIIF Resource (e.g. canvas, manifest)
* @return {Array[Object]}
*/
function getDestructuredMetadata(iiifResource) {
  return iiifResource && iiifResource.getMetadata().map(function (labelValuePair) {
    return {
      label: labelValuePair.getLabel(),
      values: labelValuePair.getValues()
    };
  });
}

/**
 * Return manifest metadata in a label / value structure
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {Array[Object]}
 */
var getManifestMetadata = exports.getManifestMetadata = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return manifest && getDestructuredMetadata(manifest);
});

/** */
function getLocalesForStructure(item) {
  var languages = [];
  if (Array.isArray(item)) {
    languages.push.apply(languages, _toConsumableArray(item.filter(function (i) {
      return typeof i === 'object' && i['@language'];
    }).map(function (i) {
      return i['@language'];
    })));
  } else if (item && typeof item === 'object') {
    if (item['@language']) languages.push(item['@language']);
  }
  return languages;
}

/** */
function getLocales(resource) {
  if (!resource) return [];
  var metadata = resource.getProperty('metadata') || [];
  var languages = {};
  for (var i = 0; i < metadata.length; i += 1) {
    var item = metadata[i];
    getLocalesForStructure(item.label).forEach(function (l) {
      languages[l] = true;
    });
    getLocalesForStructure(item.value).forEach(function (l) {
      languages[l] = true;
    });
  }
  return Object.keys(languages);
}
var getMetadataLocales = exports.getMetadataLocales = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  return getLocales(manifest);
});

/** */
var getManifestSearchService = exports.getManifestSearchService = (0, _reselect.createSelector)([getManifestoInstance], function (manifest) {
  if (!manifest) return null;
  var searchService = manifest.getService('http://iiif.io/api/search/0/search') || manifest.getService('http://iiif.io/api/search/1/search');
  if (searchService) return searchService;
  return null;
});

/** */
var getManifestAutocompleteService = exports.getManifestAutocompleteService = (0, _reselect.createSelector)([getManifestSearchService], function (searchService) {
  var autocompleteService = searchService && (searchService.getService('http://iiif.io/api/search/0/autocomplete') || searchService.getService('http://iiif.io/api/search/1/autocomplete'));
  return autocompleteService && autocompleteService;
});