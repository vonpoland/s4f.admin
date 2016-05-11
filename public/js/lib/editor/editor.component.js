import React from 'react';
import { connect } from 'react-redux';

const Editor = React.createClass({
    render() {
        return <div className="list-group-item">
            <div>
                <div data-target={'#' + this.props.data.option} data-toggle="collapse">{this.props.data.name}
                    <i className={'fa padding-horizontal--small ' + (this.props.data.enabled ? 'fa-check' : 'fa-close')} aria-hidden="true"></i>
                    <i className="fa fa-fw fa-caret-down"></i></div>
                <ul id={this.props.data.option} className="collapse" aria-expanded="false">
                    {Object.keys(this.props.data).map(optionKey =>
                        <div className="form-group"><label>{optionKey}</label><input className="form-control" type="text" value={this.props.data[optionKey]}/></div>)}
                </ul>
            </div>
        </div>;
    }
});

export default Editor;