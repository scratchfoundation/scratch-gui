const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const FilterComponent = require('../components/filter/filter.jsx');

class Filter extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'handleBlur'
        ]);
        this.state = {
            active: false
        };
    }
    handleClick () {
        this.setState({active: true});
    }
    handleBlur () {
        this.setState({active: false});
    }
    render () {
        return (
            <FilterComponent
                active={this.state.active}
                onClick={this.handleClick}
                onBlur={this.handleBlur}
            />
        );
    }
}

module.exports = Filter;
