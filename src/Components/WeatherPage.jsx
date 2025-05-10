import { useState, useEffect } from "react";
import "./WeatherPage.css";
import Location from "./Location";
import "./Location.css";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [customAlerts, setCustomAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("metric");
  const [airPollution, setAirPollution] = useState(null);
  const [celcuis, setCelcius] = useState(true);

  const weatherApiKey = import.meta.env.VITE_W_API_KEY;
  const airPollutionApiKey = import.meta.env.VITE_P_API_KEY;

  const fetchWeather = async (latitude, longitude) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=${unit}`;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch weather data");

      setWeather(data);
      fetchAirPollution(latitude, longitude, data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setAirPollution(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!location) return setError("Please enter a location");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}&units=${unit}`;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch weather data");

      setWeather(data);
      fetchAirPollution(data.coord.lat, data.coord.lon, data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setAirPollution(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchAirPollution = async (latitude, longitude, weatherData) => {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${airPollutionApiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAirPollution(data);
      generateAlerts(weatherData, data);
    } catch (err) {
      setError("Failed to fetch air pollution data", err);
    }
  };

  const generateAlerts = (weatherData, pollutionData) => {
    let alerts = [];
    const temp = weatherData.main?.temp;
    const weatherConditions = weatherData.weather?.[0]?.main;
    const visibility = weatherData.visibility / 1000;
    const windSpeed = weatherData.wind?.speed;

    if (temp < 0)
      alerts.push({
        event: "Freezing Temperature",
        severity: "high",
        description: "Roads may be icy. Drive with caution!",
      });

    if (weatherConditions === "Rain")
      alerts.push({
        event: "Rainy Weather",
        severity: "medium",
        description: "Wet roads can be slippery.",
      });

    if (weatherConditions === "Snow")
      alerts.push({
        event: "Snowfall Alert",
        severity: "high",
        description: "Heavy snow may cause roadblocks.",
      });

    if (visibility < 1)
      alerts.push({
        event: "Low Visibility",
        severity: "medium",
        description: "Foggy conditions, drive slowly.",
      });

    if (windSpeed > 20)
      alerts.push({
        event: "Strong Winds",
        severity: "medium",
        description: "High winds may affect driving stability.",
      });

    if (pollutionData?.list?.length > 0) {
      const airQualityIndex = pollutionData.list[0].main.aqi;
      const airQualityDescriptions = [
        "Good Air Quality",
        "Fair Air Quality",
        "Moderate Air Quality",
        "Poor Air Quality",
        "Very Poor Air Quality",
      ];

      const airSeverity = ["low", "low", "medium", "high", "high"];
      const airDescription = [
        "Air quality is good. No health concerns.",
        "Air quality is fair, but no major concerns.",
        "Air quality is moderate. People with respiratory issues should be cautious.",
        "Air quality is poor. Avoid outdoor activities if possible.",
        "Air quality is very poor. Avoid outdoor activities and wear masks.",
      ];

      alerts.push({
        event: airQualityDescriptions[airQualityIndex - 1],
        severity: airSeverity[airQualityIndex - 1],
        description: airDescription[airQualityIndex - 1],
      });
    }

    setCustomAlerts(alerts);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => setError("Geolocation is not enabled")
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  const handleUnitToggle = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  useEffect(() => {
    getLocation();
  }, [unit]);

  return (
    <div className="weather-page">
      <h2>Cloud Clover</h2>

      <div className="search-container">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, State, ZIP code..."
          className="location-input"
        />
        <button onClick={fetchWeatherByLocation} className="search-button">
          <>
            {" "}
            <CiSearch size={20} />
          </>
        </button>

        <div className="toggle-container">
          <label className="toggle-label">
            {/* <input type="checkbox" onChange={handleUnitToggle} />
            {unit === "metric" ? "°C/kph" : "°F/mph"} */}
            <div
              onClick={() => {
                setCelcius(!celcuis);
                setUnit(() => setUnit(celcuis ? "metric" : "imperial"));
              }}
            >
              {celcuis ? (
                <>
                  <BsToggleOn size={30} color="blue" fill="" />{" "}
                </>
              ) : (
                <>
                  <BsToggleOff size={30} />
                </>
              )}
            </div>
            {/* <button onClick={()=>{
              setCelcius(!celcuis)
               setUnit(()=>setUnit(celcuis?"metric":"imperial"))
              }}>
              {celcuis ?"Celcius":"farenheat"}
            </button> */}
          </label>
        </div>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : weather ? (
        <div className="weather-info">
          <p className="city">
            {weather.name}, {weather.sys?.country}
          </p>
          <p className="temperature">
            {weather.main?.temp}
            {unit === "metric" ? "°C" : "°F"}
          </p>
          <p className="description">{weather.weather?.[0]?.description}</p>
          {weather.weather?.[0]?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
              className="weather-icon"
            />
          )}
        </div>
      ) : (
        <p className="info">Fetching weather data...</p>
      )}

      <div className="road-alerts">
        <h3>🚦 Weather Alerts</h3>
        {customAlerts.length > 0 ? (
          customAlerts.map((alert, index) => (
            <div
              key={index}
              className={`alert-card ${alert.severity.toLowerCase()}`}
            >
              <h4>{alert.event}</h4>
              <p>
                <strong>Severity:</strong> {alert.severity}
              </p>
              <p>
                <strong>Details:</strong> {alert.description}
              </p>
            </div>
          ))
        ) : (
          <p>No significant road risks detected.</p>
        )}
      </div>

      <button onClick={getLocation} className="refresh-button">
        Refresh
      </button>
      <Location />
    </div>
  );
};

export default WeatherPage;
