var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[1],{

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, ".player_stage-only_3WHZN {\n    width: calc(480px + 1rem);\n}\n\n.player_stage-only_3WHZN * {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n", ""]);

// exports
exports.locals = {
	"stage-only": "player_stage-only_3WHZN",
	"stageOnly": "player_stage-only_3WHZN"
};

/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(130);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(14);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _box = __webpack_require__(7);

var _box2 = _interopRequireDefault(_box);

var _gui = __webpack_require__(30);

var _gui2 = _interopRequireDefault(_gui);

var _player = __webpack_require__(131);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if ("production" === 'production' && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
    // Warn before navigating away
    window.onbeforeunload = function () {
        return true;
    };
}

var Player = function Player() {
    return _react2.default.createElement(
        _box2.default,
        { className: _player2.default.stageOnly },
        _react2.default.createElement(_gui2.default, {
            isPlayerOnly: true,
            isFullScreen: false
        })
    );
};

var appTarget = document.createElement('div');
document.body.appendChild(appTarget);

_reactDom2.default.render(_react2.default.createElement(Player, null), appTarget);

/***/ })

},[[132,0]]]);
//# sourceMappingURL=player.js.map