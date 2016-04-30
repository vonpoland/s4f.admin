import React from 'react';
import { connect } from 'react-redux';
import {fetchAnswers, fetchPoll} from '../actions/actions';

const PollResults = React.createClass({
    render() {
        var votes = this.props.votes;
        var answers = this.props.answers;

        return <div>
            <h1>Wyniki {this.props.pollName}</h1>
            {votes.map(vote =>
                <div key={vote.option}>
                    <span>{vote.option}</span> - <span>{vote.value}</span>
                </div>
            )}
            <h2>Odpowiedzi {answers.length}</h2>
            <div className="container">
                <div style={{width: '100px' }}>Numer</div>
                <div style={{width: '500px' }}>Odpowiedź</div>
                <div style={{width: '150px' }}>Użytkownik</div>
                <div style={{width: '200px' }}>Email</div>
                <div style={{width: '50px' }}>Data</div>
            </div>
            {answers.map((answer, index) =>
                <div key={index}>
                    <div className="container" style={{ padding: '10px 0' }}>
                        <div style={{width: '100px' }}>{index + 1}</div>
                        <div style={{width: '500px', wordWrap: 'break-word'}}>
                            {answer.option.option} - {answer.option.answer}
                        </div>
                        <div style={{width: '150px' }}>{answer.user.firstName}  {answer.user.lastName}</div>
                        <div style={{width: '200px' }}>{answer.user.email}</div>
                        <div style={{width: '50px' }}>{answer.date}</div>

                    </div>
                </div>
            )}
        </div>;
    },
    componentDidMount() {
        this.props.fetchData(this.props.pollName);
    }
});

const mapStateToProps = (state) => {
    return {
        pollName: state.polls.pollName,
        votes: state.polls.votes || [],
        answers: state.polls.answers || []
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: pollName => {
            dispatch(fetchAnswers(pollName));
            dispatch(fetchPoll(pollName));
        }
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PollResults);