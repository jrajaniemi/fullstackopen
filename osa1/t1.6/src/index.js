import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Statistics = props => {
  const { value, text } = props;

  return (
    <div class="row">
      <div class="col-md-4">{text}</div>
      <div class="col-md-4">{value}</div>
    </div>
  );
};

const Button = props => (
  <button class="btn btn-primary m-1 col-3" onClick={props.handleClick}>
    {props.text}
  </button>
);

const App = props => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div class="container mt-3">
      <div class="row">
        <div class="col-12">
          <Button handleClick={handleGood} text="Good" />
          <Button handleClick={handleNeutral} text="Netral" />
          <Button handleClick={handleBad} text="Bad" />
        </div>
      </div>
      <Statistics text="Good" value={good} />
      <Statistics text="Neutral" value={neutral} />
      <Statistics text="Bad" value={bad} />
      <Statistics text="All" value={good + neutral + bad} />
      <Statistics
        text="Average"
        value={(good + bad * -1) / (good + neutral + bad)}
      />
      <Statistics
        text="Positive"
        value={(good * 100) / (good + neutral + bad)}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
