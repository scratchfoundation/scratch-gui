var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[1],{

/***/ 1473:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(1474);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 1474:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "html,\nbody,\n.index_app_3Qs6X {\n    /* probably unecessary, transitional until layout is refactored */\n    width: 100%; \n    height: 100%;\n    margin: 0;\n\n    /* Setting min height/width makes the UI scroll below those sizes */\n    min-width: 1024px;\n    min-height: 640px; /* Min height to fit sprite/backdrop button */\n}\n\n/* @todo: move globally? Safe / side FX, for blocks particularly? */\n\n* { -webkit-box-sizing: border-box; box-sizing: border-box; }\n", ""]);

// exports
exports.locals = {
	"app": "index_app_3Qs6X"
};

/***/ }),

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // Polyfills
// For Safari 9

__webpack_require__(451);

__webpack_require__(453);

__webpack_require__(477);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(33);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _analytics = __webpack_require__(34);

var _analytics2 = _interopRequireDefault(_analytics);

var _gui = __webpack_require__(123);

var _gui2 = _interopRequireDefault(_gui);

var _hashParserHoc = __webpack_require__(159);

var _hashParserHoc2 = _interopRequireDefault(_hashParserHoc);

var _appStateHoc = __webpack_require__(160);

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _index = __webpack_require__(1473);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if ("production" === 'production' && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
    // Warn before navigating away
    window.onbeforeunload = function () {
        return true;
    };
}

// Register "base" page view
_analytics2.default.pageview('/');

var appTarget = document.createElement('div');
appTarget.className = _index2.default.app;
document.body.appendChild(appTarget);

_gui2.default.setAppElement(appTarget);
var WrappedGui = (0, _hashParserHoc2.default)((0, _appStateHoc2.default)(_gui2.default));

// TODO a hack for testing the backpack, allow backpack host to be set by url param
var backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
var backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;

var backpackOptions = {
    visible: true,
    host: backpackHost
};

_reactDom2.default.render(_react2.default.createElement(WrappedGui, { backpackOptions: backpackOptions }), appTarget);

/***/ }),

/***/ 479:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[450,0]]]);
//# sourceMappingURL=gui.js.map