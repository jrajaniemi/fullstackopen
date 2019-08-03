import React, { useState } from 'react';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Maija Rajaniemi', number: '040 123 1234' },
    { name: 'Antti Rajaniemi', number: '044 123 1234' },
    { name: 'Heikki Rajaniemi', number: '045 123 1234' },
    { name: 'Jani Rajaniemi', number: '046 123 1234' },
    { name: 'Juha Rajaniemi', number: '050 123 1234' },
    { name: 'Mika Rajaniemi', number: '051 123 1234' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const addName = event => {
    event.preventDefault();
    const res = persons.find(x => x.name === newName);
    console.log('Add Name: ', persons.indexOf(res), newName, persons);
    if (persons.indexOf(res) > -1) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const t = persons.concat({
        name: newName,
        number: newNumber
      });
      setPersons(t);
      setNewName('');
      setNewNumber('');
    }
  };

  const rows = () => {
    if (search === '') {
      return persons.map(person => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ));
    } else {
      const t = persons.filter(x => new RegExp(search, 'i').test(x.name));
      console.log(t);
      return t.map(person => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ));
    }
  };

  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearch = event => {
    console.log(event.target.value);
    event.preventDefault();
    setSearch(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Phonebook</h1>
          filter show with <input value={search} onChange={handleSearch} />
          <h2>add a new</h2>
          <form onSubmit={addName}>
            <div>
              Name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
              Number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Add
              </button>
            </div>
          </form>
          <h2>Numbers</h2>
          <ul>{rows()}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
