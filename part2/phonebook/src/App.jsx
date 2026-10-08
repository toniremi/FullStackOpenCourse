import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

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

      // get the already existing person object from the persons array
      const existingPerson = persons.find((person) => person.name === newName);
      console.log("existingPerson", existingPerson);
      // if the phone number is different we will ask about updating the number
      if (existingPerson.number !== newNumber) {
        // ask the user if they want to update the number
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`,
          )
        ) {
          // create a new person object with the updated number
          const updatedPerson = { ...existingPerson, number: newNumber };
          console.log("updatedPerson", updatedPerson);
          // update the person on the server
          personsService
            .update(existingPerson.id, updatedPerson)
            .then((returnedPerson) => {
              console.log("returnedPerson", returnedPerson);
              // update the persons array with the updated person
              setPersons(
                persons.map((person) =>
                  person.id == existingPerson.id ? returnedPerson : person,
                ),
              );
              // reset input field states to empty
              setNewName("");
              setNewNumber("");
              // set the success message to show the user that the number was updated
              setNotification({
                message: `Updated ${returnedPerson.name}'s number`,
                type: "success",
              });
              // clear the success message after 5 seconds
              setTimeout(() => {
                setNotification({
                  message: null,
                  type: null,
                });
              }, 5000);
            })
            .catch((error) => {
              console.log("error", error);
              // set the error message to show the user that the number was already removed from the server
              setNotification({
                message: `Information of ${newName} has already been removed from server`,
                type: "error",
              });
              // clear the error message after 5 seconds
              setTimeout(() => {
                setNotification({
                  message: null,
                  type: null,
                });
              }, 5000);
            });
        }
      } else {
        // print an alert since this name is on the array already
        alert(`${newName} is already added to phonebook`);
        // return to stop execution of the function
        return;
      }
    } else {
      // set our new person object
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
        // set the success message to show the user that the number was added
        setNotification({
          message: `Added ${returnedPerson.name}`,
          type: "success",
        });
        // clear the success message after 5 seconds
        setTimeout(() => {
          setNotification({
            message: null,
            type: null,
          });
        }, 5000);
      });
    }
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

  const deletePersonWithId = (id) => {
    console.log("delete person with id", id);
    // find the person to delete
    const personToDelete = persons.find((person) => person.id === id);
    console.log("person to delete", personToDelete);

    // confirm the deletion with the user
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      console.log("deleting person ", personToDelete.name, " with id", id);
      personsService.remove(id).then((response) => {
        console.log("response from server", response);
        console.log("deleted person with id", id);
        // get the updated persons array without the deleted person
        const updatedPersons = persons.filter((person) => person.id !== id);
        // update the persons state to remove the deleted person
        setPersons(updatedPersons);
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
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
      <Persons
        persons={persons}
        filter={filter}
        deletePerson={deletePersonWithId}
      />
    </div>
  );
};

export default App;
