import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

    setPersons(persons.concat(personObject));
    // reset input field states to empty
    setNewName("");
    setNewNumber("");
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
