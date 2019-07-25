import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  console.log(parts);
  const items = parts.map(item => (
    <Part key={item.id} part={item.name} exercises={item.exercises} />
  ));
  return <div>{items}</div>;
};

export default Content;
