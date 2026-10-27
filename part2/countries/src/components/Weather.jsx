import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const Weather = ({ capital, countryCode }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    console.log(`Fetching weather data for ${capital}, ${countryCode}`);
    weatherService
      .getCapitalWeather(capital, countryCode)
      .then((data) => {
        console.log("Weather data fetched:", data);
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [capital, countryCode]);

  return (
    <div>
      <h3>Weather in {capital}</h3>
      {weatherData ? (
        <div>
          <p>Temperature: {weatherData.main.temp} °C</p>
          {weatherData.weather && weatherData.weather.length > 0 && (
            <img
              src={`https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
            />
          )}
          <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
