import React from 'react';
import { connect } from 'react-redux';
import {fetchPoll, propertyChange, savePoll} from './actions';
import Editor from '../editor/editor.component';

const EditPoll = React.createClass({
    pollDataEditor(pollData) {
        if (!pollData || !pollData.options) {
            return '';
        }

        return <div className="panel panel-primary">
            <div className="panel-heading" data-target="#editorDataPanel" data-toggle="collapse">Poll data <i
                className="fa fa-fw fa-caret-down"></i></div>
            <div className="panel-body collapse" id="editorDataPanel" aria-expanded="false">
                <div>
                    {pollData.options.map((pollOption, index) => <Editor key={index} arrayIndex={index}
                                                                         data={pollOption}/>)}
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
        return <div>
            <div className="form-group">
                <label htmlFor="datetimepicker1">Start</label>
                <div className='input-group date' id='datetimepicker1'>
                    <input type='text' className="form-control"/>
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-calendar"></span>
                        </span>
                </div>
            </div>
        </div>;
    },
    getPollFinishDateField() {
        return <div>
            <div className="form-group">
                <label htmlFor="datetimepicker2">Finish</label>
                <div className='input-group date' id='datetimepicker2'>
                    <input type='text' className="form-control"/>
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-calendar"></span>
                        </span>
                </div>
            </div>
        </div>;
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
                {this.getPollStartDateField()}
                {this.getPollFinishDateField()}
                {this.pollDataEditor(this.props.pollData)}
                {this.saveButton()}
            </div>
        </div>;
    },
    componentDidUpdate(prevProps) {
        $('#datetimepicker1').datetimepicker({
            defaultDate: this.props.startDate
        }).on('dp.change', event => this.props.onDateChange('startDate', event.date));

        $('#datetimepicker2').datetimepicker({
            defaultDate: this.props.finishDate
        }).on('dp.change', event => this.props.onDateChange('finishDate', event.date));
    },
    componentWillUnmount() {
        var datePicker = $('#datetimepicker1').data('DateTimePicker');

        if (!datePicker) {
            return;
        }

        datePicker.destroy();
    },
    componentDidMount() {
        this.props.fetchPoll();
    }
});

const mapStateToProps = state => {
    return {
        pollName: state.polls.poll.name || '',
        pollData: state.polls.poll.data,
        startDate: state.polls.poll.startDate,
        finishDate: state.polls.poll.finishDate,
        isSaveButtonDisplayed: Object.keys(state.polls.poll.modifications).length > 0,
        isFormLocked: state.polls.poll.isFormLocked,
        displaySuccessMessage: state.polls.poll.successMessage
    };
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        fetchPoll: () => dispatch(fetchPoll(state.routeParams.id)),
        onDateChange: (property, newValue) => dispatch(propertyChange(property, newValue)),
        savePoll: () => dispatch(savePoll())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPoll);