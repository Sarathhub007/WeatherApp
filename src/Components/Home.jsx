import { Link } from "react-router-dom";
import "./Home.css";
import { useState, useEffect } from "react";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);
          const apiKey = "775fb987a2ca189260fe2fe8ba45b8ba";
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              const windKmph = data.wind.speed * 3.6;
              setWeather({
                temperature: data.main.temp,
                humidity: data.main.humidity,
                wind: windKmph,
              });
            })
            .catch((error) => console.error("Error fetching weather data:", error));
        },
        (error) => {
          console.error("Error obtaining location:", error);
          setLocationError("Unable to retrieve your location.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="home-page">
      <main className="home-main">
        <div className="hero-content">
          <h1>Welcome to the Cloud Clover</h1>
          <p>
            Stay updated with real-time weather forecasts and emergency alerts.
            Your trusted companion for all weather updates.
          </p>
          <Link to="/weather" className="hero-link">
            Go to Weather Page
          </Link>
        </div>

        <div className="data-section">
          <h2>Todays Highlights</h2>
          {weather ? (
            <p>
              Temperature: {weather.temperature}°C | Humidity: {weather.humidity}% | Wind: {weather.wind.toFixed(0)} km/h
            </p>
          ) : locationError ? (
            <p>{locationError}</p>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      </main>
      <footer className="home-footer">
        <p>&copy; {year} Weather App. All rights reserved.</p>
        <p>Contact us: ilamsarathchandra@gmail.com</p>
      </footer>
    </div>
  );
};

export default Home;