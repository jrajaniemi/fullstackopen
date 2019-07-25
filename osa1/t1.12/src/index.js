import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick} className="btn btn-primary m-2">
      {text}
    </button>
  );
};

const App = props => {
  const { anecdotes } = props;

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([]);
  const [mostVoted, setMostVoted] = useState(0);

  if (votes.length === 0) {
    setVotes({ ...Array(anecdotes.length).fill(0) });
  }

  const buttonHandler = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
    console.log(votes, selected);
  };

  const voteHandler = () => {
    let points = { ...votes };
    points[selected] = points[selected] + 1;
    setVotes(points);

    setSelected(Math.floor(Math.random() * anecdotes.length));

    let value = 0;
    for (let i = 0; i < Object.keys(votes).length; i++) {
      if (votes[i] > value) {
        setMostVoted(i);
        value = votes[i];
      }
    }
  };

  return (
    <div>
      <h1>Anecdote of day</h1>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button handleClick={voteHandler} text="Vote" />
      <Button handleClick={buttonHandler} text="Next anecdote" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVoted]}
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
