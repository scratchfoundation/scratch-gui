import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {setRestore} from '../reducers/restore-deletion';

/**
 * DeletionRestorer component passes a restoreDeletion function to its child.
 * It expects this child to be a function with the signature
 *     function (restoreDeletion, props) {}
 * The component can then be used to attach deletion restoring functionality
 * to any other component:
 *
 * <DeletionRestorer>{(restoreDeletion, props) => (
 *     <MyCoolComponent
 *         onClick={restoreDeletion}
 *         {...props}
 *     />
 * )}</DeletionRestorer>
 */
class DeletionRestorer extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'restoreDeletion'
        ]);
    }
    restoreDeletion () {
        if (typeof this.props.restore === 'function') {
            this.props.restore();
            this.props.dispatchUpdateRestore({restoreFun: null, deletedItem: ''});
        }
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        props.restorable = typeof this.props.restore === 'function';
        props.deletedItem = this.props.deletedItem;
        return this.props.children(this.restoreDeletion, props);
    }
}

DeletionRestorer.propTypes = {
    children: PropTypes.func,
    deletedItem: PropTypes.string,
    dispatchUpdateRestore: PropTypes.func,
    restore: PropTypes.func
};

const mapStateToProps = state => ({
    deletedItem: state.scratchGui.restoreDeletion.deletedItem,
    restore: state.scratchGui.restoreDeletion.restoreFun
});
const mapDispatchToProps = dispatch => ({
    dispatchUpdateRestore: updatedState => {
        dispatch(setRestore(updatedState));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeletionRestorer);
