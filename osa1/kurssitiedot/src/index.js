import React from 'react';
import ReactDOM from 'react-dom';

const Part = props => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Header = props => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = props => {
  const { parts } = props;
  const items = parts.map((item, index) => (
    <Part key={index} part={item.name} exercises={item.exercises} />
  ));
  return <div>{items}</div>;
};

const Total = props => {
  let total = 0;
  props.total.forEach(i => {
    total = total + i.exercises;
  });
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
