// src/components/ArtistList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArtistList = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get('/artists')
      .then(response => setArtists(response.data.artists))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Artists</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist}>{artist}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistList;
