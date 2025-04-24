import React, { useState, useEffect } from "react";
import "../styling/rover.css";

const MarsRover = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState("2022-01-01");

  useEffect(() => {
    const fetchPhotos = async () => {
        const API_KEY = "FJKDWPvIXWuUOog4NnaoLR3RwvdCRGr9VUL0Cxcp"; 
        const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`;

        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setPhotos(data.photos || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching Mars Rover photos:", error);
            setError("Failed to fetch Mars Rover photos. Please try again later.");
            setLoading(false);
        }
    };


    fetchPhotos();
  }, [date]); 

  if (loading) {
    return <div className="loading">Loading Mars Rover photos...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="rover-container">
      <div className="date-picker">
        <label htmlFor="date">Select a date: </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>
      {photos.length > 0 ? (
        photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.img_src} alt={`Taken by ${photo.camera.full_name}`} />
            <p>Camera: {photo.camera.full_name}</p>
          </div>
        ))
      ) : (
        <p>No photos available for the specified date.</p>
      )}
    </div>
  );
};

export default MarsRover;
