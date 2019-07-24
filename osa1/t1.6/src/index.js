import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

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
      <div class="row">
        <div class="col-md-4">Good</div>
        <div class="col-md-4">{good}</div>
      </div>
      <div class="row">
        <div class="col-md-4">Netral</div>
        <div class="col-md-4">{neutral}</div>
      </div>
      <div class="row">
        <div class="col-md-4">Bad</div>
        <div class="col-md-4">{bad}</div>
      </div>
      <div class="row">
        <div class="col-md-4">All</div>
        <div class="col-md-4">{good + neutral + bad}</div>
      </div>
      <div class="row">
        <div class="col-md-4">Average</div>
        <div class="col-md-4">{(good + bad * -1) / (good + neutral + bad)}</div>
      </div>
      <div class="row">
        <div class="col-md-4">Positive</div>
        <div class="col-md-4">{(good * 100) / (good + neutral + bad)}</div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
