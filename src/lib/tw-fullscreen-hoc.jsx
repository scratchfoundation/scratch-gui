import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setFullScreen} from '../reducers/mode';
import {setIsWindowFullScreen, setInnerWidth} from '../reducers/tw';

const TWFullScreenHOC = function (WrappedComponent) {
    class TWFullScreenHOC extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleResize',
                'handleFullScreenChange'
            ]);
        }
        componentDidMount () {
            window.addEventListener('resize', this.handleResize);
            document.addEventListener('fullscreenchange', this.handleFullScreenChange);
        }
        shouldComponentUpdate (nextProps) {
            return this.props.isFullScreen !== nextProps.isFullScreen;
        }
        componentDidUpdate () {
            if (document.fullscreenEnabled) {
                if (this.props.isFullScreen) {
                    document.body.requestFullscreen();
                } else if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
            }
        }
        componentWillUnmount () {
            window.removeEventListener('resize', this.handleResize);
            document.removeEventListener('fullscreenchange', this.handleFullScreenChange);
        }
        handleResize () {
            this.props.setInnerWidth(window.innerWidth);
        }
        handleFullScreenChange () {
            const isFullScreen = !!document.fullscreenElement;
            this.props.setWindowIsFullScreen(isFullScreen);
            this.props.setIsFullScreen(isFullScreen);
        }
        render () {
            return (
                <WrappedComponent
                    {...this.props}
                />
            );
        }
    }
    TWFullScreenHOC.propTypes = {
        isFullScreen: PropTypes.bool,
        setInnerWidth: PropTypes.func,
        setIsFullScreen: PropTypes.func,
        setWindowIsFullScreen: PropTypes.func
    };
    const mapStateToProps = state => ({
        isFullScreen: state.scratchGui.mode.isFullScreen
    });
    const mapDispatchToProps = dispatch => ({
        setIsFullScreen: isFullScreen => dispatch(setFullScreen(isFullScreen)),
        setWindowIsFullScreen: isFullScreen => dispatch(setIsWindowFullScreen(isFullScreen)),
        setInnerWidth: innerWidth => dispatch(setInnerWidth(innerWidth))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(TWFullScreenHOC);
};

export {
    TWFullScreenHOC as default
};
