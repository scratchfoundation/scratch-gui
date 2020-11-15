import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setFullScreen} from '../reducers/mode';
import {setIsWindowFullScreen} from '../reducers/tw';
import FullscreenAPI from './tw-fullscreen-api';

const TWFullScreenHOC = function (WrappedComponent) {
    class FullScreenComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleFullScreenChange'
            ]);
        }
        componentDidMount () {
            document.addEventListener('fullscreenchange', this.handleFullScreenChange);
            document.addEventListener('webkitfullscreenchange', this.handleFullScreenChange);
        }
        shouldComponentUpdate (nextProps) {
            return this.props.isFullScreen !== nextProps.isFullScreen;
        }
        componentDidUpdate () {
            if (FullscreenAPI.available()) {
                if (this.props.isFullScreen) {
                    FullscreenAPI.request();
                } else if (FullscreenAPI.enabled()) {
                    FullscreenAPI.exit();
                }
            }
        }
        componentWillUnmount () {
            document.removeEventListener('fullscreenchange', this.handleFullScreenChange);
            document.removeEventListener('webkitfullscreenchange', this.handleFullScreenChange);
        }
        handleFullScreenChange () {
            const isFullScreen = FullscreenAPI.enabled();
            this.props.onSetWindowIsFullScreen(isFullScreen);
            this.props.onSetIsFullScreen(isFullScreen);
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                isFullScreen,
                onSetIsFullScreen,
                onSetWindowIsFullScreen,
                /* eslint-enable no-unused-vars */
                ...props
            } = this.props;
            return (
                <WrappedComponent
                    {...props}
                />
            );
        }
    }
    FullScreenComponent.propTypes = {
        isFullScreen: PropTypes.bool,
        onSetIsFullScreen: PropTypes.func,
        onSetWindowIsFullScreen: PropTypes.func
    };
    const mapStateToProps = state => ({
        isFullScreen: state.scratchGui.mode.isFullScreen
    });
    const mapDispatchToProps = dispatch => ({
        onSetIsFullScreen: isFullScreen => dispatch(setFullScreen(isFullScreen)),
        onSetWindowIsFullScreen: isFullScreen => dispatch(setIsWindowFullScreen(isFullScreen))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(FullScreenComponent);
};

export {
    TWFullScreenHOC as default
};
