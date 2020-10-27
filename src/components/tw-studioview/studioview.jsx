import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import classNames from 'classnames';

import StudioView from './studioview';
import styles from './studioview.css';

class StudioViewComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSelect',
            'ref'
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
    ref (el) {
        this.el = el;
    }
    render () {
        return (
            <div
                className={classNames(
                    styles.wrapper,
                    {
                        [styles.disabled]: this.props.disabled
                    }
                )}
                ref={this.ref}
            />
        );
    }
}

StudioViewComponent.propTypes = {
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.bool,
    onSelect: PropTypes.func.isRequired
};

export default StudioViewComponent;
