import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import VM from 'scratch-vm';

import Modal from './modal.jsx';
import Divider from '../components/divider/divider.jsx';
import Filter from '../components/filter/filter.jsx';
import TagButton from './tag-button.jsx';
import Spinner from '../components/spinner/spinner.jsx';
import DataTable from '../components/file-library/data-table.jsx';

import styles from '../components/library/library.css';

const messages = defineMessages({
    libraryTitle: {
        defaultMessage: 'Choose a Sprite',
        description: 'Heading for the sprite library',
        id: 'gui.fileLibrary.chooseASprite'
    }
});

class FileLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setFilteredDataRef',
            'handleFileNameClick',
            'getColumns'
        ]);

        this.state = {
            fileNames: [],
            fileData: [],
            filterQuery: '',
            selectedFileIndex: 0,
            loaded: false
        };
    }

    componentDidMount () {
        // Allow the spinner to display before loading the content
        let names = this.props.vm.getDataFileNames();
        let data = [];
        if(names[0].tag !== "NO FILES UPLOADED") {
            data = this.props.vm.getDataFileContents(names[0].tag);
        }
        this.setState({
            fileNames: names,
            fileData: data
        });

        setTimeout(() => {
            this.setState({loaded: true});
        });
    }

    setFilteredDataRef (ref) {
        this.filteredDataRef = ref;
    }

    handleFileNameClick(name) {
        let index = this.state.fileNames.map(tag => tag.tag).indexOf(name);

        let data = this.props.vm.getDataFileContents(name);

        this.setState({
            selectedFileIndex: index,
            fileData: data
        });
    }

    getColumns() {
        let columns = [];

        let first = this.state.fileData[0];
        if(first) {
            return Object.keys(first);
        }
        return columns;
    }
 
    render () {
        return (
            <Modal
                fullScreen
                contentLabel={"View File"}
                id={"fileLibrary"}
                onRequestClose={this.props.onRequestClose}
            >
            <div className={styles.filterBar}>
                {/* <Filter
                    className={classNames(
                        styles.filterBarItem,
                        styles.filter
                    )}
                    filterQuery={this.state.filterQuery}
                    inputClassName={styles.filterInput}
                    placeholderText="Search"
                    onChange={this.handleFilterChange}
                    onClear={this.handleFilterClear}
                />
                <Divider className={classNames(styles.filterBarItem, styles.divider)} /> */}
                <div className={styles.tagWrapper}>
                    {this.state.fileNames.map((tagProps, id) => (
                        <TagButton
                            active={this.state.selectedFileIndex === id}
                            className={classNames(
                                styles.filterBarItem,
                                styles.tagButton,
                                tagProps.className
                            )}
                            key={`tag-button-${id}`}
                            onClick={this.handleFileNameClick}
                            {...tagProps}
                        />
                    ))}
                </div>
            </div>
            <div
                className={classNames(styles.libraryScrollGrid, styles.withFilterBar)}
                ref={this.setFilteredDataRef}
            >
                {this.state.loaded ? (
                    <DataTable data={this.state.fileData} header={this.getColumns()}/>
                ) : (
                    <div className={styles.spinnerWrapper}>
                        <Spinner
                            large
                            level="primary"
                        />
                    </div>
                )}
            </div>
        </Modal>
        );
    }
}

FileLibrary.propTypes = {
    intl: intlShape.isRequired,
    onActivateBlocksTab: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default injectIntl(FileLibrary);
