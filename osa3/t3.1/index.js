const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let persons = [
  {
    name: 'Jussi Rajaniemi',
    number: '040-1234356',
    id: 1
  },
  {
    name: 'Mirka Rajiemi',
    number: '041-1234356',
    id: 2
  },
  {
    name: 'Elmo Rajaniemi',
    number: '042-1234356',
    id: 3
  },
  {
    name: 'Eija Rajaniemi',
    number: '043-1234356',
    id: 4
  }
];

const generateId = () => {
  // const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0;
  // return maxId + 1;
  return Math.floor(Math.random() * 1000000000000000);
};

// root
app.get('/', (req, res) => {
  res.send('<h1>Node.js phonebook!</h1>');
});

app.get('/info', (req, res) => {
  const qty = persons.length;
  res.send(
    '<p>Phonebook has info for ' + qty + ' people</p><p>' + new Date() + '</p>'
  );
});

// Get all persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// Get person by id
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(n => n.id === id);
  // console.log(person);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// Delete person by id
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

// Add new person
app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Person name or number missing' });
  }

  // if(person.find(p => p.name ))
  const p = persons.filter(p => new RegExp(body.name, 'i').test(p.name));
  if (p.length > 0) {
    return res.status(400).json({ error: 'Person is available' });
  }
  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId()
  };
  persons = persons.concat(newPerson);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
