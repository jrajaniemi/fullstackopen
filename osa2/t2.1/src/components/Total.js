import React from 'react';

const Total = props => {
  let total = 0;
  props.total.forEach(i => {
    total = total + i.exercises;
  });
  return (
    <div>
      <p>
        <strong>Number of exercises {total}</strong>
      </p>
    </div>
  );
};

export default Total;
