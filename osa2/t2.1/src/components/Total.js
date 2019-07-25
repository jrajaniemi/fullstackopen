import React from 'react';

const Total = ({ total }) => {
  const totalExercises = total.reduce((sum, current) => {
    return sum + current.exercises;
  }, 0);
  return (
    <div>
      <p>
        <strong>Number of exercises {totalExercises}</strong>
      </p>
    </div>
  );
};

export default Total;
