var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[7],{

/***/ 1348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
/* harmony import */ var _lib_app_state_hoc_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(76);
/* harmony import */ var _containers_gui_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(82);
/* harmony import */ var _lib_hash_parser_hoc_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(101);
/* harmony import */ var _lib_log_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }









var onClickLogo = function onClickLogo() {
  window.location = 'https://scratch.mit.edu';
};

var handleTelemetryModalCancel = function handleTelemetryModalCancel() {
  Object(_lib_log_js__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])('User canceled telemetry modal');
};

var handleTelemetryModalOptIn = function handleTelemetryModalOptIn() {
  Object(_lib_log_js__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])('User opted into telemetry');
};

var handleTelemetryModalOptOut = function handleTelemetryModalOptOut() {
  Object(_lib_log_js__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])('User opted out of telemetry');
};
/*
 * Render the GUI playground. This is a separate function because importing anything
 * that instantiates the VM causes unsupported browsers to crash
 * {object} appTarget - the DOM element to render to
 */


/* harmony default export */ __webpack_exports__["default"] = (function (appTarget) {
  _containers_gui_jsx__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].setAppElement(appTarget); // note that redux's 'compose' function is just being used as a general utility to make
  // the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
  // ability to compose reducers.

  var WrappedGui = Object(redux__WEBPACK_IMPORTED_MODULE_2__[/* compose */ "d"])(_lib_app_state_hoc_jsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _lib_hash_parser_hoc_jsx__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(_containers_gui_jsx__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]); // TODO a hack for testing the backpack, allow backpack host to be set by url param

  var backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
  var backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;
  var scratchDesktopMatches = window.location.href.match(/[?&]isScratchDesktop=([^&]+)/);
  var simulateScratchDesktop;

  if (scratchDesktopMatches) {
    try {
      // parse 'true' into `true`, 'false' into `false`, etc.
      simulateScratchDesktop = JSON.parse(scratchDesktopMatches[1]);
    } catch (_unused) {
      // it's not JSON so just use the string
      // note that a typo like "falsy" will be treated as true
      simulateScratchDesktop = scratchDesktopMatches[1];
    }
  }

  if ( true && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
    // Warn before navigating away
    window.onbeforeunload = function () {
      return true;
    };
  }

  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( // important: this is checking whether `simulateScratchDesktop` is truthy, not just defined!
  simulateScratchDesktop ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WrappedGui, {
    canEditTitle: true,
    isScratchDesktop: true,
    showTelemetryModal: true,
    canSave: false,
    onTelemetryModalCancel: handleTelemetryModalCancel,
    onTelemetryModalOptIn: handleTelemetryModalOptIn,
    onTelemetryModalOptOut: handleTelemetryModalOptOut
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WrappedGui, {
    canEditTitle: true,
    backpackVisible: true,
    showComingSoon: true,
    backpackHost: backpackHost,
    canSave: false,
    onClickLogo: onClickLogo
  }), appTarget);
});

/***/ }),

/***/ 1471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/es6-object-assign/auto.js
var auto = __webpack_require__(945);

// EXTERNAL MODULE: ./node_modules/core-js/fn/array/includes.js
var includes = __webpack_require__(947);

// EXTERNAL MODULE: ./node_modules/core-js/fn/promise/finally.js
var promise_finally = __webpack_require__(959);

// EXTERNAL MODULE: ./node_modules/intl/index.js
var intl = __webpack_require__(976);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(35);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./src/lib/analytics.js
var analytics = __webpack_require__(54);

// EXTERNAL MODULE: ./src/lib/app-state-hoc.jsx + 1 modules
var app_state_hoc = __webpack_require__(76);

// EXTERNAL MODULE: ./src/components/browser-modal/browser-modal.jsx + 1 modules
var browser_modal = __webpack_require__(177);

// EXTERNAL MODULE: ./src/lib/supported-browser.js
var supported_browser = __webpack_require__(170);

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(6);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);

// EXTERNAL MODULE: ./node_modules/css-loader??ref--5-1!./node_modules/postcss-loader/src??postcss!./src/playground/index.css
var playground = __webpack_require__(321);
var playground_default = /*#__PURE__*/__webpack_require__.n(playground);

// CONCATENATED MODULE: ./src/playground/index.css

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(playground_default.a, options);



/* harmony default export */ var src_playground = (playground_default.a.locals || {});
// CONCATENATED MODULE: ./src/playground/index.jsx
// Polyfills



 // For Safari 9







 // Register "base" page view

analytics["a" /* default */].pageview('/');
var appTarget = document.createElement('div');
appTarget.className = src_playground.app;
document.body.appendChild(appTarget);

if (Object(supported_browser["a" /* default */])()) {
  // require needed here to avoid importing unsupported browser-crashing code
  // at the top level
  __webpack_require__(1348).default(appTarget);
} else {
  browser_modal["a" /* default */].setAppElement(appTarget);
  var WrappedBrowserModalComponent = Object(app_state_hoc["a" /* default */])(browser_modal["a" /* default */], true
  /* localesOnly */
  );

  var handleBack = function handleBack() {}; // eslint-disable-next-line react/jsx-no-bind


  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(WrappedBrowserModalComponent, {
    onBack: handleBack
  }), appTarget);
}

/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "html,\nbody,\n.index_app_3Qs6X {\n    /* probably unecessary, transitional until layout is refactored */\n    width: 100%; \n    height: 100%;\n    margin: 0;\n\n    /* Setting min height/width makes the UI scroll below those sizes */\n    min-width: 1024px;\n    min-height: 640px; /* Min height to fit sprite/backdrop button */\n}\n\n/* @todo: move globally? Safe / side FX, for blocks particularly? */\n\n* { -webkit-box-sizing: border-box; box-sizing: border-box; }\n", ""]);

// exports
exports.locals = {
	"app": "index_app_3Qs6X"
};

/***/ }),

/***/ 978:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[1471,0]]]);
//# sourceMappingURL=gui.js.map