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
            selected: false
        };
    }
    handleClick (e) {
        this.state.selected = true;
        console.log(this.state.selected);
        // add class here, to show X icon
    }
    handleBlur () {
        this.state.selected = false;
        console.log(this.state.selected);
        // remove class
    }
    render () {
        return (
            <FilterComponent
                placeholderText="hello"
                onClick={this.handleClick}
                onBlur={this.handleBlur}
            />
        );
    }
}

module.exports = Filter;
