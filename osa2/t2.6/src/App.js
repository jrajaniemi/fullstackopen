import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Filter from './components/Filter';
import Results from './components/Results';
import Alert from './components/Alerts';
import personService from './services/persons';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

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
    if (persons.indexOf(res) > -1) {
      if (
        window.confirm(
          newName +
            ' is already added to phonebook, replace the old number with a new one?'
        )
      ) {
        personService
          .updatePerson(res.id, { name: newName, number: newNumber })
          .then(res => {
            setPersons(persons.map(p => (p.id !== res.id ? p : res)));
            setNewName('');
            setNewNumber('');
            setMessage('Updated ' + newName);
            setMessageType('success');
            setTimeout(() => {
              setMessage('');
            }, 5000);
          })
          .catch(err => {
            console.log('updatePerson ', err);
          });
      }
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
          setMessage('Added ' + newName);
          setMessageType('success');
          setTimeout(() => {
            setMessage('');
          }, 5000);
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
          <button
            className="btn btn-primary btn-sm m-1"
            onClick={() => handleDeleteNumber(person.id, person.name)}
          >
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
            className="btn btn-primary btn-sm m-1"
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
          setMessage(name + ' removed');
          setMessageType('success');
          setTimeout(() => {
            setMessage('');
          }, 5000);
        })
        .catch(err => {
          console.log('deletePerson ', err);
        });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Alert message={message} messageType={messageType} />
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
