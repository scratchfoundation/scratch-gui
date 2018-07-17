var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[2],{

/***/ 1475:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(33);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(7);

var _controls = __webpack_require__(405);

var _controls2 = _interopRequireDefault(_controls);

var _blocks = __webpack_require__(331);

var _blocks2 = _interopRequireDefault(_blocks);

var _gui = __webpack_require__(123);

var _gui2 = _interopRequireDefault(_gui);

var _hashParserHoc = __webpack_require__(159);

var _hashParserHoc2 = _interopRequireDefault(_hashParserHoc);

var _appStateHoc = __webpack_require__(160);

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _blocksOnly = __webpack_require__(1476);

var _blocksOnly2 = _interopRequireDefault(_blocksOnly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
    return { vm: state.scratchGui.vm };
};

var VMBlocks = (0, _reactRedux.connect)(mapStateToProps)(_blocks2.default);
var VMControls = (0, _reactRedux.connect)(mapStateToProps)(_controls2.default);

var BlocksOnly = function BlocksOnly(props) {
    return _react2.default.createElement(
        _gui2.default,
        props,
        _react2.default.createElement(VMBlocks, {
            grow: 1,
            options: {
                media: 'static/blocks-media/'
            }
        }),
        _react2.default.createElement(VMControls, { className: _blocksOnly2.default.controls })
    );
};

var App = (0, _hashParserHoc2.default)((0, _appStateHoc2.default)(BlocksOnly));

var appTarget = document.createElement('div');
document.body.appendChild(appTarget);

_reactDom2.default.render(_react2.default.createElement(App, null), appTarget);

/***/ }),

/***/ 1476:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(1477);

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

/***/ 1477:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, ".blocks-only_controls_2GEvs {\n    position: absolute;\n    z-index: 2;\n    top: 10px;\n    right: 15px;\n}\n", ""]);

// exports
exports.locals = {
	"controls": "blocks-only_controls_2GEvs"
};

/***/ })

},[[1475,0]]]);
//# sourceMappingURL=blocksonly.js.map