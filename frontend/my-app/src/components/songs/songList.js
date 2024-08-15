import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongsThunk} from '../../store/songReducer';
import './songs.css';
const SongList = () => {
    const dispatch = useDispatch();
    const songs = useSelector(state =>Object.values(state.songReducer) || []);    
    console.log(songs,"songs")
    // const error = useSelector((state) => console.log(state.songReducer,"state what value"));
    const error = useSelector((state) => state.songReducer.error);

    useEffect(() => {
        dispatch(getAllSongsThunk());
    }, [dispatch]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='song-list'>
            <h1>Song List</h1>
            <ul>
                {songs && songs.map(song => (
                    <li key={song.id}>{song.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SongList;
