import React from 'react';
import { connect } from 'react-redux';
import {fetchPoll, propertyChange, savePoll} from './actions';
import Editor from '../editor/editor.component';

const EditPoll = React.createClass({
    pollDataEditor(pollData) {
        if (!pollData) {
            return '';
        }

        return <div className="panel panel-primary">
            <div className="panel-heading" data-target="#editorDataPanel"  data-toggle="collapse">Poll data <i className="fa fa-fw fa-caret-down"></i></div>
            <div className="panel-body collapse" id="editorDataPanel" aria-expanded="false">
                <div className="list-group">
                {pollData.options.map(pollOption => <Editor key={pollOption.name} data={pollOption}/>)}
                 </div>
            </div>
        </div>;
    },
    saveSuccessNotification() {
        return this.props.displaySuccessMessage ? <div className="alert alert-success">
            <strong>Poll has been saved!</strong>
        </div> : '';
    },
    getPollStartDateField() {
        return this.props.displayPollStartDateField ? <div>
            <div className="form-group">
                <label htmlFor="datetimepicker1">Start</label>
                <div className='input-group date' id='datetimepicker1'>
                    <input type='text' className="form-control"/>
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-calendar"></span>
                        </span>
                </div>
            </div>
        </div> : '';
    },
    finishedCheckbox() {
        return this.props.pollName ? <div className="form-group">
            <label>Finished</label>
            <div>
                <input type="checkbox" defaultChecked={this.props.finished} onChange={this.props.onFinishedChange}/>
            </div>
        </div> : '';
    },
    saveButton() {
        return this.props.isSaveButtonDisplayed ?
            <button onClick={this.props.savePoll} disabled={this.props.isFormLocked} className="btn btn-primary">
                Save</button> : '';
    },
    render() {
        return <div>
            {this.saveSuccessNotification()}
            <div className='col-sm-6'>
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" value={this.props.pollName} disabled/>
                </div>
                {this.finishedCheckbox()}
                {this.getPollStartDateField()}
                {this.pollDataEditor(this.props.pollData)}
                {this.saveButton()}
            </div>
        </div>;
    },
    componentDidUpdate(prevProps) {
        if (this.props.displayPollStartDateField && !prevProps.displayPollStartDateField) {
            $('#datetimepicker1').datetimepicker({
                defaultDate: this.props.startDate
            }).on('dp.change', event => this.props.onDateChange(event.date));
        }
    },
    componentWillUnmount() {
        $('#datetimepicker1').data('DateTimePicker').destroy();
    },
    componentDidMount() {
        this.props.fetchPoll();
    }
});

const mapStateToProps = state => {
    var hasStartDate = typeof (state.polls.poll.startDate) !== 'undefined';

    return {
        pollName: state.polls.poll.name || '',
        displayPollStartDateField: hasStartDate,
        pollData: state.polls.poll.data,
        startDate: state.polls.poll.startDate,
        finished: state.polls.poll.finished,
        isSaveButtonDisplayed: Object.keys(state.polls.poll.modifications).length > 0,
        isFormLocked: state.polls.poll.isFormLocked,
        displaySuccessMessage: state.polls.poll.successMessage
    };
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        fetchPoll: () => dispatch(fetchPoll(state.routeParams.id)),
        onDateChange: newValue => dispatch(propertyChange('startDate', newValue)),
        onFinishedChange: event => dispatch(propertyChange('finished', event.target.checked)),
        savePoll: () => dispatch(savePoll())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPoll);