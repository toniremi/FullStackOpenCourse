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

// depending on the number of arguments, either fetch all persons or create a new person
// if only password is provided, fetch all persons
if (process.argv.length === 3) {
  // Fetch all persons
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // Create a new person
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("Invalid number of arguments");
  process.exit(1);
}
