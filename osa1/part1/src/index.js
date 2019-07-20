import React from 'react';
import ReactDOM from 'react-dom';

const Hello = props => {
  let age = 0;
  if (props.age == null) {
    age = 'unknown';
  } else {
    age = props.age;
  }
  return (
    <div>
      <p>
        Hello {props.name}, you are {age} years old
      </p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Matti!" age="25" />
      <Hello name="Maija!" age={12 + 10} />
      <Hello name="You!" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
