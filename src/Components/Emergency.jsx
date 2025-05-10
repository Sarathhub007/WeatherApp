// import React from 'react';
import './Emergency.css'; 

const Emergency = () => {
  const handleLocationShare = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
      window.open(location, '_blank'); 
    });
  };

  return (
    <div className="emergency-container">
      <h1 className="emergency-title">Emergency Help</h1>
      <p className="emergency-description">
        Stay safe. Here are some contacts and tips for bad weather emergencies:
      </p>

      <div>
        <h3>Emergency Contacts:</h3>
        <ul className="emergency-contacts">
          <li>Police: <a href="tel:100">100</a></li>
          <li>Fire Department: <a href="tel:101">101</a></li>
          <li>Ambulance: <a href="tel:102">102</a></li>
          <li>Disaster Helpline: <a href="tel:108">108</a></li>
        </ul>
      </div>

      <button className="share-location-button" onClick={handleLocationShare}>
        Share My Location
      </button>

      <div className="safety-tips">
        <h3>Quick Safety Tips:</h3>
        <ul>
          <li>Floods: Avoid low-lying areas and evacuate if needed.</li>
          <li>Storms: Stay indoors and away from windows.</li>
          <li>Heatwaves: Stay hydrated and avoid outdoor activities.</li>
        </ul>
      </div>
    </div>
  );
};

export default Emergency;
