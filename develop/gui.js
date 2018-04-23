var GUI =
webpackJsonpGUI([0],{

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(149);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(12);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactModal = __webpack_require__(16);

var _reactModal2 = _interopRequireDefault(_reactModal);

var _analytics = __webpack_require__(10);

var _analytics2 = _interopRequireDefault(_analytics);

var _gui = __webpack_require__(23);

var _gui2 = _interopRequireDefault(_gui);

var _errorBoundaryHoc = __webpack_require__(506);

var _errorBoundaryHoc2 = _interopRequireDefault(_errorBoundaryHoc);

var _index = __webpack_require__(512);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (false) {
    // Warn before navigating away
    window.onbeforeunload = function () {
        return true;
    };
}

// Register "base" page view
_analytics2.default.pageview('/');

var App = (0, _errorBoundaryHoc2.default)(_gui2.default);

var appTarget = document.createElement('div');
appTarget.className = _index2.default.app;
document.body.appendChild(appTarget);

_reactModal2.default.setAppElement(appTarget);

_reactDom2.default.render(_react2.default.createElement(App, null), appTarget);

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(150).polyfill();


/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),

/***/ 506:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _errorBoundary = __webpack_require__(507);

var _errorBoundary2 = _interopRequireDefault(_errorBoundary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Higher Order Component to provide error boundary for wrapped component
 * @param {React.Component} WrappedComponent - component to provide state for
 * @returns {React.Component} component with error boundary
 */
var ErrorBoundaryHOC = function ErrorBoundaryHOC(WrappedComponent) {
    var ErrorBoundaryWrapper = function ErrorBoundaryWrapper(props) {
        return _react2.default.createElement(
            _errorBoundary2.default,
            null,
            _react2.default.createElement(WrappedComponent, props)
        );
    };
    return ErrorBoundaryWrapper;
};

exports.default = ErrorBoundaryHOC;

/***/ }),

/***/ 507:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _platform = __webpack_require__(52);

var _platform2 = _interopRequireDefault(_platform);

var _browserModal = __webpack_require__(131);

var _browserModal2 = _interopRequireDefault(_browserModal);

var _crashMessage = __webpack_require__(508);

var _crashMessage2 = _interopRequireDefault(_crashMessage);

var _log = __webpack_require__(25);

var _log2 = _interopRequireDefault(_log);

var _analytics = __webpack_require__(10);

var _analytics2 = _interopRequireDefault(_analytics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorBoundary = function (_React$Component) {
    _inherits(ErrorBoundary, _React$Component);

    function ErrorBoundary(props) {
        _classCallCheck(this, ErrorBoundary);

        var _this = _possibleConstructorReturn(this, (ErrorBoundary.__proto__ || Object.getPrototypeOf(ErrorBoundary)).call(this, props));

        _this.state = {
            hasError: false
        };
        return _this;
    }

    _createClass(ErrorBoundary, [{
        key: 'componentDidCatch',
        value: function componentDidCatch(error, info) {
            // Display fallback UI
            this.setState({ hasError: true });
            _log2.default.error('Unhandled Error: ' + error.stack + '\nComponent stack: ' + info.componentStack);
            _analytics2.default.event({
                category: 'error',
                action: 'Fatal Error',
                label: error.message
            });
        }
    }, {
        key: 'handleBack',
        value: function handleBack() {
            window.history.back();
        }
    }, {
        key: 'handleReload',
        value: function handleReload() {
            window.location.replace(window.location.origin + window.location.pathname);
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.hasError) {
                // don't use array.includes because that's something that causes IE to crash.
                if (_platform2.default.name === 'IE' || _platform2.default.name === 'Opera' || _platform2.default.name === 'Opera Mini' || _platform2.default.name === 'Silk') {
                    return _react2.default.createElement(_browserModal2.default, { onBack: this.handleBack });
                }
                return _react2.default.createElement(_crashMessage2.default, { onReload: this.handleReload });
            }
            return this.props.children;
        }
    }]);

    return ErrorBoundary;
}(_react2.default.Component);

