var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[5],{

/***/ 1552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42);
/* harmony import */ var _components_box_box_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);
/* harmony import */ var _containers_gui_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(113);
/* harmony import */ var _lib_hash_parser_hoc_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(135);
/* harmony import */ var _lib_app_state_hoc_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(105);
/* harmony import */ var _reducers_mode__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(77);
/* harmony import */ var _player_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(383);
/* harmony import */ var _player_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_player_css__WEBPACK_IMPORTED_MODULE_11__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }













if ( true && (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
  // Warn before navigating away
  window.onbeforeunload = function () {
    return true;
  };
}



var Player = function Player(_ref) {
  var isPlayerOnly = _ref.isPlayerOnly,
      onSeeInside = _ref.onSeeInside,
      projectId = _ref.projectId;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_components_box_box_jsx__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(isPlayerOnly ? _player_css__WEBPACK_IMPORTED_MODULE_11___default.a.stageOnly : _player_css__WEBPACK_IMPORTED_MODULE_11___default.a.editor)
  }, isPlayerOnly && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
    onClick: onSeeInside
  }, 'See inside'), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_containers_gui_jsx__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    canEditTitle: true,
    enableCommunity: true,
    isPlayerOnly: isPlayerOnly,
    projectId: projectId
  }));
};

Player.propTypes = {
  isPlayerOnly: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  onSeeInside: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  projectId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSeeInside: function onSeeInside() {
      return dispatch(Object(_reducers_mode__WEBPACK_IMPORTED_MODULE_10__[/* setPlayer */ "d"])(false));
    }
  };
};

var ConnectedPlayer = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[/* connect */ "b"])(mapStateToProps, mapDispatchToProps)(Player); // note that redux's 'compose' function is just being used as a general utility to make
// the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
// ability to compose reducers.

var WrappedPlayer = Object(redux__WEBPACK_IMPORTED_MODULE_5__[/* compose */ "d"])(_lib_app_state_hoc_jsx__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], _lib_hash_parser_hoc_jsx__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(ConnectedPlayer);
var appTarget = document.createElement('div');
document.body.appendChild(appTarget);
react_dom__WEBPACK_IMPORTED_MODULE_3___default.a.render(react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(WrappedPlayer, {
  isPlayerOnly: true
}), appTarget);

/***/ }),

/***/ 1553:
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

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(1553);

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

},[[1552,0]]]);
//# sourceMappingURL=player.js.map