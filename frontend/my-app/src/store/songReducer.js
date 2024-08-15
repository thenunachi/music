

const FETCH_ALL_SONGS = 'songs/fetchAllSongs';
const fetchAllSongs = payload =>{
    console.log(payload, "payload")
    return{
        type: FETCH_ALL_SONGS,
        payload
    }
}
export const getAllSongsThunk = () => async (dispatch) => {
    const response = await fetch("/api/songs/all")
    console.log(response, "response")
    if (response.ok){
        const data = await response.json();
        console.log(data, "data")
        dispatch(fetchAllSongs(data.songs));
        console.log(data,"data fetched from reducer")
        return {...data}
    }
}


const songReducer = (state = {}, action) => {
    console.log("inside reducer")
    let items = {}
        switch (action.type) {
            case FETCH_ALL_SONGS:
                console.log("inside reducer switch")
            action.payload.forEach(song => {
                console.log(song,"song")
              
                items[song.id] = song
                console.log(items, "items")
            });
         return {
                ...state,
                ...items
            };
            default:
                return state;
        }
    };
    
    export default songReducer;