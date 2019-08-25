// Load mongoose library
const mongoose = require('mongoose');

// if process argent is less than 3 char length, stop process
if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

// read password from cli argument
const password = process.argv[2];

// mongodb -link with password
const url = `mongodb+srv://rajanjus:${password}@cluster0-ah1fb.mongodb.net/note-app?retryWrites=true&w=majority`;

// connect to MongoDB Cloud
mongoose.connect(url, { useNewUrlParser: true });

// create MongoDB Schema
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

// Build Note -object model from MongoDB Schema
const Note = mongoose.model('Note', noteSchema);

// Create new Note-object
const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true
});

// Save object to Cloud
note.save().then(response => {
  console.log('note saved!');
  // This close connection and program
  mongoose.connection.close();
});

Note.find({}).then(res => {
  res.forEach(note => {
    console.log('Notes ', note);
  });
  mongoose.connection.close();
});
