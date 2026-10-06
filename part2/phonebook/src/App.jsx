import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  // create a persons hook to fetch the data from the server and set the persons state
  const personsHook = () => {
    console.log("effect");
    // use our personsService to get all the persons from the server and set the state
    personsService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  };

  // call the persons hook when the component is mounted
  useEffect(personsHook, []);
  console.log("render", persons.length, "persons");

  // submit event handler for the form, which creates a new person object and adds it to the persons array, then clears the input field
  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    console.log("newName", newName);
    console.log("newNumber", newNumber);
    console.log("persons", persons);

    // before adding the new person, check if the name already exists in the persons array
    if (persons.some((person) => person.name === newName)) {
      console.log(`${newName} is already added to phonebook`);
      // print an alert since this name is on the array already
      alert(`${newName} is already added to phonebook`);
      // return to stop execution of the function
      return;
    }

    // set our person object
    const personObject = {
      name: newName,
      number: newNumber,
    };

    // add the new person to the server
    personsService.create(personObject).then((returnedPerson) => {
      // add the person to our persons array and set the state to the new array
      setPersons(persons.concat(returnedPerson));
      // reset input field states to empty
      setNewName("");
      setNewNumber("");
    });
  };

  // create the event handler for the input field and set the value of newName to the value of the input field
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  // create the event handler for the input field and set the value of newNumber to the value of the input field
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new person</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
