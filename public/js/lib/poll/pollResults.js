import React from 'react';
import { connect } from 'react-redux';
import {fetchAnswers, fetchPoll} from './actions';
import {calculateVotes} from './poll.service';
import {PieChart} from '../charts/barChart.component';

const PollResults = React.createClass({
    render() {
        var answers = this.props.answers;

        return <div>
            <h1>Results {this.props.pollName}</h1>
            <PieChart data={this.props.votes}></PieChart>
            <h2>Answers {answers.length}</h2>
            <div className="flex">
                <div style={{width: '100px' }}>Numer</div>
                <div style={{width: '500px' }}>Odpowiedź</div>
                <div style={{width: '150px' }}>Użytkownik</div>
                <div style={{width: '200px' }}>Email</div>
                <div style={{width: '50px' }}>Data</div>
            </div>
            {answers.map((answer, index) =>
                <div key={index}>
                    <div className="flex" style={{ padding: '10px 0' }}>
                        <div style={{width: '100px' }}>{index + 1}</div>
                        <div style={{width: '500px', wordWrap: 'break-word'}}>
                            {answer.option.option} - {answer.option.answer}
                        </div>
                        <div style={{width: '150px' }}>{answer.user.firstName}  {answer.user.lastName}</div>
                        <div style={{width: '200px', wordWrap: 'break-word' }}>{answer.user.email}</div>
                        <div style={{width: '50px' }}>{answer.date}</div>
                    </div>
                </div>
            )}
        </div>;
    },
    componentDidMount() {
        this.props.fetchData();
    }
});

const mapStateToProps = state => {
    return {
        pollName: state.polls.poll.name,
        votes: calculateVotes(state.polls.poll) || [],
        answers: state.polls.answers || []
    };
};

const mapDispatchToProps = (dispatch, state) => {
    return {
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