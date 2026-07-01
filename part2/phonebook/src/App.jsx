import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  // submit event handler for the form, which creates a new person object and adds it to the persons array, then clears the input field
  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    console.log("newName", newName);
    console.log("persons", persons);

    // before adding the new person, check if the name already exists in the persons array
    if (persons.some((person) => person.name === newName)) {
      console.log(`${newName} is already added to phonebook`);
      // print an alert since this name is on the array already
      alert(`${newName} is already added to phonebook`);
      // return to stop execution of the function
      return;
    }

    const personObject = {
      name: newName,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
  };

  // create the event handler for the input field and set the value of newName to the value of the input field
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
