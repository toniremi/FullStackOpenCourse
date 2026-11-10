const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://antoniremeseiro_db_user:${password}@cluster0.j1rvvzg.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

/*
 * Fetch all notes
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});*/

// Create a new note
const note = new Note({
  content: "HTML is easy",
  important: true,
});

// Save the note to the database
note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});
