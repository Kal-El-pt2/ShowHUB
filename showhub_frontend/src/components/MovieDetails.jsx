import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './ui/Navbar';
import { Autocomplete,Button } from '@mantine/core';
export default function MovieDetails() {

  const { movieName } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [city_selected, setCity] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/movies/${encodeURIComponent(movieName)}`)
      .then(response => response.json())
      .then(data => setMovieDetails(data))
      .catch(error => console.error('Error fetching movie details:', error));
  }, [movieName]);
    const [cities, setCities] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3001/cities')
          .then((response) => response.json())
          .then((data) => setCities(data))
          .catch((error) => console.error('Error fetching cities:', error));
      }, []);
    

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      {movieDetails && cities ? (
        <div>
          <img
            src={movieDetails.poster_link}
            alt={movieDetails.title}
            style={{ width: '100%', paddingLeft: '0' }}
          />
          <h1>{movieDetails.title}</h1>
          <p>{movieDetails.description}</p>
          <h2>Cast:</h2>
          <p>{movieDetails.actors}</p>
          <h2>
            YouTube Trailer
          </h2>
          <iframe width="800" height="500" src={movieDetails?.trailer_link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <Autocomplete
      label="City"
      placeholder="Select a city"
      value={city_selected}
      data={cities}
      onChange={setCity}
    />
    <Button onClick={setCity}>
        Select City
    </Button>
        </div>
        
      ) : (
        <p>Loading...</p>
      )}
          <div>
          
    </div>

    </div>
  );
}