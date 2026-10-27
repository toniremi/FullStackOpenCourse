import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/";

const apiKey = import.meta.env.VITE_OPEN_WEATHER_KEY;

const getCapitalWeather = (capital, countryCode) => {
  const request = axios.get(
    baseUrl +
      "weather?q=" +
      capital +
      "," +
      countryCode +
      "&appid=" +
      apiKey +
      "&units=metric",
  );
  return request.then((response) => response.data);
};

export default { getCapitalWeather };
