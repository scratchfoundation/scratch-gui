const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const ReactModal = require('react-modal');

const Box = require('../box/box.jsx');
const CloseButton = require('../close-button/close-button.jsx');
const Filter = require('../filter/filter.jsx');

const styles = require('./modal.css');

class ModalComponent extends React.Component {
    render () {
        return (
            <ReactModal
                className={classNames(styles.modalContent, this.props.className)}
                contentLabel={this.props.contentLabel}
                isOpen={this.props.visible}
                overlayClassName={styles.modalOverlay}
                ref={m => (this.modal = m)}
                onRequestClose={this.props.onRequestClose}
            >
                <Box
                    direction="column"
                    grow={1}
                >
                    <div className={styles.header}>
                        <div className={classNames(styles.headerItem, styles.headerItemFilter)}>
                            {this.props.onFilterChange ? (
                                <Filter
                                    filterQuery={this.props.filterQuery}
                                    onChange={this.props.onFilterChange}
                                    onClear={this.props.onFilterClear}
                                />
                            ) : null}
                        </div>
                        <div
                            className={classNames(
                                styles.headerItem,
                                styles.headerItemTitle
                            )}
                        >
                            {this.props.contentLabel}
                        </div>
                        <div
                            className={classNames(
                                styles.headerItem,
                                styles.headerItemClose
                            )}
                        >
                            <CloseButton
                                size={CloseButton.SIZE_LARGE}
                                onClick={this.props.onRequestClose}
                            />
                        </div>
                    </div>
                    {this.props.children}
                </Box>
            </ReactModal>
        );
    }
}

ModalComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    contentLabel: PropTypes.string.isRequired,
    filterQuery: PropTypes.string,
    onFilterChange: PropTypes.func,
    onFilterClear: PropTypes.func,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool.isRequired
};

module.exports = ModalComponent;
