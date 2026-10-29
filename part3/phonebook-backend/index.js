const express = require("express");
const app = express();

app.use(express.json());

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
  response.json(persons);
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
  console.log("Request body:", body);

  // check if the name or number is missing
  if (!body.name || !body.number) {
    console.log("Name or number missing");
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  // create our person object with the data from the request body and a generated id
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  // add the person to our persons array
  persons = persons.concat(person);

  // return the added person as the response
  response.json(person);
});

// set up server to listen on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
