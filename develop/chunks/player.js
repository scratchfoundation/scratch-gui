var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[9],{

/***/ 1470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(4);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(0);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(35);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 14 modules
var es = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/redux/es/index.js + 6 modules
var redux_es = __webpack_require__(31);

// EXTERNAL MODULE: ./src/components/box/box.jsx + 1 modules
var box = __webpack_require__(8);

// EXTERNAL MODULE: ./src/containers/gui.jsx + 332 modules
var gui = __webpack_require__(82);

// EXTERNAL MODULE: ./src/lib/hash-parser-hoc.jsx
var hash_parser_hoc = __webpack_require__(101);

// EXTERNAL MODULE: ./src/lib/app-state-hoc.jsx + 1 modules
var app_state_hoc = __webpack_require__(76);

// EXTERNAL MODULE: ./src/reducers/mode.js
var mode = __webpack_require__(56);

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(6);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);

// EXTERNAL MODULE: ./node_modules/css-loader??ref--5-1!./node_modules/postcss-loader/src??postcss!./src/playground/player.css
var player = __webpack_require__(402);
var player_default = /*#__PURE__*/__webpack_require__.n(player);

// CONCATENATED MODULE: ./src/playground/player.css

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(player_default.a, options);



/* harmony default export */ var playground_player = (player_default.a.locals || {});
// CONCATENATED MODULE: ./src/playground/player.jsx
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }













if ( true && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
  // Warn before navigating away
  window.onbeforeunload = function () {
    return true;
  };
}



var player_Player = function Player(_ref) {
  var isPlayerOnly = _ref.isPlayerOnly,
      onSeeInside = _ref.onSeeInside,
      projectId = _ref.projectId;
  return /*#__PURE__*/react_default.a.createElement(box["a" /* default */], {
    className: classnames_default()(isPlayerOnly ? playground_player.stageOnly : playground_player.editor)
  }, isPlayerOnly && /*#__PURE__*/react_default.a.createElement("button", {
    onClick: onSeeInside
  }, 'See inside'), /*#__PURE__*/react_default.a.createElement(gui["a" /* default */], {
    canEditTitle: true,
    enableCommunity: true,
    isPlayerOnly: isPlayerOnly,
    projectId: projectId
  }));
};

player_Player.propTypes = {
  isPlayerOnly: prop_types_default.a.bool,
  onSeeInside: prop_types_default.a.func,
  projectId: prop_types_default.a.string
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly
  };
};

var player_mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSeeInside: function onSeeInside() {
      return dispatch(Object(mode["d" /* setPlayer */])(false));
    }
  };
};

var ConnectedPlayer = Object(es["b" /* connect */])(mapStateToProps, player_mapDispatchToProps)(player_Player); // note that redux's 'compose' function is just being used as a general utility to make
// the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
// ability to compose reducers.

var WrappedPlayer = Object(redux_es["d" /* compose */])(app_state_hoc["a" /* default */], hash_parser_hoc["a" /* default */])(ConnectedPlayer);
var appTarget = document.createElement('div');
document.body.appendChild(appTarget);
react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(WrappedPlayer, {
  isPlayerOnly: true
}), appTarget);

/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".player_stage-only_3WHZN {\n    width: calc(480px + 1rem);\n}\n\n.player_editor_wkTja {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n}\n\n.player_stage-only_3WHZN * {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n", ""]);

// exports
exports.locals = {
	"stage-only": "player_stage-only_3WHZN",
	"stageOnly": "player_stage-only_3WHZN",
	"editor": "player_editor_wkTja"
};

/***/ })

},[[1470,0]]]);
//# sourceMappingURL=player.js.map