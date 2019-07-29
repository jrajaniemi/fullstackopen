import React, {useState} from 'react';

function App() {
  const [persons, setPersons] = useState([{name: 'Jussi Rajaniemi'}])
  const [newName, setNewName] = useState('')

  const addName = event => {
    event.preventDefault();
    console.log(event)
    const t = persons.concat({
      name: newName
    })
    setPersons(t);
    setNewName('');
  }
  
  const handleNameChange = event => {
    console.log(event.target.value)

    setNewName(event.target.value)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
        <h2>Phonebook</h2>
        <form onSubmit={addName}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            <button className="btn btn-primary" type="submit">Add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>{ persons.map(person => <li key={person.name}>{person.number} ({person.name})</li>)}</ul>
      </div>
      </div>
    </div>
  );
}

export default App;
