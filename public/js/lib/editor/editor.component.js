import React from 'react';
import { connect } from 'react-redux';
import {changePropertyAndSave} from '../poll/actions';

function getEditField(key, value) {
    if(typeof value === 'string') {
        return <input className="form-control" type="text" defaultValue={value} onChange={this.valueChange.bind(this, 'string', key)}/>;
    } else if(typeof value === 'boolean') {
        return <select className="form-control" defaultValue={value} onChange={this.valueChange.bind(this, 'boolean', key)}>
                <option value={true}>true</option>
                <option value={false}>false</option>
            </select>;
    } else if(typeof value === 'number') {
        return <input className="form-control" type="number" defaultValue={value} onChange={this.valueChange.bind(this, 'number', key)}/>;
    }
}

const Editor = React.createClass({
    getInitialState: function() {
        this._private = {};
        return {editor: {}};
    },
    valueChange(type, key, event) {
        this._private = {
            type: type,
            key : key,
            value : event.target.value
        };
    },
    saveButtonDisabled() {
        return this.props.isFormLocked;
    },
    updatePoll(index) {
        this.props.updatePoll(this._private, this.props.arrayIndex, this.props.pollData)
        .then(() => this.editItem(index, false));
    },
    getEditor(optionKey, index) {
        if(!this.state.editor[index]) {
            return <div className="cursor-pointer" onClick={() => this.editItem(index, true)}>
                <span className="margin-horizontal--medium">{this.props.data[optionKey].toString()}</span>
                <i className="display--none fa fa-pencil-square-o editor__edit-item"></i>
            </div>;
        }

        return <div className="flex flex-row">
            <div className="margin-horizontal--medium">{getEditField.call(this, optionKey, this.props.data[optionKey])}</div>
            <button disabled={this.saveButtonDisabled(index)} className="btn btn-primary margin-horizontal--small cursor-pointer" onClick={() => this.updatePoll(index)}><i className="fa fa-floppy-o"></i>Save</button>
            <button className="btn btn-danger cursor-pointer" onClick={() => this.editItem(index, false)}><i className="fa fa-undo"></i>Cancel</button>
        </div>;
    },
    editItem(index, edit) {
        var editor = {};
        editor[index] = edit;
        this.setState({
            editor : editor
        });
    },
    render() {
        return <div className="list-group-item">
            <div>
                <div data-target={'#' + this.props.data.option} data-toggle="collapse">{this.props.data.name || (this.props.data.firstName + ' ' + this.props.data.lastName)}
                    <i className={'fa padding-horizontal--small ' + (this.props.data.enabled ? 'fa-check' : 'fa-close')} aria-hidden="true"></i>
                    <i className="fa fa-fw fa-caret-down"></i></div>
                <div id={this.props.data.option} className="collapse margin-vertical--big" aria-expanded="false">
                    {Object.keys(this.props.data).map((optionKey, index) =>
                        <div key={optionKey + index} className="form-group">
                            <label>{optionKey}</label>
                            <span>{this.state.data}</span>
                            {this.getEditor(optionKey, index)}
                        </div>)}
                </div>
            </div>
        </div>;
    }
});

const mapDispatchToProps = dispatch => {
    return {
        updatePoll: (data, index, pollData) => {
            if (typeof data.value === 'undefined') {
                return;
            }
            var editedData = [...pollData.options];
            var value = data.value;

            if (data.type === 'boolean') {
                value = data.value === 'true';
            } else if (data.type === 'number') {
                value = parseInt(data.value);
            }

            editedData[index][data.key] = value;
            return dispatch(changePropertyAndSave({ data: editedData, restPath: 'data/options', propertyPath : 'data.options', moveToDashBoard: false}));
        }
    };
};

const mapStateToProps = state => {
    return {
        pollData: state.polls.poll.data,
        isFormLocked: state.polls.poll.isFormLocked
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);