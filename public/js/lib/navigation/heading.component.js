import React from 'react';
import { connect } from 'react-redux';

const Heading = React.createClass({
    render() {
        var partial = this.props.data.displayPageInfo ? <div className="row">
            <div className="col-lg-12">
                <h1 className="page-header">
                    <span>{this.props.data.title} </span>
                    <small>{this.props.data.description}</small>
                </h1>
            </div>
        </div> : <div></div>;

        return partial;
    }
});

export default connect(
    state => ({data: state.navigation.pageInfo || {}})
)(Heading);