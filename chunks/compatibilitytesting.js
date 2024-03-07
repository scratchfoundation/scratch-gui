var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[4],{

/***/ 1381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _containers_gui_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(115);
/* harmony import */ var _lib_hash_parser_hoc_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(131);
/* harmony import */ var _lib_app_state_hoc_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(106);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var WrappedGui = Object(_lib_app_state_hoc_jsx__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(Object(_lib_hash_parser_hoc_jsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(_containers_gui_jsx__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]));
var DEFAULT_PROJECT_ID = '10015059';
var Player = /*#__PURE__*/function (_React$Component) {
  _inherits(Player, _React$Component);
  function Player(props) {
    var _this;
    _classCallCheck(this, Player);
    _this = _callSuper(this, Player, [props]);
    _this.updateProject = _this.updateProject.bind(_assertThisInitialized(_this));
    _this.state = {
      projectId: window.location.hash.substring(1) || DEFAULT_PROJECT_ID
    };
    return _this;
  }
  _createClass(Player, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('hashchange', this.updateProject);
      if (!window.location.hash.substring(1)) {
        window.location.hash = DEFAULT_PROJECT_ID;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.addEventListener('hashchange', this.updateProject);
    }
  }, {
    key: "updateProject",
    value: function updateProject() {
      this.setState({
        projectId: window.location.hash.substring(1)
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          display: 'flex'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(WrappedGui, {
        isPlayerOnly: true,
        isFullScreen: false
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe", {
        allowFullScreen: true,
        allowTransparency: true,
        frameBorder: "0",
        height: "402",
        src: "https://scratch.mit.edu/projects/embed/".concat(this.state.projectId, "/?autostart=true"),
        width: "485"
      }));
    }
  }]);
  return Player;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
var appTarget = document.createElement('div');
document.body.appendChild(appTarget);
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Player, null), appTarget);

/***/ })

},[[1381,0]]]);
//# sourceMappingURL=compatibilitytesting.js.map