import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import Filter from "./components/Filter";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  // create a countries hook to fetch the data from the API and set the countries state
  const countriesHook = () => {
    console.log("effect");
    // use our countriesService to get all the countries from the API
    countriesService.getAll().then((initialCountries) => {
      console.log("countries getAll promise fulfilled");
      setCountries(initialCountries);
    });
  };

  // call the countries hook when the component is mounted, only once on startup
  useEffect(countriesHook, []);

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
    </div>
  );
}

export default App;
