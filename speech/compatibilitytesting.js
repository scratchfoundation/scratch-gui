var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([["compatibilitytesting"],{

/***/ "./src/playground/compatibility-testing.jsx":
/*!**************************************************!*\
  !*** ./src/playground/compatibility-testing.jsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _gui = __webpack_require__(/*! ../containers/gui.jsx */ "./src/containers/gui.jsx");

var _gui2 = _interopRequireDefault(_gui);

var _hashParserHoc = __webpack_require__(/*! ../lib/hash-parser-hoc.jsx */ "./src/lib/hash-parser-hoc.jsx");

var _hashParserHoc2 = _interopRequireDefault(_hashParserHoc);

var _appStateHoc = __webpack_require__(/*! ../lib/app-state-hoc.jsx */ "./src/lib/app-state-hoc.jsx");

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WrappedGui = (0, _hashParserHoc2.default)((0, _appStateHoc2.default)(_gui2.default));

var DEFAULT_PROJECT_ID = '10015059';

var Player = function (_React$Component) {
    _inherits(Player, _React$Component);

    function Player(props) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, props));

        _this.updateProject = _this.updateProject.bind(_this);

        _this.state = {
            projectId: window.location.hash.substring(1) || DEFAULT_PROJECT_ID
        };
        return _this;
    }

    _createClass(Player, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('hashchange', this.updateProject);
            if (!window.location.hash.substring(1)) {
                window.location.hash = DEFAULT_PROJECT_ID;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.addEventListener('hashchange', this.updateProject);
        }
    }, {
        key: 'updateProject',
        value: function updateProject() {
            this.setState({ projectId: window.location.hash.substring(1) });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: { display: 'flex' } },
                _react2.default.createElement(WrappedGui, {
                    isPlayerOnly: true,
                    isFullScreen: false
                }),
                _react2.default.createElement('iframe', {
                    allowFullScreen: true,
                    allowTransparency: true,
                    frameBorder: '0',
                    height: '402',
                    src: 'https://scratch.mit.edu/projects/embed/' + this.state.projectId + '/?autostart=true',
                    width: '485'
                })
            );
        }
    }]);

    return Player;
}(_react2.default.Component);

var appTarget = document.createElement('div');
document.body.appendChild(appTarget);

_reactDom2.default.render(_react2.default.createElement(Player, null), appTarget);

/***/ })

},[["./src/playground/compatibility-testing.jsx","lib.min"]]]);
//# sourceMappingURL=compatibilitytesting.js.map