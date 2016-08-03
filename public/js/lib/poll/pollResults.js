import React from 'react';
import {connect} from 'react-redux';
import {fetchAnswers, fetchPoll, pollResultsNameChange, saveResultsNameAsync, changePollResults, pollResultClearStartAsync} from './actions';
import {PieChart} from '../charts/barChart.component';
import moment from 'moment';
import classNames from 'classnames';

const PollResults = React.createClass({
    getUserAnswers () {
        var answers = this.props.answers;
        var displayAnswers = answers.length > 0;

        return displayAnswers ? <div>
            <h2>Answers {answers.length}</h2>
            <div className="flex">
                <div style={{width: '100px'}}>Numer</div>
                <div style={{width: '500px'}}>Odpowiedź</div>
                <div style={{width: '150px'}}>Użytkownik</div>
                <div style={{width: '200px'}}>Email</div>
                <div style={{width: '50px'}}>Data</div>
            </div>
            {answers.map((answer, index) =>
                <div key={index}>
                    <div className="flex" style={{padding: '10px 0'}}>
                        <div style={{width: '100px'}}>{index + 1}</div>
                        <div style={{width: '500px', wordWrap: 'break-word'}}>
                            {answer.option.option} - {answer.option.answer}
                        </div>
                        <div style={{width: '150px'}}>{answer.user.firstName} {answer.user.lastName}</div>
                        <div style={{width: '200px', wordWrap: 'break-word'}}>{answer.user.email}</div>
                        <div style={{width: '50px'}}>{answer.date}</div>
                    </div>
                </div>
            )}
        </div> : <div></div>;
    },
    getPreviousVotes () {
        var votes = this.props.previousVotes || [];
        votes.map(vote => {
                if(vote.date) {
                    vote.date = moment(vote.date).format('LLLL')
                }
                return vote;
            });
        var buttonRevertClass = classNames('btn btn-link pull-right', { 'hide': !this.props.enableRevertResultsButton});

        return <div className="col-sm-4 col--primary">
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3 className="panel-title">Show previous results <button type="button" className={buttonRevertClass} onClick={() => this.props.changeResults()}>Show current values</button></h3>
                </div>
                <div className="panel-body">
                    {votes.map((vote, index) =>
                        <div key={index} className="flex">
                            <div className="col-lg-4"><button type="button" onClick={() => this.props.changeResults(vote.name)} className="btn btn-link">{vote.name}</button></div>
                            <div className="col-lg-8"><span style={{lineHeight: '34px'}}>{vote.date}</span></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    },
    saveResults() {
        return <div className="col-lg-4 col--primary">
            <div className="panel panel-green">
                <div className="panel-heading">
                    <h3 className="panel-title">Save or clear results</h3>
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <label htmlFor="saveAs">Name</label>
                        <input className="form-control" id="saveAs" type='text'
                               value={this.props.resultsName}
                               disabled={this.props.disableSaveResultsInput}
                               onChange={event => this.props.onResultNameChange(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={!this.props.enabledSaveResultsButton}
                                onClick={() => this.props.saveResultName()}>Save
                        </button>
                        <button className="btn btn-danger pull-right" disabled={this.props.disableClearResultsButton} data-toggle="modal" data-target="#clearResultsVote">
                            Clear interaction votes
                        </button>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="clearResultsVote" tabindex="-1" role="dialog" aria-labelledby="clearResultsVote">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Confirmation</h4>
                        </div>
                        <div className="modal-body">
                            Please confirm if you want to clear results of this interaction.
                            If you didn't save them before you will loose your results.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" disabled={this.props.disableCloseClearResultsModalButton}>Close</button>
                            <button type="button" className="btn btn-primary" disabled={this.props.disableCloseClearResultsModalButton} onClick={() => this.props.clearInteractionResult()}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    },
    render() {
        return <div>
            <h1>Results {this.props.pollName}</h1>
            <div className='panel panel-default'>
                <div className='panel-body'>
                    <div className="panel panel-green">
                        <div className="panel-heading">
                            <h3 className="panel-title">Result chart</h3>
                        </div>
                        <div className="panel-body">
                            <PieChart data={this.props.votes}></PieChart>
                            {this.saveResults()}
                            {this.getPreviousVotes()}
                        </div>
                    </div>
                    {this.getUserAnswers()}
                </div>
            </div>
        </div>;
    },
    componentDidMount() {
        this.props.fetchData();
    }
});

function closeDialog(id) {
    $(id).modal('hide')
}

const mapStateToProps = state => {
    return {
        resultsName: state.polls.poll.resultsName || '',
        pollName: state.polls.poll.name,
        previousVotes: state.polls.poll.data ? state.polls.poll.data.oldResults : [],
        enabledSaveResultsButton: state.polls.poll.isSaveResultsNameButtonEnabled,
        disableSaveResultsInput: state.polls.poll.isSaveResultsNameInputDisabled,
        disableClearResultsButton: state.polls.poll.isClearResultsButtonDisabled,
        enableRevertResultsButton: state.polls.poll.enableRevertResultsButton,
        disableCloseClearResultsModalButton: state.polls.poll.disableCloseClearResultsModalButton,
        votes: state.polls.poll.votes || [],
        answers: state.polls.answers || []
    };
};

const mapDispatchToProps = (dispatch, state) => {
    return {
        clearInteractionResult: () => dispatch(pollResultClearStartAsync()).then(() => closeDialog('#clearResultsVote')),
        onResultNameChange: text => dispatch(pollResultsNameChange(text)),
        saveResultName: text => dispatch(saveResultsNameAsync()),
        changeResults: resultsName => dispatch(changePollResults(resultsName)),
        fetchData: () => {
            dispatch(fetchAnswers(state.routeParams.id));
            dispatch(fetchPoll(state.routeParams.id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PollResults);