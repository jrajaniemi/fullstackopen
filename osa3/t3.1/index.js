const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let names = [
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

// root
app.get('/', (req, res) => {
  res.send('<h1>Node.js phonebook!</h1>');
});

app.get('/info', (req, res) => {
  const qty = names.length;
  res.send(
    '<p>Phonebook has info for ' + qty + ' people</p><p>' + new Date() + '</p>'
  );
});

// Get all names
app.get('/api/persons', (req, res) => {
  res.json(names);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