ErrorBoundary.propTypes = {
    children: _propTypes2.default.node
};

exports.default = ErrorBoundary;

/***/ }),

/***/ 508:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _box = __webpack_require__(6);

var _box2 = _interopRequireDefault(_box);

var _crashMessage = __webpack_require__(509);

var _crashMessage2 = _interopRequireDefault(_crashMessage);

var _reload = __webpack_require__(511);

var _reload2 = _interopRequireDefault(_reload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CrashMessage = function CrashMessage(props) {
    return _react2.default.createElement(
        'div',
        { className: _crashMessage2.default.crashWrapper },
        _react2.default.createElement(
            _box2.default,
            { className: _crashMessage2.default.body },
            _react2.default.createElement('img', {
                className: _crashMessage2.default.reloadIcon,
                src: _reload2.default
            }),
            _react2.default.createElement(
                'h2',
                null,
                'Oops! Something went wrong.'
            ),
            _react2.default.createElement(
                'p',
                null,
                'We are so sorry, but it looks like Scratch has crashed. This bug has been automatically reported to the Scratch Team. Please refresh your page to try again.'
            ),
            _react2.default.createElement(
                'button',
                {
                    className: _crashMessage2.default.reloadButton,
                    onClick: props.onReload
                },
                'Reload'
            )
        )
    );
};

CrashMessage.propTypes = {
    onReload: _propTypes2.default.func.isRequired
};

exports.default = CrashMessage;

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(510);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./crash-message.css", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/lib/index.js??postcss!./crash-message.css");

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

/***/ 510:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "/* #E5F0FF */ /* #E9F1FC */ /* #D9E3F2 */ /* 90% transparent version of motion-primary */ /* #FFFFFF */ /* 25% transparent version of ui-white */ /* 15% transparent version of black */ /* #575E75 */ /* #4C97FF */ /* #3373CC */ /* 35% transparent version of motion-primary */ /* #FF661A */ /* #E64D00 */ /* #CF63CF */ /* #BD42BD */ /* #FFAB19 */ /* #FF8C1A */ /* #0FBD8C */ /* layout contants from `layout-constants.js` */ body {\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n} h2 {\n    font-size: 1.5rem;\n    font-weight: bold;\n} p {\n    font-size: 1rem;\n    line-height: 1.5em;\n} .crash-message_crash-wrapper_25B61 {\n    background-color: hsla(215, 100%, 65%, 1);\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n} .crash-message_body_1q0lu {\n    width: 35%;\n    color: white;\n    text-align: center;\n} .crash-message_reloadButton_FoS7x {\n    border: 1px solid hsla(215, 100%, 65%, 1);\n    border-radius: 0.25rem;\n    padding: 0.5rem 2rem;\n    background: white;\n    color: hsla(215, 100%, 65%, 1);\n    font-weight: bold;\n    font-size: 0.875rem;\n    cursor: pointer;\n}\n", ""]);

// exports
exports.locals = {
	"crash-wrapper": "crash-message_crash-wrapper_25B61",
	"crashWrapper": "crash-message_crash-wrapper_25B61",
	"body": "crash-message_body_1q0lu",
	"reloadButton": "crash-message_reloadButton_FoS7x"
};

/***/ }),

/***/ 511:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/assets/dd98971c2c185caf86144b6b5234d0fa.svg";

/***/ }),

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(513);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(3)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??postcss!./index.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??postcss!./index.css");

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

/***/ 513:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "html,\nbody,\n.index_app_3Qs6X {\n    /* probably unecessary, transitional until layout is refactored */\n    width: 100%; \n    height: 100%;\n    margin: 0;\n}\n\n/* @todo: move globally? Safe / side FX, for blocks particularly? */\n\n* { -webkit-box-sizing: border-box; box-sizing: border-box; }\n", ""]);

// exports
exports.locals = {
	"app": "index_app_3Qs6X"
};

/***/ })

},[148]);
//# sourceMappingURL=gui.js.map