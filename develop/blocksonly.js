webpackJsonp([2],{

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(36);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(17);

var _appStateHoc = __webpack_require__(98);

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _greenFlag = __webpack_require__(119);

var _greenFlag2 = _interopRequireDefault(_greenFlag);

var _stopAll = __webpack_require__(122);

var _stopAll2 = _interopRequireDefault(_stopAll);

var _blocks = __webpack_require__(219);

var _blocks2 = _interopRequireDefault(_blocks);

var _gui = __webpack_require__(116);

var _gui2 = _interopRequireDefault(_gui);

var _projectLoaderHoc = __webpack_require__(123);

var _projectLoaderHoc2 = _interopRequireDefault(_projectLoaderHoc);

var _blocksOnly = __webpack_require__(696);

var _blocksOnly2 = _interopRequireDefault(_blocksOnly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
    return { vm: state.vm };
};

var VMBlocks = (0, _reactRedux.connect)(mapStateToProps)(_blocks2.default);
var VMGreenFlag = (0, _reactRedux.connect)(mapStateToProps)(_greenFlag2.default);
var VMStopAll = (0, _reactRedux.connect)(mapStateToProps)(_stopAll2.default);

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
        _react2.default.createElement(VMGreenFlag, { className: _blocksOnly2.default.greenFlag }),
        _react2.default.createElement(VMStopAll, { className: _blocksOnly2.default.stopAll })
    );
};

var App = (0, _appStateHoc2.default)((0, _projectLoaderHoc2.default)(BlocksOnly));

var appTarget = document.createElement('div');
document.body.appendChild(appTarget);

_reactDom2.default.render(_react2.default.createElement(App, null), appTarget);

/***/ }),

/***/ 696:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(697);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??postcss!./blocks-only.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??postcss!./blocks-only.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 697:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, ".blocks-only_green-flag_1bT2v {\n    position: absolute;\n    z-index: 2;\n    top: 10px;\n    right: 50px;\n}\n\n.blocks-only_stop-all_TWY-P {\n    position: absolute;\n    z-index: 2;\n    top: 10px;\n    right: 15px;\n}\n", ""]);

// exports
exports.locals = {
	"green-flag": "blocks-only_green-flag_1bT2v",
	"greenFlag": "blocks-only_green-flag_1bT2v",
	"stop-all": "blocks-only_stop-all_TWY-P",
	"stopAll": "blocks-only_stop-all_TWY-P"
};

/***/ })

},[695]);
//# sourceMappingURL=blocksonly.js.map