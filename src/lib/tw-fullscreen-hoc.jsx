import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setFullScreen} from '../reducers/mode';
import {setIsWindowFullScreen, setInnerWidth} from '../reducers/tw';

const TWFullScreenHOC = function (WrappedComponent) {
    class FullScreenComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleResize',
                'handleFullScreenChange'
            ]);
            this.initialTitle = document.title;
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
            this.props.onSetInnerWidth(window.innerWidth);
        }
        handleFullScreenChange () {
            const isFullScreen = !!document.fullscreenElement;
            this.props.onSetWindowIsFullScreen(isFullScreen);
            this.props.onSetIsFullScreen(isFullScreen);
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                isFullScreen,
                onSetInnerWidth,
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
        onSetInnerWidth: PropTypes.func,
        onSetIsFullScreen: PropTypes.func,
        onSetWindowIsFullScreen: PropTypes.func
    };
    const mapStateToProps = state => ({
        isFullScreen: state.scratchGui.mode.isFullScreen
    });
    const mapDispatchToProps = dispatch => ({
        onSetIsFullScreen: isFullScreen => dispatch(setFullScreen(isFullScreen)),
        onSetWindowIsFullScreen: isFullScreen => dispatch(setIsWindowFullScreen(isFullScreen)),
        onSetInnerWidth: innerWidth => dispatch(setInnerWidth(innerWidth))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(FullScreenComponent);
};

export {
    TWFullScreenHOC as default
};
