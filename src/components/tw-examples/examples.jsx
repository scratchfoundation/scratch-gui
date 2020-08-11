import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import StudioView from '../tw-studioview/studioview.jsx';
import styles from './examples.css';

const studioId = '27205657';

class Examples extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelect',
            'handleOpenProjects'
        ]);
        this.state = {
            opened: false
        };
    }
    handleSelect (id) {
        // this is terrible
        location.hash = '#' + id;
    }
    handleOpenProjects () {
        this.setState({
            opened: true
        });
    }
    render () {
        const opened = this.state.opened;
        return (
            <div
                className={classNames(
                    styles.container,
                    {
                        [styles.opened]: opened
                    }
                )}
            >
                <div className={styles.projects}>
                    {opened ? null : (
                        <div
                            className={styles.openerContainer}
                            onClick={this.handleOpenProjects}
                        >
                            <div className={styles.openerContent}>
                                <FormattedMessage
                                    defaultMessage="Click to view example projects."
                                    description="Text to view example projects"
                                    id="tw.examples.view"
                                />
                            </div>
                        </div>
                    )}
                    <StudioView
                        id={studioId}
                        onSelect={this.handleSelect}
                        placeholder={!opened}
                    />
                </div>
                <div className={styles.footer}>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://scratch.mit.edu/studios/${studioId}/`}
                    >
                        <FormattedMessage
                            defaultMessage="View studio on Scratch."
                            description="Link to turbowarp examples studio"
                            id="tw.examples.studioLink"
                        />
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    compatibilityMode: state.scratchGui.tw.compatibility
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Examples);
