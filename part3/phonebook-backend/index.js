require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");
const app = express();

// Morgan custom token to log the request body for POST requests
morgan.token("body", (req) => {
  // only log the request body for POST requests
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

// Middleware
app.use(express.json());
app.use(
  // :method :url :status :res[content-length] - :response-time ms is equivalent of 'tiny' format
  // then we also attach our :body token to log the request body for POST requests
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
// Serve static files from the 'dist' directory
app.use(express.static("dist"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxRange = 1000000000;
  return String(Math.floor(Math.random() * maxRange));
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// info endpoint
app.get("/info", (request, response) => {
  // get the date that the request was made
  const date = new Date();
  // create a string with the number of persons and the date
  const info = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;
  // send the info string as the response
  response.send(info);
});

// get all persons
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// get single person by id
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// delete person by id
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

// create person entry
app.post("/api/persons", (request, response) => {
  // get the body of the request
  const body = request.body;

  // check if the name or number is missing
  if (!body.name || !body.number) {
    console.log("Name or number missing");
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  // check if the name already exists in the persons array
  /* For now ignore if name already exists
  const nameExists = persons.some((person) => person.name === body.name);
  // if name exists, return a 400 error with a message
  if (nameExists) {
    console.log("Name already exists");
    return response.status(400).json({
      error: "name must be unique",
    });
  }*/

  // create our person object with the data from the request body and a generated id
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  // save the person to the database
  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

// set up server to listen on port 3001
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
