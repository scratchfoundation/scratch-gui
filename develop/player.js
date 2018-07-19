var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[4],{

/***/ 1492:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(34);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(7);

var _box = __webpack_require__(15);

var _box2 = _interopRequireDefault(_box);

var _gui = __webpack_require__(126);

var _gui2 = _interopRequireDefault(_gui);

var _hashParserHoc = __webpack_require__(164);

var _hashParserHoc2 = _interopRequireDefault(_hashParserHoc);

var _appStateHoc = __webpack_require__(165);

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _mode = __webpack_require__(118);

var _player = __webpack_require__(1493);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if ("production" === 'production' && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
    // Warn before navigating away
    window.onbeforeunload = function () {
        return true;
    };
}

var Player = function Player(_ref) {
    var isPlayerOnly = _ref.isPlayerOnly,
        onSeeInside = _ref.onSeeInside;
    return _react2.default.createElement(
        _box2.default,
        {
            className: (0, _classnames2.default)(_defineProperty({}, _player2.default.stageOnly, isPlayerOnly))
        },
        isPlayerOnly && _react2.default.createElement(
            'button',
            { onClick: onSeeInside },
            'See inside'
        ),
        _react2.default.createElement(_gui2.default, {
            enableCommunity: true,
            isPlayerOnly: isPlayerOnly
        })
    );
};

Player.propTypes = {
    isPlayerOnly: _propTypes2.default.bool,
    onSeeInside: _propTypes2.default.func
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        isPlayerOnly: state.scratchGui.mode.isPlayerOnly
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onSeeInside: function onSeeInside() {
            return dispatch((0, _mode.setPlayer)(false));
        }
    };
};

var ConnectedPlayer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Player);
var WrappedPlayer = (0, _hashParserHoc2.default)((0, _appStateHoc2.default)(ConnectedPlayer));

var appTarget = document.createElement('div');
document.body.appendChild(appTarget);

_reactDom2.default.render(_react2.default.createElement(WrappedPlayer, { isPlayerOnly: true }), appTarget);

/***/ }),

/***/ 1493:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(1494);

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

/***/ 1494:
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

/***/ })

},[[1492,0]]]);
//# sourceMappingURL=player.js.map