import React, { useState, useEffect } from "react";
import "../styling/rover.css";

const rovers = {
  curiosity: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"],
  opportunity: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
  spirit: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"],
};

const MarsRover = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    rover: "curiosity",
    camera: "",
    date: "2022-01-01",
  });
  const [triggerSearch, setTriggerSearch] = useState(false);

  const handleChange = (field, value) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!triggerSearch) return; // Only fetch data if the user clicks "Search"
    const fetchPhotos = async () => {
      setLoading(true);
      const API_KEY = "FJKDWPvIXWuUOog4NnaoLR3RwvdCRGr9VUL0Cxcp";
      const params = new URLSearchParams({
        earth_date: searchParams.date,
        api_key: API_KEY,
      });
      if (searchParams.camera) {
        params.append("camera", searchParams.camera);
      }
      const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${searchParams.rover}/photos?${params.toString()}`;

      try {
        const response = await fetch(URL);
        const data = await response.json();
        setPhotos(data.photos || []);
        setError(null);
      } catch (err) {
        setError("Failed to load photos.");
        setPhotos([]);
      } finally {
        setLoading(false);
        setTriggerSearch(false); // Reset triggerSearch after fetching
      }
    };

    fetchPhotos();
  }, [triggerSearch, searchParams]);

  return (
    <div className="rover-container">
      <h1>Mars Rover Photos</h1>

      <div className="controls">
        <label>
          Rover:
          <select
            value={searchParams.rover}
            onChange={(e) => handleChange("rover", e.target.value)}
          >
            {Object.keys(rovers).map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Camera:
          <select
            value={searchParams.camera}
            onChange={(e) => handleChange("camera", e.target.value)}
          >
            <option value="">All</option>
            {rovers[searchParams.rover].map((cam) => (
              <option key={cam} value={cam}>
                {cam}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date:
          <input
            type="date"
            value={searchParams.date}
            onChange={(e) => handleChange("date", e.target.value)}
            min="2004-01-01"
            max={new Date().toISOString().split("T")[0]}
          />
        </label>

        <button onClick={() => setTriggerSearch(true)}>Search</button>
      </div>

      {loading && <div className="loading">Loading photos...</div>}
      {error && <div className="error">{error}</div>}

      <div className="photos-grid">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id} className="photo-card">
              <img
                src={photo.img_src}
                alt={`Taken by ${photo.camera.full_name}`}
              />
              <p>{photo.camera.full_name}</p>
              <p>{photo.earth_date}</p>
            </div>
          ))
        ) : (
          !loading && <p>No photos found for this selection.</p>
        )}
      </div>
    </div>
  );
};

export default MarsRover;
