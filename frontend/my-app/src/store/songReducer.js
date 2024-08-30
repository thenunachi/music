

const FETCH_ALL_SONGS = 'songs/fetchAllSongs';
const FETCH_SONG_BY_ID = 'songs/fetchSongById';
const FETCH_SONG_LYRICS = 'songs/fetchSongLyrics';

const fetchAllSongs = payload => {
    console.log(payload, "payload")
    return {
        type: FETCH_ALL_SONGS,
        payload
    }
}
const fetchASongById = (url) => {
    return {
        type: FETCH_SONG_BY_ID,
        payload: url
    }
}
const fetchSongLyrics = (lyrics) => {
    return {
        type: FETCH_SONG_LYRICS,
        payload: lyrics
    }
}
export const getAllSongsThunk = () => async (dispatch) => {
    const response = await fetch("/api/songs/all")
    console.log(response, "response")
    if (response.ok) {
        const data = await response.json();
        console.log(data, "data")
        dispatch(fetchAllSongs(data.songs));
        console.log(data, "data fetched from reducer")
        return { ...data }
    }

}
export const getASongByIdThunk = (id) => async (dispatch) => {
    const response = await fetch(`http://localhost:5000/api/songs/${id}`);
        
    if (response.ok) {
        const url = response.url; // Use the response URL directly
        
        // Dispatch an action to store the song URL in the Redux store
        dispatch(fetchASongById(url));
        return url; // Optional: return the URL if needed
        }
    else {
        console.error("Failed to fetch the song")
    }
}
export const getSongLyrics = (id)=>async (dispatch)=>{
    const response = await fetch(`http://localhost:5000/api/songs/${id}/lyrics`);
    if(response.ok){
        const data = await response.json()
        console.log(data, "data")
        dispatch(fetchSongLyrics(data.song))
        return data
    }
    else{
        console.error("Failed to fetch lyrics")
    }
}

const initialState = {
    songUrl: null
}
const songReducer = (state = {}, action) => {
    console.log("inside reducer")
    let songs = {}
    
    switch (action.type) {
        case FETCH_ALL_SONGS:
            console.log("inside reducer switch")
            action.payload.forEach(song => {
                console.log(song, "song")

                songs[song.id] = song
                console.log(songs, "songs")
            });
            // you didn't add return here
            return {
                ...state,

                ...songs
            }
        case FETCH_SONG_BY_ID:


            return {
                ...state,

                songUrl: action.payload
             
            }

        case FETCH_SONG_LYRICS:
            return {
                ...state,
                lyrics: action.payload
            }


        default:
            return state;
    }
};

export default songReducer;