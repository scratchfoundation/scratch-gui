import bindAll from 'lodash.bindall';
import classNames from 'classnames';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './import-error.css';

class ImportErrorContent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setHide',
            'setShow',
            'getContent'
        ]);
        this.state = {
            isShowing: true
        };
    }
    setShow () {
        // needed to set the opacity to 1, since the default is .9 on show
        this.setState({isShowing: true});
    }
    setHide () {
        this.setState({isShowing: false});
    }
    getContent () {
        return (
            <p>{this.props.errorMessage}</p>
        );
    }
    render () {
        return (
            <ReactTooltip
                afterHide={this.setHide}
                afterShow={this.setShow}
                className={classNames(
                    styles.importError,
                    this.props.className,
                    {
                        [styles.show]: (this.state.isShowing),
                        [styles.left]: (this.props.place === 'left'),
                        [styles.right]: (this.props.place === 'right'),
                        [styles.top]: (this.props.place === 'top'),
                        [styles.bottom]: (this.props.place === 'bottom')
                    }
                )}
                getContent={this.getContent}
                id={this.props.tooltipId}
            />
        );
    }
}

ImportErrorContent.propTypes = {
    className: PropTypes.string,
    intl: intlShape,
    place: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltipId: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired
};

ImportErrorContent.defaultProps = {
    place: 'bottom'
};

const ImportError = injectIntl(ImportErrorContent);

const ImportErrorTooltip = props => (
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
        <ImportError
            className={props.tooltipClassName}
            place={props.place}
            tooltipId={props.tooltipId}
            errorMessage={props.errorMessage}
        />
    </div>
);

ImportErrorTooltip.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    delayHide: PropTypes.number,
    delayShow: PropTypes.number,
    place: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    tooltipClassName: PropTypes.string,
    tooltipId: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired
};

ImportErrorTooltip.defaultProps = {
    delayHide: 0,
    delayShow: 0
};

export {
    ImportError as ImportErrorComponent,
    ImportErrorTooltip
};
