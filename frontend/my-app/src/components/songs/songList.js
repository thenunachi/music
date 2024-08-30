import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongsThunk, getAllSongsFromDirectoryThunk } from '../../store/songReducer';
import './songs.css';
import Player from '../player/player';
const SongList = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => Object.values(state.songReducer) || []);
  console.log(songs, "songs")

  const error = useSelector((state) => state.songReducer.error);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    dispatch(getAllSongsThunk());
  }, [dispatch]);

  if (error) {
    return <p>Error: {error}</p>;
  }


  const handleSongClick = (song) => {
    setSelectedSong(song); // Update the selected song state (optional)
    console.log(selectedSong, "selected song")


  };

  return (
    <div className='song-list'>
      <h1>Song List</h1>
      <div className='vertical-menu'>
      {
  songs && songs.map((song) => (
   <a>
    <button
      key={song.id}
      className={`song-button ${selectedSong && selectedSong.id === song.id ? 'selected' : ''}`}
      onClick={() => handleSongClick(song)}
    >
      {song.title}
    </button>
    </a>
  ))
}
</div>

      {/* Conditionally render the Player component if a song is selected */}
      {selectedSong && <Player song={selectedSong} />}
    </div>
  );
};

export default SongList;
