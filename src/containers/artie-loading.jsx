import React from 'react';
import ArtieLoadingComponent from '../components/artie-loading/artie-loading.jsx';
import {connect} from 'react-redux';

class ArtieLoading extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <ArtieLoadingComponent />
        );
    }
}


const mapStateToProps = state => ({});

export default connect(
    mapStateToProps
)(ArtieLoading);
