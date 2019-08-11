import React, { useState, useEffect } from 'react';
import personService from './services/persons';

const Filter = ({ search, handleSearch }) => {
  return (
    <p>
      filter show with <input value={search} onChange={handleSearch} />
    </p>
  );
};

const Results = ({ rows }) => {
  return <ul>{rows}</ul>;
};

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
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    personService
      .getAllPersons()
      .then(allPersons => {
        setPersons(allPersons);
      })
      .catch(err => {
        console.log('getAllPersons', err);
      });
  }, []);

  const addName = event => {
    event.preventDefault();
    const res = persons.find(x => x.name === newName);
    console.log('Add Name: ', persons.indexOf(res), newName, persons);
    if (persons.indexOf(res) > -1) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personService
        .addPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch(err => {
          console.log('addName ', err);
        });
    }
  };

  const rows = () => {
    if (search === '') {
      return persons.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDeleteNumber(person.id, person.name)}>
            delete
          </button>
        </li>
      ));
    } else {
      const t = persons.filter(x => new RegExp(search, 'i').test(x.name));
      console.log(t);
      return t.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleDeleteNumber(person.id, person.name)}
          >
            delete
          </button>
        </li>
      ));
    }
  };

  const handleNameChange = event => {
    event.preventDefault();
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    event.preventDefault();
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const handleDeleteNumber = (id, name) => {
    console.log(id);
    if (window.confirm('Delete ' + name + '?')) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          console.log('person ', id, ' deleted');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Phonebook</h1>
          <Filter search={search} handleSearch={handleSearch} />
          <h2>add a new</h2>
          <Form
            addName={addName}
            newName={newName}
            handleNameChange={handleNameChange}
            newNumber={newNumber}
            handleNumberChange={handleNumberChange}
          />
          <h2>Numbers</h2>
          <Results rows={rows()} />
        </div>
      </div>
    </div>
  );
}

export default App;
