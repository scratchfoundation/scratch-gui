import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import AppStateHOC from '../lib/app-state-hoc.jsx';
import Controls from '../containers/controls.jsx';
import Stage from '../containers/stage.jsx';
import Box from '../components/box/box.jsx';
import GUI from '../containers/gui.jsx';
import ProjectLoaderHOC from '../lib/project-loader-hoc.jsx';

import './player.css';

const mapStateToProps = state => ({vm: state.vm});

const VMStage = connect(mapStateToProps)(Stage);
const VMControls = connect(mapStateToProps)(Controls);

class Player extends React.Component {
    constructor (props) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
        this.state = this.getWindowSize();
    }
    componentDidMount () {
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize);
    }
    getWindowSize () {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    handleResize () {
        this.setState(this.getWindowSize());
    }
    render () {
        let height = this.state.height - 40;
        let width = height + (height / 3);
        if (width > this.state.width) {
            width = this.state.width;
            height = width * .75;
        }
        return (
            <GUI
                {...this.props}
                style={{
                    margin: '0 auto'
                }}
                width={width}
            >
                <Box height={40}>
                    <VMControls
                        style={{
                            marginRight: 10,
                            height: 40
                        }}
                    />
                </Box>
                <VMStage
                    height={height}
                    width={width}
                />
            </GUI>
        );
    }
}

const App = AppStateHOC(ProjectLoaderHOC(Player));

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

ReactDOM.render(<App />, appTarget);
