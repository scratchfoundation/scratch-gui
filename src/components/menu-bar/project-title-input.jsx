import classNames from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';
import {defineMessages, intlShape, injectIntl} from 'react-intl';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import Input from '../forms/input.jsx';
const BufferedInput = BufferedInputHOC(Input);

import styles from './project-title-input.css';

const messages = defineMessages({
    projectTitlePlaceholder: {
        id: 'gui.gui.projectTitlePlaceholder',
        description: 'Placeholder for project title when blank',
        defaultMessage: 'Project title here'
    }
});

class ProjectTitleInput extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleUpdateProjectTitle'
        ]);
    }
    // call onUpdateProjectTitle if it is defined (only defined when gui
    // is used within scratch-www)
    handleUpdateProjectTitle (newTitle) {
        if (this.props.onUpdateProjectTitle) {
            this.props.onUpdateProjectTitle(newTitle);
        }
    }
    render () {
        return (
            <BufferedInput
                className={classNames(styles.titleField, this.props.className)}
                maxLength="100"
                placeholder={this.props.intl.formatMessage(messages.projectTitlePlaceholder)}
                tabIndex="0"
                type="text"
                value={this.props.projectTitle}
                onSubmit={this.handleUpdateProjectTitle}
            />
        );
    }
}

ProjectTitleInput.propTypes = {
    className: PropTypes.string,
    intl: intlShape.isRequired,
    onUpdateProjectTitle: PropTypes.func,
    projectTitle: PropTypes.string
};

const mapStateToProps = state => ({
    projectTitle: state.scratchGui.projectTitle
});

const mapDispatchToProps = () => ({});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectTitleInput));
