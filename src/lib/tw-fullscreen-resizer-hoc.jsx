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
            this.props.onSetDimensions([window.innerWidth, window.innerHeight]);
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                onSetDimensions,
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
        onSetDimensions: PropTypes.func
    };
    const mapStateToProps = state => ({

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
