import Person from "./Person";

const Persons = ({ persons, filter, deletePerson }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()),
        )
        .map((person) => (
          <Person
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
        ))}
    </div>
  );
};

export default Persons;
