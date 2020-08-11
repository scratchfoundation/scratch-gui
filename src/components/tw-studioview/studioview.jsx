import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import StudioView from './studioview';
import styles from './studioview.css';

class StudioViewComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelect'
        ]);
    }
    componentDidMount () {
        this.studioView = new StudioView(this.props.id);
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
    render () {
        return (
            <div
                className={styles.wrapper}
                ref={el => this.el = el}
            />
        );
    }
}

StudioViewComponent.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.bool,
    onSelect: PropTypes.func.isRequired
};

export default StudioViewComponent;
