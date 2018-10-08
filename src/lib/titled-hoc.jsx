import React from 'react';
import bindAll from 'lodash.bindall';
import {intlShape, injectIntl} from 'react-intl';
import {defaultProjectTitleMessages} from '../reducers/project-title';

/* Higher Order Component to get and set the project title
 * @param {React.Component} WrappedComponent component to receive project title related props
 * @returns {React.Component} component with project loading behavior
 */
const TitledHOC = function (WrappedComponent) {
    class TitledComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'handleUpdateProjectTitle'
            ]);
            this.state = {
                projectTitle: this.props.intl.formatMessage(defaultProjectTitleMessages.defaultProjectTitle)
            };
        }
        handleUpdateProjectTitle (newTitle) {
            this.setState({projectTitle: newTitle});
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                intl,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    projectTitle={this.state.projectTitle}
                    onUpdateProjectTitle={this.handleUpdateProjectTitle}
                    {...componentProps}
                />
            );
        }
    }

    TitledComponent.propTypes = {
        intl: intlShape.isRequired
    };

    return injectIntl(TitledComponent);
};

export {
    TitledHOC as default
};
