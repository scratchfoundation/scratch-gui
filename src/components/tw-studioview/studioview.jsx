import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import classNames from 'classnames';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import StudioView from './studioview';
import styles from './studioview.css';

const messages = defineMessages({
    authorAttribution: {
        defaultMessage: 'by {author}',
        description: 'Displayed in StudioView under project title to credit creator',
        id: 'tw.studioview.authorAttribution'
    },
    hoverText: {
        defaultMessage: '{title} by {author}',
        description: 'Displayed in StudioView when hovering on a project',
        id: 'tw.studioview.hoverText'
    },
    error: {
        defaultMessage: 'There was an error loading the next page of projects.',
        description: 'Displayed in StudioView when an error occurs',
        id: 'tw.studioview.error'
    }
});

class StudioViewComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelect',
            'ref'
        ]);
    }
    componentDidMount () {
        this.studioView = new StudioView(this.props.id);
        this.studioView.messages.AUTHOR_ATTRIBUTION = this.props.intl.formatMessage(messages.authorAttribution, {
            // studioview uses $-based variables
            author: '$author'
        });
        this.studioView.messages.PROJECT_HOVER_TEXT = this.props.intl.formatMessage(messages.hoverText, {
            // studioview uses $-based variables
            author: '$author',
            title: '$title'
        });
        this.studioView.messages.LOAD_ERROR = this.props.intl.formatMessage(messages.error);
        if (this.props.placeholder) {
            this.studioView.addPlaceholders();
        } else {
            this.studioView.loadNextPage();
        }
        this.studioView.onselect = this.handleSelect;
        this.el.appendChild(this.studioView.root);
    }
    componentDidUpdate (prevProps) {
        if (prevProps.placeholder && !this.props.placeholder) {
            this.studioView.loadNextPage();
        }
    }
    handleSelect (id) {
        this.props.onSelect(id);
    }
    ref (el) {
        this.el = el;
    }
    render () {
        return (
            <div
                className={classNames(
                    styles.wrapper
                )}
                ref={this.ref}
            />
        );
    }
}

StudioViewComponent.propTypes = {
    id: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    placeholder: PropTypes.bool,
    onSelect: PropTypes.func.isRequired
};

export default injectIntl(StudioViewComponent);
