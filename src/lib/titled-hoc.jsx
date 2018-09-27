import React from 'react';
import bindAll from 'lodash.bindall';
import {defineMessages, intlShape, injectIntl} from 'react-intl';

const messages = defineMessages({
    defaultProjectTitle: {
        id: 'gui.gui.defaultProjectTitle',
        description: 'Default title for project',
        defaultMessage: 'Scratch Project'
    }
});

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
                projectTitle: this.props.intl.formatMessage(messages.defaultProjectTitle)
            };
        }
        handleUpdateProjectTitle (newTitle) {
            this.setState({projectTitle: newTitle});
        }
        render () {
            return (
                <WrappedComponent
                    projectTitle={this.state.projectTitle}
                    onUpdateProjectTitle={this.handleUpdateProjectTitle}
                    {...this.props}
                />
            );
        }
    }

    TitledComponent.propTypes = {
        intl: intlShape.isRequired
    };

    // return TitledComponent;
    const IntlTitledComponent = injectIntl(TitledComponent);
    return IntlTitledComponent;

};

export {
    TitledHOC as default
};
