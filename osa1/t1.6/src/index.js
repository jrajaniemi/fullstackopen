import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Statistics = props => {
  const { value, text } = props;
  console.log(value, text);
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = props => (
  <button className="btn btn-primary m-1 col-3" onClick={props.handleClick}>
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

  if (good > 0 || neutral > 0 || bad > 0) {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <Button handleClick={handleGood} text="Good" />
            <Button handleClick={handleNeutral} text="Netral" />
            <Button handleClick={handleBad} text="Bad" />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table>
              <tbody>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <Button handleClick={handleGood} text="Good" />
            <Button handleClick={handleNeutral} text="Netral" />
            <Button handleClick={handleBad} text="Bad" />
          </div>
        </div>
        <div className="row">
          <div className="col-12">No feedback given</div>
        </div>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
