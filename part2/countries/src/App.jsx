import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import Filter from "./components/Filter";
import SearchResults from "./components/SearchResults";
import Country from "./components/Country";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

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
    // reset the selected country when the filter changes
    setSelectedCountry(null);
  };

  // create our filtered countries array by filtering the countries array based on the filter state
  const filteredCountries =
    filter === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase()),
        );

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  // set here the selected country to show, if there is a selected country, use that,
  // otherwise if there is only one filtered country, use that, otherwise null
  const selectedCountryToShow =
    selectedCountry ||
    (filteredCountries.length === 1 ? filteredCountries[0] : null);

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {filteredCountries.length > 1 && (
        <SearchResults
          filteredCountries={filteredCountries}
          showCountry={handleShowCountry}
        />
      )}
      {filteredCountries.length === 0 && filter !== "" && (
        <p>No countries found</p>
      )}
      {selectedCountryToShow && <Country country={selectedCountryToShow} />}
    </div>
  );
}

export default App;
