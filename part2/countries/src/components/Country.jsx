import Weather from "./Weather";
import LanguagesList from "./LanguagesList";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        Capital:{" "}
        {country.capital?.length > 0 ? country.capital.join(", ") : "None"}
      </p>
      <p>Population: {country.population}</p>
      <LanguagesList languages={country.languages} />
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <Weather capital={country.capital} countryCode={country.cca2} />
    </div>
  );
};

export default Country;
