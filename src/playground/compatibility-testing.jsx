import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import Controls from '../containers/controls.jsx';
import Stage from '../containers/stage.jsx';
import Box from '../components/box/box.jsx';
import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';
const WrappedGui = HashParserHOC(AppStateHOC(GUI));

const mapStateToProps = state => ({vm: state.vm});

const VMStage = connect(mapStateToProps)(Stage);
const VMControls = connect(mapStateToProps)(Controls);

const DEFAULT_PROJECT_ID = '10015059';

class Player extends React.Component {
    constructor (props) {
        super(props);
        this.updateProject = this.updateProject.bind(this);

        this.state = {
            projectId: window.location.hash.substring(1) || DEFAULT_PROJECT_ID
        };
    }
    componentDidMount () {
        window.addEventListener('hashchange', this.updateProject);
        if (!window.location.hash.substring(1)) {
            window.location.hash = DEFAULT_PROJECT_ID;
        }
    }
    componentWillUnmount () {
        window.addEventListener('hashchange', this.updateProject);
    }
    updateProject () {
        this.setState({projectId: window.location.hash.substring(1)});
    }
    render () {
        return (
            <div style={{display: 'flex'}}>
                <WrappedGui
                    isPlayerOnly
                    isFullScreen={false}
                />
                <iframe
                    allowFullScreen
                    allowTransparency
                    frameBorder="0"
                    height="402"
                    src={`https://scratch.mit.edu/projects/embed/${this.state.projectId}/?autostart=true`}
                    width="485"
                />
            </div>
        );
    }
}

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

ReactDOM.render(<Player />, appTarget);
