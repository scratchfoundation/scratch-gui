const React = require('react');
const ReactDOM = require('react-dom');
const GUI = require('./components/gui');

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(<GUI basePath={process.env.BASE_PATH} />, app);
