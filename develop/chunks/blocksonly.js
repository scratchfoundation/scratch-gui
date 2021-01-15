var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[3],{

/***/ 1472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(35);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 14 modules
var es = __webpack_require__(7);

// EXTERNAL MODULE: ./src/containers/controls.jsx + 8 modules
var controls = __webpack_require__(176);

// EXTERNAL MODULE: ./src/containers/blocks.jsx + 11 modules
var blocks = __webpack_require__(241);

// EXTERNAL MODULE: ./src/containers/gui.jsx + 332 modules
var gui = __webpack_require__(82);

// EXTERNAL MODULE: ./src/lib/hash-parser-hoc.jsx
var hash_parser_hoc = __webpack_require__(101);

// EXTERNAL MODULE: ./src/lib/app-state-hoc.jsx + 1 modules
var app_state_hoc = __webpack_require__(76);

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(6);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);

// EXTERNAL MODULE: ./node_modules/css-loader??ref--5-1!./node_modules/postcss-loader/src??postcss!./src/playground/blocks-only.css
var blocks_only = __webpack_require__(401);
var blocks_only_default = /*#__PURE__*/__webpack_require__.n(blocks_only);

// CONCATENATED MODULE: ./src/playground/blocks-only.css

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(blocks_only_default.a, options);



/* harmony default export */ var playground_blocks_only = (blocks_only_default.a.locals || {});
// CONCATENATED MODULE: ./src/playground/blocks-only.jsx










var mapStateToProps = function mapStateToProps(state) {
  return {
    vm: state.scratchGui.vm
  };
};

var VMBlocks = Object(es["b" /* connect */])(mapStateToProps)(blocks["a" /* default */]);
var VMControls = Object(es["b" /* connect */])(mapStateToProps)(controls["a" /* default */]);

var blocks_only_BlocksOnly = function BlocksOnly(props) {
  return /*#__PURE__*/react_default.a.createElement(gui["a" /* default */], props, /*#__PURE__*/react_default.a.createElement(VMBlocks, {
    grow: 1,
    options: {
      media: "static/blocks-media/"
    }
  }), /*#__PURE__*/react_default.a.createElement(VMControls, {
    className: playground_blocks_only.controls
  }));
};

var App = Object(app_state_hoc["a" /* default */])(Object(hash_parser_hoc["a" /* default */])(blocks_only_BlocksOnly));
var appTarget = document.createElement('div');
document.body.appendChild(appTarget);
react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(App, null), appTarget);

/***/ }),

/***/ 401:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".blocks-only_controls_2GEvs {\n    position: absolute;\n    z-index: 2;\n    top: 10px;\n    right: 15px;\n}\n", ""]);

// exports
exports.locals = {
	"controls": "blocks-only_controls_2GEvs"
};

/***/ })

},[[1472,0]]]);
//# sourceMappingURL=blocksonly.js.map