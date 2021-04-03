import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import StudioView from '../tw-studioview/studioview.jsx';
import styles from './featured-projects.css';
import analytics from '../../lib/analytics';
import { setProjectId } from '../../lib/tw-navigation-utils.js';

class FeaturedProjects extends React.Component {
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
        this.props.setProjectId(id);
        analytics.twEvent('Load Featured');
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
                    <StudioView
                        id={this.props.studio}
                        onSelect={this.handleSelect}
                        placeholder={!opened}
                    />
                    {opened ? null : (
                        <div
                            className={styles.openerContainer}
                            onClick={this.handleOpenProjects}
                        >
                            <div className={styles.openerContent}>
                                <FormattedMessage
                                    defaultMessage="Click to view featured projects."
                                    description="Text to view featured projects"
                                    id="tw.viewFeaturedProjects"
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.footer}>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://scratch.mit.edu/studios/${this.props.studio}/`}
                    >
                        <FormattedMessage
                            defaultMessage="View studio on Scratch."
                            description="Link to turbowarp featured projects studio"
                            id="tw.featuredProjectsStudio"
                        />
                    </a>
                </div>
            </div>
        );
    }
}

FeaturedProjects.propTypes = {
    setProjectId: PropTypes.func,
    studio: PropTypes.string
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    setProjectId: projectId => setProjectId(dispatch, projectId)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeaturedProjects);
