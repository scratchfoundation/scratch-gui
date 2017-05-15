const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const FilterComponent = require('../components/filter/filter.jsx');

class Filter extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'handleBlur',
            'updateSearch'
        ]);
        this.state = {
            active: false,
            filterQuery: ''
        };
    }
    updateSearch(event) {
        this.setState({
            filterQuery: event.target.value
        })
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
                filterQuery={this.state.filterQuery}
                onClick={this.handleClick}
                onBlur={this.handleBlur}
                onChange={this.updateSearch}
            />
        );
    }
}

module.exports = Filter;
