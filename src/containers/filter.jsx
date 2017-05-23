const bindAll = require('lodash.bindall');
const React = require('react');

const FilterComponent = require('../components/filter/filter.jsx');

class Filter extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOnChange'
        ]);
        this.state = {
            active: false,
            filterQuery: ''
        };
    }
    handleOnChange (event) {
        this.setState({
            filterQuery: event.target.value
        });

        if (event.target.value){
            this.setState({active: true});
        } else {
            this.setState({active: false});
        }
    }
    render () {
        return (
            <FilterComponent
                active={this.state.active}
                filterQuery={this.state.filterQuery}
                onChange={this.handleOnChange}
            />
        );
    }
}

module.exports = Filter;
