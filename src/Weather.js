import React, { useState } from "react";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";

import "./App.css";

export default function Search() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState({});
  let [loader, setLoader] = useState(false);

  function showWeather(response) {
    setLoader(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      weatherIcon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = `1ee4264117b73d2263eecd562f31ef5c`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function handleChange(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city" onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );

  if (loader) {
    return (
      <div className="results">
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {Math.round(weather.wind)}km/h</li>
          <li>
            <img src={weather.weatherIcon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="results">
        {form}
        <ProgressBar
          height="100"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#000"
          barColor="#51E5FF"
        />
      </div>
    );
  }
}