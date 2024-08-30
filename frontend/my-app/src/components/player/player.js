// our music player
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import React, { useState, useEffect } from 'react';

import './player.css';
import axios from 'axios';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {  getASongByIdThunk,getSongLyrics } from '../../store/songReducer';
const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    '&::before': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        top: '-40%',
        right: '-50%',
        background:
            'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
    },
    '&::after': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        bottom: '-50%',
        left: '-30%',
        background:
            'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
        transform: 'rotate(30deg)',
    },
});

const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
    },
});




const Player = ({ song }) => {
    console.log(song, "song selected")
    const dispatch = useDispatch();
 
    const [songUrl, setSongUrl] = useState(null);
const [lyrics, setLyrics] = useState(null);
    useEffect(() => {
        if (song && song.id) {

            const loadSong = async () => {
                console.log(song.id, "ID")
                const id = song.id
                const url = await dispatch(getASongByIdThunk(id))
                console.log(url, "url", song.id, "id")
                setSongUrl(url);
                console.log(songUrl, "songUrl")
            }
            loadSong();

        }
    }, [song])
    useEffect(() => {
        console.log(songUrl, "songUrl");
        if (song && song.id) {
            const fetchLyrics = async () => {
                try {
                    const response = await dispatch(getSongLyrics(song.id)); // Wait for the promise to resolve
                    setLyrics(response.song.lyrics); // Set the lyrics in the state
                } catch (error) {
                    console.error("Failed to fetch lyrics:", error);
                }
            };
    
            fetchLyrics(); // Call the async function
        }
    }, [song, songUrl]); // Dependencies: song and songUrl
    
    if (!song || !song.file_path) {
        return <div>Loading...</div>; // or some other fallback UI
    }
  

console.log(lyrics,"lyrics")
    return (
        <div>
            <div>
    {lyrics}
</div>
   
        <Box sx={{ width: '100%', overflow: 'hidden' }}>

            <Widget>


                <Box sx={{ width: '100%', overflow: 'hidden' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CoverImage>
                            <img alt={song && song.title} src="/static/images/sliders/chilling-sunday.jpg" /> Use song's cover image
                        </CoverImage>
                        <Box sx={{ ml: 1.5, minWidth: 0 }}>
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                {song && song.artist} Use song's artist
                            </Typography>
                            <Typography noWrap>
                                <b>{song && song.title}</b> Use song's title
                            </Typography>
                        </Box>
                    </Box>
                </Box>


                    <audio controls>
                        <source src={`http://localhost:5000/api/songs/${song.id}`} type="audio/mp3" />
                        {/* <source src={songUrl} type="audio/mp3"/> */}
                  Your browser does not support the audio element. 
               </audio>
              

                   

            </Widget>
            <WallPaper />
        </Box>
        </div>
    );

}
export default Player;

// curl "https://api.spotify.com/v1/artist/4zCH9qm4R2DADamUHMCa6O" \
//      -H "Authorization: Bearer  BQCAJL7QAU_YgMZdvKR1L7gPUh7KWIX4XUMYjVhWDlAJL_dk4AjRem1Y8ae-UUTDTxYfcb9a1TveELuIXRIg7Gli05n0kG-hU5M6LQEXlqwvy8v-8ZA"
// curl -X POST "https://accounts.spotify.com/api/token" \
//      -H "Content-Type: application/x-www-form-urlencoded" \
//      -d "grant_type=client_credentials&client_id=330af6ef142c4b559ef52ecf2a2b90f8&client_secret=de844f8ac31143e0908929e00cd32f3b"
//      {"access_token":"BQBgbd5pbfts5S-CDob2hvh-tOHi6IT6yUIy1yR1DCpAm11ViWOp8ClXgGGB83ko9QXk5pnkY8teBfbjfo2C_eJVQCQ-liRI1q2nRPiQ8wewtpxN2VQ",
//         "token_type":"Bearer",
//         "expires_in":3600}% 

//         https://open.spotify.com/artist/4zCH9qm4R2DADamUHMCa6O?si=dVEH3YQSS_2DSCu860f6QQ

//         curl "https://api.spotify.com/v1/artists/4zCH9qm4R2DADamUHMCa6O" \
//      -H "Authorization: Bearer  BQBgbd5pbfts5S-CDob2hvh-tOHi6IT6yUIy1yR1DCpAm11ViWOp8ClXgGGB83ko9QXk5pnkY8teBfbjfo2C_eJVQCQ-liRI1q2nRPiQ8wewtpxN2VQ"
// {"external_urls":{"spotify":"https://open.spotify.com/artist/4zCH9qm4R2DADamUHMCa6O"},
// "followers":{"href":null,"total":31546984},
// "genres":["desi hip hop","filmi","tamil hip hop"],
// "href":"https://api.spotify.com/v1/artists/4zCH9qm4R2DADamUHMCa6O",
// "id":"4zCH9qm4R2DADamUHMCa6O",
// "images":[{"url":"https://i.scdn.co/image/ab6761610000e5eb0f0be2054fe9594026a6b843",
//     "height":640,"width":640},{"url":"https://i.scdn.co/image/ab676161000051740f0be2054fe9594026a6b843",
//         "height":320,"width":320},{"url":"https://i.scdn.co/image/ab6761610000f1780f0be2054fe9594026a6b843",
//             "height":160,"width":160}],
//             "name":"Anirudh Ravichander",
//             "popularity":83,
//             "type":"artist",
//             "uri":"spotify:artist:4zCH9qm4R2DADamUHMCa6O"}
