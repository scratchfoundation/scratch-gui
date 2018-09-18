var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[1],{

/***/ 1098:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(1099);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(5)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 1099:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "html,\nbody,\n.index_app_3Qs6X {\n    /* probably unecessary, transitional until layout is refactored */\n    width: 100%; \n    height: 100%;\n    margin: 0;\n\n    /* Setting min height/width makes the UI scroll below those sizes */\n    min-width: 1024px;\n    min-height: 640px; /* Min height to fit sprite/backdrop button */\n}\n\n/* @todo: move globally? Safe / side FX, for blocks particularly? */\n\n* { -webkit-box-sizing: border-box; box-sizing: border-box; }\n", ""]);

// exports
exports.locals = {
	"app": "index_app_3Qs6X"
};

/***/ }),

/***/ 1100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(33);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _appStateHoc = __webpack_require__(113);

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _gui = __webpack_require__(161);

var _gui2 = _interopRequireDefault(_gui);

var _hashParserHoc = __webpack_require__(181);

var _hashParserHoc2 = _interopRequireDefault(_hashParserHoc);

var _titledHoc = __webpack_require__(452);

var _titledHoc2 = _interopRequireDefault(_titledHoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Render the GUI playground. This is a separate function because importing anything
 * that instantiates the VM causes unsupported browsers to crash
 * {object} appTarget - the DOM element to render to
 */
exports.default = function (appTarget) {
    _gui2.default.setAppElement(appTarget);
    var WrappedGui = (0, _hashParserHoc2.default)((0, _appStateHoc2.default)((0, _titledHoc2.default)(_gui2.default)));

    // TODO a hack for testing the backpack, allow backpack host to be set by url param
    var backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
    var backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;

    var backpackOptions = {
        visible: true,
        host: backpackHost
    };
    if ("production" === 'production' && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
        // Warn before navigating away
        window.onbeforeunload = function () {
            return true;
        };
    }

    _reactDom2.default.render(_react2.default.createElement(WrappedGui, { backpackOptions: backpackOptions }), appTarget);
};

/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(471);

__webpack_require__(473);

__webpack_require__(497);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(33);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _analytics = __webpack_require__(28);

var _analytics2 = _interopRequireDefault(_analytics);

var _appStateHoc = __webpack_require__(113);

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _browserModal = __webpack_require__(378);

var _browserModal2 = _interopRequireDefault(_browserModal);

var _supportedBrowser = __webpack_require__(382);

var _supportedBrowser2 = _interopRequireDefault(_supportedBrowser);

var _index = __webpack_require__(1098);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Register "base" page view
// Polyfills
_analytics2.default.pageview('/'); // For Safari 9

var appTarget = document.createElement('div');
appTarget.className = _index2.default.app;
document.body.appendChild(appTarget);

if ((0, _supportedBrowser2.default)()) {
    // require needed here to avoid importing unsupported browser-crashing code
    // at the top level
    __webpack_require__(1100).default(appTarget);
} else {
    _browserModal2.default.setAppElement(appTarget);
    var WrappedBrowserModalComponent = (0, _appStateHoc2.default)(_browserModal2.default, true /* localesOnly */);
    var handleBack = function handleBack() {};
    // eslint-disable-next-line react/jsx-no-bind
    _reactDom2.default.render(_react2.default.createElement(WrappedBrowserModalComponent, { onBack: handleBack }), appTarget);
}

/***/ }),

/***/ 499:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[470,0]]]);
//# sourceMappingURL=gui.js.map