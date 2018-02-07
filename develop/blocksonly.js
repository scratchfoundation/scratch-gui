webpackJsonp([2],{

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(13);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(6);

var _appStateHoc = __webpack_require__(22);

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _controls = __webpack_require__(28);

var _controls2 = _interopRequireDefault(_controls);

var _blocks = __webpack_require__(88);

var _blocks2 = _interopRequireDefault(_blocks);

var _gui = __webpack_require__(24);

var _gui2 = _interopRequireDefault(_gui);

var _projectLoaderHoc = __webpack_require__(29);

var _projectLoaderHoc2 = _interopRequireDefault(_projectLoaderHoc);

var _blocksOnly = __webpack_require__(476);

var _blocksOnly2 = _interopRequireDefault(_blocksOnly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
    return { vm: state.vm };
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

var App = (0, _appStateHoc2.default)((0, _projectLoaderHoc2.default)(BlocksOnly));

var appTarget = document.createElement('div');
document.body.appendChild(appTarget);

_reactDom2.default.render(_react2.default.createElement(App, null), appTarget);

/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(477);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??postcss!./blocks-only.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??postcss!./blocks-only.css");

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

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".blocks-only_controls_1gHLl {\n    position: absolute;\n    z-index: 2;\n    top: 10px;\n    right: 15px;\n}\n", ""]);

// exports
exports.locals = {
	"controls": "blocks-only_controls_1gHLl"
};

/***/ })

},[475]);
//# sourceMappingURL=blocksonly.js.map