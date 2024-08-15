/*
 * Attempts to balance the length of each line of wrapped text.
 * If the text does not wrap, this component will have no effect.
 * See https://developer.chrome.com/blog/css-text-wrap-balance/
 * Patterned after `react-balance-text` with adjustments to support our method of styling.
 * We may want to replace this with react-wrap-balancer once we use React >= 16.8
 */

import React from 'react';
import PropTypes from 'prop-types';

import balanceText from 'balance-text';
import bindAll from 'lodash.bindall';

class BalancedText extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'balanceText',
            'handleResize'
        ]);
        this.state = {
            forceHide: true
        };
    }

    componentDidMount () {
        self.addEventListener('resize', this.handleResize);
        this.stopHiding();
    }

    componentDidUpdate () {
        this.balanceText();
    }

    componentWillUnmount () {
        self.removeEventListener('resize', this.handleResize);
    }

    handleResize () {
        if (this.props.resize) {
            this.balanceText();
        }
    }

    balanceText () {
        const {container} = this;
        if (container) {
            balanceText(container, {});
        }
    }

    stopHiding () {
        this.setState({forceHide: false});
        setTimeout(() => this.balanceText(), 0);
    }

    render () {
        let {
            children,
            resize, // eslint-disable-line no-unused-vars
            style,
            ...otherProps
        } = this.props;

        if (this.state.forceHide) {
            style = Object.assign({}, style, {visibility: 'hidden'});
        }

        return (
            <div
                {...otherProps}
                style={style}
            >
                <span
                    ref={container => {
                        this.container = container;
                    }}
                >
                    {children}
                </span>
            </div>
        );
    }
}

BalancedText.propTypes = {
    children: PropTypes.node,
    resize: PropTypes.bool,
    style: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

BalancedText.defaultProps = {
    resize: true
};

export default BalancedText;
