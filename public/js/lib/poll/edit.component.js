import React from 'react';
import { connect } from 'react-redux';
import {fetchPoll, propertyChange, savePoll} from './actions';
import Editor from '../editor/editor.component';
import ReactToggle from 'react-toggle';

var showAdvancedControls = false;

const EditPoll = React.createClass({
    setNowDate(selector) {
        $(selector).data('DateTimePicker').date(moment());
    },
    setMaxDate(selector) {
        // If this code is live in 2050 call me :) I'll give you 1000 EUR :) Marcin Krawczyk.
        $(selector).data('DateTimePicker').date(moment('2050', 'YYYY'));
    },
    setMinDate(selector) {
        $(selector).data('DateTimePicker').date(moment('2000', 'YYYY'));
    },
    toggleStartDate(value) {
        var selector = '#datetimepicker1';
        value.target.checked ? this.setMinDate(selector) : this.setMaxDate(selector);
    },
    toggleFinishDate(value) {
        var selector = '#datetimepicker2';
        value.target.checked ? this.setMinDate(selector) : this.setMaxDate(selector);
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
                <label className="block" htmlFor="datetimepicker1">
                    Started
                    <ReactToggle onChange={this.toggleStartDate} checked={this.props.isStarted} className="pull-right simple-date"/>
                </label>
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

    getPositionComponent() {
        if(this.props.position === null) {
            return '';
        }

        var position = this.props.position || {};
        var left = position.left;
        var top = position.top;

        var topDiv = <div>
            <label htmlFor="marginTop">Margin - top</label>
            <div className='input-group' id='marginTop'>
                <div className="flex-row">
                    <input className="form-control" type='number' defaultValue={top} onChange={event => this.props.onFieldChange('editable.position.top', parseInt(event.target.value))}/>
                </div>
            </div>
        </div>;

        var leftDiv =  <div>
            <label htmlFor="marginLeft">Margin - left</label>
            <div className='input-group' id='marginLeft'>
                <div className="flex-row">
                    <input className="form-control" type='number' defaultValue={left} onChange={event => this.props.onFieldChange('editable.position.left', parseInt(event.target.value))}/>
                </div>
            </div>
        </div>;

        return <div className={ showAdvancedControls ? 'show' : 'hide' }>
            <div className="form-group">
                {topDiv}
                {leftDiv}
            </div>
        </div>;
    },

    getPollFinishDateField() {
        return <div>
            <div className="form-group">
                <label className="block" htmlFor="datetimepicker2">
                    Finished
                    <ReactToggle onChange={this.toggleFinishDate} checked={this.props.isFinished} className="pull-right simple-date"/>
                </label>
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
    toggleControls () {
        showAdvancedControls = !showAdvancedControls;

        this.forceUpdate();
    },
    render() {
        return <div className="component--editor">
            <div className='col-sm-12'>
                <div className="form-group">
                    <h2><label>Name</label> {this.props.pollName}
                        <div className="pull-right" onClick={this.toggleControls}>
                            <i className="fa fa-cog" aria-hidden="true"></i>
                        </div>
                    </h2>
                </div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='panel panel-default'>
                                <div className={ showAdvancedControls ? 'advanced-edit-controls panel-body' : 'panel-body'}>
                                    {this.getPollStartDateField()}
                                    {this.getPollFinishDateField()}
                                    {this.getPositionComponent()}
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
    componentDidUpdate() {
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
            datePickerStart.on('dp.change', event => {
                event.date.seconds(0);
                event.date.milliseconds(0);
                this.props.onFieldChange('editable.startDate', event.date)
            });
            datePickerFinish.on('dp.change', event => {
                event.date.seconds(0);
                event.date.milliseconds(0);
                this.props.onFieldChange('editable.finishDate', event.date)
            });
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
        isStarted: state.polls.poll.isStarted || false,
        isFinished: state.polls.poll.isFinished || false,
        position: state.polls.poll.name ? editable.position : null,
        isSaveButtonEnabled: Object.keys(state.polls.poll.modifications).length > 0,
        isFormLocked: state.polls.poll.isFormLocked
    };
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        fetchPoll: () => dispatch(fetchPoll(state.routeParams.id)),
        onFieldChange: (propertyPath, newValue) => dispatch(propertyChange({ propertyPath : propertyPath, data: newValue})),
        savePoll: () => dispatch(savePoll({ propertyPath : 'editable', restPath : 'editable'}))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPoll);