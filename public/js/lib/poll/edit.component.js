import React from 'react';
import { connect } from 'react-redux';
import {fetchPoll, propertyChange, savePoll} from './actions';
import Editor from '../editor/editor.component';

const EditPoll = React.createClass({
    setNowDate(selector) {
        $(selector).data('DateTimePicker').date(moment());
    },
    pollDataEditor(pollData) {
        if (!pollData || !pollData.options) {
            return '';
        }

        return <div className="panel panel-primary">
            <div className="panel-heading" data-target="#editorDataPanel" data-toggle="collapse">Poll data <i className="fa fa-fw fa-caret-down"></i></div>
            <div className="panel-body collapse" id="editorDataPanel" aria-expanded="false">
                <div>
                    {pollData.options.map((pollOption, index) => <Editor key={index} arrayIndex={index}
                                                                         data={pollOption}/>)}
                </div>
            </div>
        </div>;
    },

    getPollStartDateField() {
        return <div>
            <div className="form-group">
                <label htmlFor="datetimepicker1">Start</label>
                <div className='input-group date' id='datetimepicker1'>
                    <div className="flex-row">
                        <input className="form-control" type='text'/>
                        <button className="btn btn-success" onClick={() => this.setNowDate('#datetimepicker1')}>Now</button>
                    </div>
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
                    <div className="flex-row">
                        <input className="form-control" type='text'/>
                        <button className="btn btn-success" onClick={() => this.setNowDate('#datetimepicker2')}>Now</button>
                    </div>
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
            </div>
        </div>;
    },
    saveButton() {
        return <button onClick={this.props.savePoll} disabled={!this.props.isSaveButtonEnabled  || this.props.isFormLocked} className="btn btn-primary">
                Save</button>;
    },
    render() {
        return <div className="component--editor">
            <div className='col-sm-12'>
                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" value={this.props.pollName} disabled/>
                </div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='panel panel-default'>
                                <div className='panel-body'>
                                    {this.getPollStartDateField()}
                                    {this.getPollFinishDateField()}
                                    {this.saveButton()}
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            {this.pollDataEditor(this.props.pollData)}
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    },
    componentDidUpdate(prevProps) {
        if(this.props.startDate) {
            $('#datetimepicker1')
                .data('DateTimePicker')
                .defaultDate(moment(this.props.startDate));
        }

        if(this.props.finishDate) {
            $('#datetimepicker2')
                .data('DateTimePicker')
                .defaultDate(moment(this.props.finishDate));
        }
    },
    componentWillUnmount() {
        $('#datetimepicker1').data('DateTimePicker').destroy();
        $('#datetimepicker2').data('DateTimePicker').destroy();
    },
    componentDidMount() {
        var datePickerStart = $('#datetimepicker1').datetimepicker();
        var datePickerFinish = $('#datetimepicker2').datetimepicker();
        this.props.fetchPoll()
        .then(() => {
            datePickerStart.on('dp.change', event => this.props.onDateChange('editable.startDate', event.date));
            datePickerFinish.on('dp.change', event => this.props.onDateChange('editable.finishDate', event.date));
        });
    }
});

const mapStateToProps = state => {
    var editable = state.polls.poll.editable || {};

    return {
        pollName: state.polls.poll.name || '',
        pollData: state.polls.poll.data,
        startDate: editable.startDate,
        finishDate: editable.finishDate,
        isSaveButtonEnabled: Object.keys(state.polls.poll.modifications).length > 0,
        isFormLocked: state.polls.poll.isFormLocked
    };
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        fetchPoll: () => dispatch(fetchPoll(state.routeParams.id)),
        onDateChange: (propertyPath, newValue) => dispatch(propertyChange({ propertyPath : propertyPath, data: newValue})),
        savePoll: () => dispatch(savePoll({ propertyPath : 'editable', restPath : 'editable'}))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPoll);