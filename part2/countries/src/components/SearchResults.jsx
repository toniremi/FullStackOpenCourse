const SearchResults = ({ filteredCountries }) => {
  // if there are more than 10 filtered countries, return a message to the user to specify another filter
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  // if there are between 1 and 10 countries return the list of countries
  if (filteredCountries.length >= 1 && filteredCountries.length <= 10) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>{country.name.common}</div>
        ))}
      </div>
    );
  }
};

export default SearchResults;
