import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState(null); // searched location
  const [initialLocation, setInitialLocation] = useState(null); // user's current IP info
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();
        setInitialLocation(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserLocation();
  }, []);

  const handleClick = async () => {
    if (!ip) {
      setError("Please enter a valid IP address");
      return;
    }
    try {
      const res = await fetch(`https://ipwho.is/${ip}`);
      const data = await res.json();
      if (data.success) {
        setLocation(data);
        setError("");
      } else {
        setError("Invalid IP address");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching the data");
    }
  };

  const renderInfo = (loc, title) => (
    <div className="info-card">
      <h2>{title}</h2>
      <div className="info-grid">
        <p><strong>IP:</strong> {loc.ip}</p>
        <p><strong>Continent:</strong> {loc.continent}</p>
        <p><strong>Country:</strong> {loc.country} ({loc.country_code})</p>
        <p><strong>Region:</strong> {loc.region} ({loc.region_code})</p>
        <p><strong>City:</strong> {loc.city}</p>
        <p><strong>Postal Code:</strong> {loc.postal}</p>
        <p><strong>Latitude:</strong> {loc.latitude}</p>
        <p><strong>Longitude:</strong> {loc.longitude}</p>
        <p><strong>Timezone:</strong> {loc.timezone?.id} (UTC {loc.timezone?.utc})</p>
        <p><strong>ISP:</strong> {loc.connection?.isp}</p>
      </div>
    </div>
  );

  return (
    <div className="app">
      <h1>🌍 IP Location Finder</h1>
      <p className="note">The data below shows your current IP location. Use the search bar to find details for any other IP.</p>

      {initialLocation && renderInfo(initialLocation, "Your Current Location")}

      <div className="search-box">
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter IP address"
        />
        <button onClick={handleClick}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}
      {location && renderInfo(location, "Searched IP Location")}
    </div>
  );
}

export default App;
