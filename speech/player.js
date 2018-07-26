var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([["player"],{

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./src/playground/player.css":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/postcss-loader/lib??postcss!./src/playground/player.css ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".player_stage-only_3WHZN {\n    width: calc(480px + 1rem);\n}\n\n.player_stage-only_3WHZN * {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n", ""]);

// exports
exports.locals = {
	"stage-only": "player_stage-only_3WHZN",
	"stageOnly": "player_stage-only_3WHZN"
};

/***/ }),

/***/ "./src/playground/player.css":
/*!***********************************!*\
  !*** ./src/playground/player.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader??ref--5-1!../../node_modules/postcss-loader/lib??postcss!./player.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./src/playground/player.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/playground/player.jsx":
/*!***********************************!*\
  !*** ./src/playground/player.jsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _classnames = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _box = __webpack_require__(/*! ../components/box/box.jsx */ "./src/components/box/box.jsx");

var _box2 = _interopRequireDefault(_box);

var _gui = __webpack_require__(/*! ../containers/gui.jsx */ "./src/containers/gui.jsx");

var _gui2 = _interopRequireDefault(_gui);

var _hashParserHoc = __webpack_require__(/*! ../lib/hash-parser-hoc.jsx */ "./src/lib/hash-parser-hoc.jsx");

var _hashParserHoc2 = _interopRequireDefault(_hashParserHoc);

var _appStateHoc = __webpack_require__(/*! ../lib/app-state-hoc.jsx */ "./src/lib/app-state-hoc.jsx");

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _mode = __webpack_require__(/*! ../reducers/mode */ "./src/reducers/mode.js");

var _player = __webpack_require__(/*! ./player.css */ "./src/playground/player.css");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (false) {}

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

/***/ })

},[["./src/playground/player.jsx","lib.min"]]]);
//# sourceMappingURL=player.js.map