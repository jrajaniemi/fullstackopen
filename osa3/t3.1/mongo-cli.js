// Load mongoose library
const mongoose = require('mongoose');

// if process argent is less than 3 char length, stop process
if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

// read password from cli argument
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

console.log(name, typeof name, number, typeof number);

// mongodb -link with password
const url = `mongodb+srv://rajanjus:${password}@cluster0-ah1fb.mongodb.net/persons?retryWrites=true&w=majority`;

// connect to MongoDB Cloud
mongoose.connect(url, { useNewUrlParser: true });

// create MongoDB Schema
const noteSchema = new mongoose.Schema({
  name: String,
  number: String
});

// Build Note -object model from MongoDB Schema
const Person = mongoose.model('Person', noteSchema);

// Create new Note-object
const person = new Person({
  name: name,
  number: number
});

// Save object to Cloud
if (name != null && number != null) {
  person.save().then(response => {
    console.log('added ' + name + ' ' + number + ' to phonebook');
    // This close connection and program
    mongoose.connection.close();
  });
}
if (name == null) {
  console.log('Phonebook:');
  Person.find({}).then(res => {
    res.forEach(person => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}
