const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://antoniremeseiro_db_user:${password}@cluster0.j1rvvzg.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

// Create a schema for the phonebook entries
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Create a model for the phonebook entries
const Person = mongoose.model("Person", personSchema);
