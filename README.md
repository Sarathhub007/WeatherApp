🌤️ Cloud Clover

A clean and modern weather application with real-time forecasts, alerts, and emergency tools — designed with a premium glass UI.

🚀 Features
🔐 Authentication

Secure login & signup using Clerk

User profile + login history tracking

🌦️ Weather Dashboard

Live weather (OpenWeather API)

°C / °F toggle

Weather icons

Air quality index (AQI)

Custom weather alerts

5-Day forecast

🆘 Emergency

Quick access to emergency contact numbers

One-tap Share My Location

Safety tips for storms, floods, heatwaves

🎨 UI & Design

Premium glassmorphism design

Fully mobile responsive

Soft gradients and smooth animations

🛠️ Tech Stack

React + Vite

Tailwind CSS (Glassmorphism)

Clerk Auth

OpenWeather API

Air Pollution API

Geolocation API

    📦 Setup
git clone https://github.com/Sarathhub007/WeatherApp.git
cd cloud-clover
npm install


Create a .env file:

VITE_CLERK_PUBLISHABLE_KEY=your_key
VITE_W_API_KEY=your_weather_api_key
VITE_P_API_KEY=your_air_pollution_api_key
VITE_BACKEND_URL=http://localhost:8081


Run the app:

npm run dev

📁 Project Structure
src/
 ├── Auth/
 ├── Components/
 ├── assets/
 ├── App.jsx
 ├── main.jsx
 └── index.css
