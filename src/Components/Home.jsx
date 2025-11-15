import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const apiKey = "775fb987a2ca189260fe2fe8ba45b8ba";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${apiKey}`;

        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const windKmph = (data.wind?.speed || 0) * 3.6;
            setWeather({
              temperature: data.main?.temp,
              humidity: data.main?.humidity,
              wind: windKmph,
            });
          })
          .catch(() => setLocationError("Failed to fetch weather data"));
      },
      () => setLocationError("Unable to retrieve your location.")
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 text-center">

      {/* HERO CARD */}
      <section className="glass-card--bright w-full max-w-2xl p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Welcome to <span className="text-blue-400">Cloud Clover</span>
        </h1>

        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          Your personal weather assistant.  
          Get real-time updates, forecasts, alerts, and emergency help — all in one place.
        </p>

        <Link
          to="/weather"
          className="btn-primary inline-block mt-2"
        >
          Go to Weather Page
        </Link>
      </section>

      {/* TODAY'S HIGHLIGHTS */}
      <section className="glass-card w-full max-w-xl p-6 rounded-2xl shadow-xl mt-12">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Today’s Highlights
        </h2>

        {weather ? (
          <p className="text-gray-300 text-lg space-y-2">
            🌡 <b>Temperature:</b> {weather.temperature}°C <br />
            💧 <b>Humidity:</b> {weather.humidity}% <br />
            🌬 <b>Wind:</b> {weather.wind.toFixed(0)} km/h
          </p>
        ) : locationError ? (
          <p className="text-red-400 font-medium">{locationError}</p>
        ) : (
          <p className="text-gray-400">Fetching weather data...</p>
        )}
      </section>

      {/* FOOTER */}
      <footer className="mt-16 text-gray-500 text-sm">
        <p>&copy; {year} Cloud Clover — All Rights Reserved</p>
        <p className="opacity-60">Contact: ilamsarathchandra@gmail.com</p>
      </footer>
    </div>
  );
};

export default Home;
