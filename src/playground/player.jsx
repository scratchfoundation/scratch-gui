import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

import Box from '../components/box/box.jsx';
import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';
const WrappedGui = HashParserHOC(AppStateHOC(GUI));

if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
    // Warn before navigating away
    window.onbeforeunload = () => true;
}

import styles from './player.css';

class Player extends React.Component {
    constructor (props) {
        super(props);
        this.handleSeeInside = this.handleSeeInside.bind(this);
        this.handleSeeCommunity = this.handleSeeCommunity.bind(this);
        this.state = {
            isPlayerOnly: true
        };
    }
    handleSeeInside () {
        this.setState({isPlayerOnly: false});
    }
    handleSeeCommunity () {
        this.setState({isPlayerOnly: true});
    }
    render () {
        return (
            <Box
                className={classNames({
                    [styles.stageOnly]: this.state.isPlayerOnly
                })}
            >
                {this.state.isPlayerOnly && (
                    <button onClick={this.handleSeeInside}>{'See inside'}</button>
                )}
                <WrappedGui
                    enableCommunity
                    isPlayerOnly={this.state.isPlayerOnly}
                    onSeeCommunity={this.handleSeeCommunity}
                />
            </Box>
        );
    }
}

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

ReactDOM.render(<Player />, appTarget);
