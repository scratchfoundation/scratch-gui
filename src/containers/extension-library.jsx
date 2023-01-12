import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import VM from 'scratch-vm';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import extensionTags from '../lib/libraries/extension-tags';
import LibraryComponent from '../components/library/library.jsx';
import extensionIcon from '../components/action-menu/icon--sprite.svg';
import {loadExtensionLibraryContent} from '../reducers/extension-library.js';
import {showStandardAlert, closeAlertWithId} from '../reducers/alerts';

const messages = defineMessages({
    extensionTitle: {
        defaultMessage: 'Choose an Extension',
        description: 'Heading for the extension library',
        id: 'gui.extensionLibrary.chooseAnExtension'
    },
    extensionUrl: {
        defaultMessage: 'Enter the URL of the extension',
        description: 'Prompt for unoffical extension url',
        id: 'gui.extensionLibrary.extensionUrl'
    }
});

class ExtensionLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect'
        ]);
    }
    componentDidMount () {
        this.props.onLoadExtensionLibraryContent(this.props.intl.locale);
    }
    handleItemSelect (item) {
        const id = item.extensionId;
        let url = item.extensionURL ? item.extensionURL : id;
        if (!item.disabled && !id) {
            // eslint-disable-next-line no-alert
            url = prompt(this.props.intl.formatMessage(messages.extensionUrl));
        }
        if (id && !item.disabled) {
            if (this.props.vm.extensionManager.isExtensionLoaded(id)) {
                this.props.onCategorySelected(id);
            } else {
                this.props.onShowImporting();
                const loaders = (item.dependencies || [])
                    .filter(dependency =>
                        !this.props.vm.extensionManager.isExtensionLoaded(dependency[0])
                    )
                    .map(dependency =>
                        this.props.vm.extensionManager.loadExtensionURL(dependency[2] || dependency[0])
                    );
                loaders.push(this.props.vm.extensionManager.loadExtensionURL(url));
                Promise.all(loaders).then(() => {
                    this.props.onCloseImporting();
                    this.props.onCategorySelected(id);
                });
            }
        }
    }
    render () {
        const extensionLibraryThumbnailData = this.props.extensionLibraryContent.map(extension => ({
            rawURL: extension.iconURL || extensionIcon,
            ...extension
        }));
        return (
            <LibraryComponent
                data={extensionLibraryThumbnailData}
                id="extensionLibrary"
                tags={extensionTags}
                title={this.props.intl.formatMessage(messages.extensionTitle)}
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

ExtensionLibrary.propTypes = {
    extensionLibraryContent: PropTypes.arrayOf(PropTypes.shape({})),
    intl: intlShape.isRequired,
    onCategorySelected: PropTypes.func,
    onLoadExtensionLibraryContent: PropTypes.func,
    onRequestClose: PropTypes.func,
    onCloseImporting: PropTypes.func,
    onShowImporting: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

const mapStateToProps = state => ({
    extensionLibraryContent: state.scratchGui.extensionLibrary.extensions
});

const mapDispatchToProps = dispatch => ({
    onLoadExtensionLibraryContent: lang => loadExtensionLibraryContent(lang).then(dispatch),
    onCloseImporting: () => dispatch(closeAlertWithId('importingAsset')),
    onShowImporting: () => dispatch(showStandardAlert('importingAsset'))
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ExtensionLibrary);
