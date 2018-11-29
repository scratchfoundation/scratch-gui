let globalObject = console;
if (typeof (global) !== 'undefined') {
    globalObject = global;
}
if (typeof (window) !== 'undefined') {
    globalObject = window;
}
globalObject.Opal = require('opal-runtime').Opal;
require('opal-compiler');
globalObject.Opal.load('parser');
globalObject.Opal.load('parser/ruby25');
globalObject.Opal.Parser.CurrentRuby = globalObject.Opal.Parser.Ruby25;
