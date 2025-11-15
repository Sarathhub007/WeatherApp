import { useState, useEffect } from "react";

const Location = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("Guntur");

  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchForecast = async () => {
    if (!apiKey) return setError("Missing API Key");
    if (!location) return setError("Please enter a location.");

    setLoading(true);
    setError(null);
    setForecast([]);

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to fetch weather data");
        return;
      }

      const seen = new Set();
      const daily = [];

      for (const entry of data.list) {
        const date = new Date(entry.dt_txt).toDateString();

        if (!seen.has(date)) {
          seen.add(date);
          daily.push(entry);
        }
      }

      setForecast(daily.slice(0, 5));
    } catch {
      setError("Failed to fetch forecast.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <div className="mt-20 glass-card--bright p-8 rounded-3xl shadow-xl max-w-5xl mx-auto">

      <h2 className="text-4xl font-bold text-center text-white mb-10">
        5-Day Forecast
      </h2>

      {/* Search */}
      <div className="flex justify-center items-center gap-4 mb-12">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="input-glass w-72"
        />

        <button
          onClick={fetchForecast}
          className="btn-primary px-6 py-2"
        >
          Fetch
        </button>
      </div>

      {/* Loading / Error */}
      {loading ? (
        <p className="text-center text-gray-300">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {forecast.map((day, idx) => (
            <div
              key={idx}
              className="
                glass-card p-5 text-center rounded-2xl 
                hover:-translate-y-1 transition-all cursor-pointer
              "
            >
              <p className="font-semibold text-gray-200 mb-2">
                {new Date(day.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt="Weather icon"
                className="mx-auto drop-shadow-lg w-20"
              />

              <p className="text-3xl font-bold text-white mt-3">
                {day.main.temp.toFixed(1)}°C
              </p>

              <p className="text-gray-300 capitalize text-sm mt-1">
                {day.weather[0].description}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Location;
