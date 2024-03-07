var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[3],{

/***/ 1379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _containers_controls_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(212);
/* harmony import */ var _containers_blocks_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(266);
/* harmony import */ var _containers_gui_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(115);
/* harmony import */ var _lib_hash_parser_hoc_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(131);
/* harmony import */ var _lib_app_state_hoc_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(106);
/* harmony import */ var _blocks_only_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(657);
/* harmony import */ var _blocks_only_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_blocks_only_css__WEBPACK_IMPORTED_MODULE_8__);









var mapStateToProps = function mapStateToProps(state) {
  return {
    vm: state.scratchGui.vm
  };
};
var VMBlocks = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[/* connect */ "b"])(mapStateToProps)(_containers_blocks_jsx__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);
var VMControls = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[/* connect */ "b"])(mapStateToProps)(_containers_controls_jsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);
var BlocksOnly = function BlocksOnly(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_gui_jsx__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(VMBlocks, {
    grow: 1,
    options: {
      media: "static/blocks-media/"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(VMControls, {
    className: _blocks_only_css__WEBPACK_IMPORTED_MODULE_8___default.a.controls
  }));
};
var App = Object(_lib_app_state_hoc_jsx__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(Object(_lib_hash_parser_hoc_jsx__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(BlocksOnly));
var appTarget = document.createElement('div');
document.body.appendChild(appTarget);
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(App, null), appTarget);

/***/ }),

/***/ 1380:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(9);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".blocks-only_controls_2GEvs {\n    position: absolute;\n    z-index: 2;\n    top: 10px;\n    right: 15px;\n}\n", ""]);
// Exports
exports.locals = {
	"controls": "blocks-only_controls_2GEvs"
};
module.exports = exports;


/***/ }),

/***/ 657:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(1380);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(10)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

},[[1379,0]]]);
//# sourceMappingURL=blocksonly.js.map