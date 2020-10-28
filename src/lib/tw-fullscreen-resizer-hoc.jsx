import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setDimensions} from '../reducers/tw';

const TWFullScreenResizerHOC = function (WrappedComponent) {
    class FullScreenResizer extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleResize'
            ]);
        }
        componentDidMount () {
            window.addEventListener('resize', this.handleResize);
        }
        componentWillUnmount () {
            window.removeEventListener('resize', this.handleResize);
        }
        handleResize () {
            if (this.props.isFullScreen) {
                this.props.onSetDimensions([window.innerWidth, window.innerHeight]);
            }
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                onSetDimensions,
                isFullScreen,
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
    FullScreenResizer.propTypes = {
        isFullScreen: PropTypes.bool,
        onSetDimensions: PropTypes.func
    };
    const mapStateToProps = state => ({
        isFullScreen: state.scratchGui.mode.isFullScreen || state.scratchGui.mode.isEmbedded
    });
    const mapDispatchToProps = dispatch => ({
        onSetDimensions: dimensions => dispatch(setDimensions(dimensions))
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(FullScreenResizer);
};

export {
    TWFullScreenResizerHOC as default
};
