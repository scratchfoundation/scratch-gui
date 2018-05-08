var GUI =
webpackJsonpGUI([1],{

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(12);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _box = __webpack_require__(7);

var _box2 = _interopRequireDefault(_box);

var _gui = __webpack_require__(23);

var _gui2 = _interopRequireDefault(_gui);

var _player = __webpack_require__(574);

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

/***/ }),

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(575);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??postcss!./player.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??postcss!./player.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 575:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".player_stage-only_3WHZN {\n    width: calc(480px + 1rem);\n}\n\n.player_stage-only_3WHZN * {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n", ""]);

// exports
exports.locals = {
	"stage-only": "player_stage-only_3WHZN",
	"stageOnly": "player_stage-only_3WHZN"
};

/***/ })

},[573]);
//# sourceMappingURL=player.js.map