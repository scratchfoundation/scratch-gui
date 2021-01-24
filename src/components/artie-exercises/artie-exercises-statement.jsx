import bindAll from 'lodash.bindall';
import classNames from 'classnames';
import {injectIntl, intlShape} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './artie-exercises-statement.css';

class ArtieExerciseStatementContent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setHide',
            'setShow',
            'getMessage'
        ]);
        this.state = {
            isShowing: false
        };
    }
    setShow () {
        // needed to set the opacity to 1, since the default is .9 on show
        this.setState({isShowing: true});
    }
    setHide () {
        this.setState({isShowing: false});
    }
    getMessage () {
        return (
            <span>{this.props.message}</span>
        );
    }
    render () {
        return (
            <ReactTooltip
                afterHide={this.setHide}
                afterShow={this.setShow}
                className={classNames(
                    styles.artieExercisesStatement,
                    this.props.className,
                    {
                        [styles.show]: (this.state.isShowing),
                        [styles.left]: (this.props.place === 'left'),
                        [styles.right]: (this.props.place === 'right'),
                        [styles.top]: (this.props.place === 'top'),
                        [styles.bottom]: (this.props.place === 'bottom')
                    }
                )}
                getContent={this.getMessage}
                id={this.props.tooltipId}
            />
        );
    }
}

ArtieExerciseStatementContent.propTypes = {
    className: PropTypes.string,
    intl: intlShape,
    place: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltipId: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

ArtieExerciseStatementContent.defaultProps = {
    place: 'bottom'
};

const ArtieExerciseStatement = injectIntl(ArtieExerciseStatementContent);

const ArtieExerciseStatementTooltip = props => (
    <div className={props.className}>
        <div
            data-delay-hide={props.delayHide}
            data-delay-show={props.delayShow}
            data-effect="solid"
            data-for={props.tooltipId}
            data-place={props.place}
            data-tip="tooltip"
        >
            {props.children}
        </div>
        <ArtieExerciseStatement
            className={props.tooltipClassName}
            place={props.place}
            tooltipId={props.tooltipId}
            message={props.message}
        />
    </div>
);

ArtieExerciseStatementTooltip.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    delayHide: PropTypes.number,
    delayShow: PropTypes.number,
    place: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltipClassName: PropTypes.string,
    tooltipId: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

ArtieExerciseStatementTooltip.defaultProps = {
    delayHide: 0,
    delayShow: 0
};

export {
    ArtieExerciseStatement as ArtieExerciseStatementComponent,
    ArtieExerciseStatementTooltip
};
