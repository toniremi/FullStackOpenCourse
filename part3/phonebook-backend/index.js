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

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// info endpoint
app.get("/info", (request, response) => {
  // get the number of persons in the phonebook
  Person.find({}).then((persons) => {
    // get the date that the request was made
    const date = new Date();
    // create a string with the number of persons and the date
    const info = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;
    // send the info string as the response
    response.send(info);
  });
});

// get all persons
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// get single person by id
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// delete person by id
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// create person entry
app.post("/api/persons", (request, response, next) => {
  // get the body of the request
  const body = request.body;

  // check if the name or number is missing
  if (!body.name || !body.number) {
    console.log("Name or number missing");
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  // create our person object with the data from the request body and a generated id
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  // save the person to the database
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

// update person
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }

      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

// Error handling middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

// set up server to listen on port 3001
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
