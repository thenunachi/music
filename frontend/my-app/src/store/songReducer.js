

const FETCH_ALL_SONGS = 'songs/fetchAllSongs';
const FETCH_SONG_BY_ID = 'songs/fetchSongById';


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
    console.log(id, "id")
    const response = await fetch(`/api/songs/${id}`)
    if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        // dispatch(fetchASongById(url));
        return url;

    }
    else {
        console.error("Failed to fetch the song")
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
        // case FETCH_SONG_BY_ID:
        //     return {
        //         ...state,
        //         songUrl: action.payload
        //     }



        default:
            return state;
    }
};

export default songReducer;