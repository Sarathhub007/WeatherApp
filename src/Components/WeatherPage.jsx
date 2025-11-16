import { useState, useEffect } from "react";
import Location from "./Location";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [customAlerts, setCustomAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [unit, setUnit] = useState("metric");
  const [airPollution, setAirPollution] = useState(null);
  const [celsius, setCelsius] = useState(true);
  const navigate = useNavigate();
  const weatherApiKey = import.meta.env.VITE_W_API_KEY;
  const airPollutionApiKey = import.meta.env.VITE_P_API_KEY;

  useEffect(() => {
    // Redirect to home page "/"
    navigate("/weather", { replace: true });
  }, [navigate]);

  // ---------------- Fetch Weather Data ----------------
  const fetchWeather = async (lat, lon) => {
    if (!weatherApiKey) return setError("Weather API Key missing!");

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=${unit}`;

    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setWeather(data);
      fetchAirPollution(lat, lon, data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setAirPollution(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!location) return setError("Enter a city name.");

    setLoading(true);
    setError(null);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}&units=${unit}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setWeather(data);
      fetchAirPollution(data.coord.lat, data.coord.lon, data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Air Pollution ----------------
  const fetchAirPollution = async (lat, lon, weatherData) => {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${airPollutionApiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch air pollution");

      setAirPollution(data);
      generateAlerts(weatherData, data);
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------------- Alerts ----------------
  const generateAlerts = (w, p) => {
    let alerts = [];
    const temp = w.main?.temp;
    const cond = w.weather?.[0]?.main;
    const visibility = w.visibility ? w.visibility / 1000 : null;
    const wind = w.wind?.speed;

    if (temp < 0)
      alerts.push({
        event: "Freezing Temperatures",
        severity: "high",
        description: "Drive carefully, roads may be icy.",
      });
    if (cond === "Rain")
      alerts.push({
        event: "Rainy Weather",
        severity: "medium",
        description: "Slippery roads expected.",
      });
    if (cond === "Snow")
      alerts.push({
        event: "Snowfall Alert",
        severity: "high",
        description: "Heavy snow might block roads.",
      });
    if (visibility < 1)
      alerts.push({
        event: "Low Visibility",
        severity: "medium",
        description: "Foggy weather – drive slowly!",
      });
    if (wind > 20)
      alerts.push({
        event: "Strong Winds",
        severity: "medium",
        description: "High winds may affect driving stability.",
      });

    if (p?.list?.length > 0) {
      const aqi = p.list[0].main.aqi;
      const names = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
      const sev = ["low", "low", "medium", "high", "high"];
      const msg = [
        "No concerns.",
        "Fair air quality.",
        "Moderate risk.",
        "Limit outdoor activity.",
        "Very unhealthy. Avoid going outside.",
      ];

      alerts.push({
        event: `Air Quality: ${names[aqi - 1]}`,
        severity: sev[aqi - 1],
        description: msg[aqi - 1],
      });
    }

    setCustomAlerts(alerts);
  };

  // ---------------- Geo Location ----------------
  const getLocation = () => {
    if (!navigator.geolocation) return setError("Geolocation not supported.");

    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => setError("Location access denied.")
    );
  };

  useEffect(() => {
    getLocation();
  }, [unit]);

  // ---------------- Toggle ----------------
  const toggleUnit = () => {
    setCelsius(!celsius);
    setUnit(celsius ? "imperial" : "metric");
  };

  return (
    <div className="min-h-screen px-6 py-24">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold text-center text-white mb-10">
        Cloud Clover
      </h2>

      {/* Search + Toggle */}
      <div className="flex justify-center items-center gap-4 mb-12">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search city..."
          className="input-glass w-72"
        />

        <button
          onClick={fetchWeatherByLocation}
          className="glass p-3 rounded-xl text-white hover:bg-white/20 transition"
        >
          <CiSearch size={22} />
        </button>

        <div onClick={toggleUnit} className="cursor-pointer">
          {celsius ? (
            <BsToggleOn size={40} className="text-blue-400" />
          ) : (
            <BsToggleOff size={40} className="text-gray-400" />
          )}
        </div>
      </div>

      {/* Weather Main Card */}
      <div className="flex justify-center">
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : weather ? (
          <div className="glass-card--bright p-8 w-full max-w-md text-center">
            <p className="text-3xl font-bold text-white">
              {weather.name}, {weather.sys?.country}
            </p>

            <p className="text-6xl font-extrabold text-white my-4">
              {weather.main?.temp}°{unit === "metric" ? "C" : "F"}
            </p>

            <p className="capitalize text-gray-300 text-lg mb-4">
              {weather.weather?.[0]?.description}
            </p>

            {weather.weather?.[0]?.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Icon"
                className="mx-auto w-32"
              />
            )}
          </div>
        ) : (
          <p className="text-gray-300">Fetching weather...</p>
        )}
      </div>

      {/* Alerts Section */}
      <div className="mt-12 max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-4">
          🚨 Weather Alerts
        </h3>

        <div className="space-y-4">
          {customAlerts.length > 0 ? (
            customAlerts.map((a, i) => (
              <div
                key={i}
                className={`glass-card p-5 border-l-4 ${
                  a.severity === "high"
                    ? "border-red-500"
                    : a.severity === "medium"
                    ? "border-yellow-400"
                    : "border-green-500"
                }`}
              >
                <h4 className="text-xl font-bold text-white">{a.event}</h4>
                <p className="text-gray-300">
                  <b>Severity:</b> {a.severity}
                </p>
                <p className="text-gray-300">
                  <b>Details:</b> {a.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No major alerts.</p>
          )}
        </div>
      </div>

      {/* Refresh Button */}
      <div className="text-center mt-10">
        <button onClick={getLocation} className="btn-primary">
          Refresh
        </button>
      </div>

      {/* Forecast */}
      <div className="mt-14">
        <Location />
      </div>
    </div>
  );
};

export default WeatherPage;
