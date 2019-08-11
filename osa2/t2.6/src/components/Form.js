import React from 'react';

const Form = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button className="btn btn-primary m-1" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
