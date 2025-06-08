import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();
        setLocation(data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
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

  return (
    <div className="app">
      <h1>🌍 IP Location Finder</h1>
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

      {location && location.success && (
        <div className="info-card">
          <h2>Location Information</h2>
          <div className="info-grid">
            <p><strong>IP:</strong> {location.ip}</p>
            <p><strong>Continent:</strong> {location.continent}</p>
            <p><strong>Country:</strong> {location.country} ({location.country_code})</p>
            <p><strong>Region:</strong> {location.region} ({location.region_code})</p>
            <p><strong>City:</strong> {location.city}</p>
            <p><strong>Postal Code:</strong> {location.postal}</p>
            <p><strong>Latitude:</strong> {location.latitude}</p>
            <p><strong>Longitude:</strong> {location.longitude}</p>
            <p><strong>Timezone:</strong> {location.timezone?.id} (UTC {location.timezone?.utc})</p>
            <p><strong>ISP:</strong> {location.connection?.isp}</p>
            <p><strong>Organization:</strong> {location.connection?.organization}</p>
            <p><strong>Currency:</strong> {location.currency?.code} ({location.currency?.symbol})</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;