import { useState, useEffect } from "react";
import "./Location.css";


const Location = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("Guntur");

  const apiKey =import.meta.env.VITE_API_KEY; 

  const fetchForecast = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === "200") {
      
        const dailyForecast = data.list.reduce((result, weather) => {
          const date = new Date(weather.dt_txt).toDateString();
          if (!result.find((item) => new Date(item.dt_txt).toDateString() === date)) {
            result.push(weather);
          }
          return result;
        }, []).slice(0, 5); 
        
        setForecast(dailyForecast);
        setError(null);
      } else {
        setError(data.message);
        setForecast([]);
      }
    } catch (err) {
      setError("Failed to fetch weather data",err);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, [location]);

  return (
    <div className="location-container">
      <h2>5-Day Weather Forecast</h2>
      <div className="search-container">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="location-input"
        />
        <button onClick={fetchForecast} className="search-button">
          Fetch Forecast
        </button>
      </div>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="forecast-list">
          {forecast.map((weather, index) => (
            <div key={index} className="forecast-item">
              <p className="forecast-date">
                {new Date(weather.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather icon"
                className="forecast-icon"
              />
              <p className="forecast-temp">
                {weather.main.temp.toFixed(1)}°C
              </p>
              <p className="forecast-description">
                {weather.weather[0].description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Location;
