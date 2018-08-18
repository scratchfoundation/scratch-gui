import React from 'react';
import PropTypes from 'prop-types';

import bindAll from 'lodash.bindall';

class SortableAsset extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'setRef'
        ]);
    }
    componentDidMount () {
        this.props.onAddSortable(this.ref);
    }
    componentWillUnmount () {
        this.props.onRemoveSortable(this.ref);
    }
    setRef (ref) {
        this.ref = ref;
    }
    render () {
        return (
            <div
                className={this.props.className}
                ref={this.setRef}
                style={{
                    order: this.props.index
                }}
            >
                {this.props.children}
            </div>
        );
    }
}

SortableAsset.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    index: PropTypes.number.isRequired,
    onAddSortable: PropTypes.func.isRequired,
    onRemoveSortable: PropTypes.func.isRequired
};

export default SortableAsset;
