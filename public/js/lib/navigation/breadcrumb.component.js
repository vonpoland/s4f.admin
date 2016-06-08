import React from 'react';
import {connect} from 'react-redux';

const Breadcrumb = React.createClass({
    render() {
        return <ol className="breadcrumb">
            <li className="active">
                <i className="fa fa-dashboard"></i> {this.props.data.breadcrumb}
            </li>
        </ol>;
    }
});

export default connect(
    state => ({data: state.navigation.pageInfo || {}})
)(Breadcrumb);