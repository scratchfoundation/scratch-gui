webpackJsonp([0],{

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(13);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _appStateHoc = __webpack_require__(27);

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _gui = __webpack_require__(30);

var _gui2 = _interopRequireDefault(_gui);

var _projectLoaderHoc = __webpack_require__(33);

var _projectLoaderHoc2 = _interopRequireDefault(_projectLoaderHoc);

var _index = __webpack_require__(448);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = (0, _appStateHoc2.default)((0, _projectLoaderHoc2.default)(_gui2.default));

var appTarget = document.createElement('div');
appTarget.className = _index2.default.app;
document.body.appendChild(appTarget);

_reactDom2.default.render(_react2.default.createElement(App, null), appTarget);

/***/ }),

/***/ 448:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(449);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/lib/index.js??postcss!./index.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/lib/index.js??postcss!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "html,\nbody,\n.index_app_3cj18 {\n    /* probably unecessary, transitional until layout is refactored */\n    width: 100%; \n    height: 100%;\n    margin: 0;\n}\n\n/* @todo: move globally? Safe / side FX, for blocks particularly? */\n\n* { -webkit-box-sizing: border-box; box-sizing: border-box; }\n", ""]);

// exports
exports.locals = {
	"app": "index_app_3cj18"
};

/***/ })

},[137]);
//# sourceMappingURL=gui.js.map