import React, { useState } from "react";
import axios from "axios";
import "./SearchEngine.css";

export default function SearchEngine() {
  let [city, setCity] = useState("");
  let [message, setMessage] = useState("");
  let [temperature, setTemperature] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "1a8e14dead82d28c527cf46b1e514682";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(showTemperature);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function showTemperature(response) {
    let Temperature = Math.round(response.data.main.temp);
    let Humidity = response.data.main.humidity;
    let Wind = response.data.wind.speed;
    let Description = response.data.weather[0].description;
    let Icon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    setTemperature(response.data.main.temp);

    if (temperature) {
      return setMessage(
        <ul>
          <li>
            City: <strong>{city}</strong>
          </li>
          <li>
            Temperature: <strong>{Temperature}°C</strong>
          </li>
          <li>
            Humidity: <strong>{Humidity} %</strong>
          </li>
          <li>
            Wind: <strong>{Wind} Km/h</strong>
          </li>
          <li>
            Description: <strong>{Description}</strong>
          </li>
          <li>
            <img src={Icon} alt="weather-icon" width="80" height="80"></img>
          </li>
        </ul>
      );
    } else {
      return <p>Weather info loading...</p>;
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          id="input"
          placeholder="Type a city"
          onChange={updateCity}
        />
        <input type="submit" value="Search" id="send" />
      </form>
      <div>{message}</div>
      <footer>
        ✌️ This project was coded by Nadia Simbi and it is{" "}
        <a href="https://github.com/Nadia-si/weather-react" target="blank">
          open sourced code
        </a>
      </footer>
    </div>
  );
}
