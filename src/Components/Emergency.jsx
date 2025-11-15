const Emergency = () => {
  const handleLocationShare = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const link = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
        window.open(link, "_blank");
      },
      () => alert("Please enable location (GPS) access.")
    );
  };

  return (
    <div className="min-h-screen px-6 py-24">

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-white drop-shadow mb-4">
        🚨 Emergency Help
      </h1>

      <p className="text-gray-300 text-center max-w-xl mx-auto mb-12 leading-relaxed">
        Quick access to emergency services and safety tips during severe conditions.
      </p>

      {/* Emergency Contacts */}
      <div className="glass-card--bright p-8 rounded-3xl shadow-2xl max-w-lg mx-auto mb-12">
        <h3 className="text-2xl font-bold text-white text-center mb-6">
          Emergency Contacts
        </h3>

        <ul className="space-y-4 text-lg text-gray-200">
          <li className="flex justify-between">
            <span>Police:</span>
            <a href="tel:100" className="text-blue-400 font-semibold hover:underline">
              100
            </a>
          </li>

          <li className="flex justify-between">
            <span>Fire Dept:</span>
            <a href="tel:101" className="text-blue-400 font-semibold hover:underline">
              101
            </a>
          </li>

          <li className="flex justify-between">
            <span>Ambulance:</span>
            <a href="tel:102" className="text-blue-400 font-semibold hover:underline">
              102
            </a>
          </li>

          <li className="flex justify-between">
            <span>Disaster Helpline:</span>
            <a href="tel:108" className="text-blue-400 font-semibold hover:underline">
              108
            </a>
          </li>
        </ul>
      </div>

      {/* Share Location */}
      <div className="flex justify-center mb-12">
        <button
          onClick={handleLocationShare}
          className="btn-danger text-lg font-bold"
        >
          📍 Share My Location
        </button>
      </div>

      {/* Safety Tips */}
      <div className="glass-card--bright p-8 rounded-3xl shadow-xl max-w-lg mx-auto">
        <h3 className="text-2xl font-bold text-white text-center mb-6">
          Quick Safety Tips
        </h3>

        <ul className="space-y-4 text-gray-200 text-lg">
          <li>
            ⚠️ <b>Floods:</b> Move to higher ground and avoid low-lying areas.
          </li>
          <li>
            ⛈️ <b>Storms:</b> Stay indoors, avoid windows, and unplug electronics.
          </li>
          <li>
            ☀️ <b>Heatwaves:</b> Stay hydrated, avoid direct sunlight, and rest often.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Emergency;
