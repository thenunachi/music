// our music player

import { useRef } from 'react';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useSound from "use-sound"; // for handling the sound
import rain from '../assets/rain.mp3';
import './player.css';
import axios from 'axios';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
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

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});


const Player = ({ audioPlayer }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [play, { pause, duration, sound }] = useSound(rain);
    const [currTime, setCurrTime] = useState({
        min: "",
        sec: "",
    }); // current position of the audio in minutes and seconds
    const [time, setTime] = useState({
        min: "",
        sec: ""
    });
    const audioRef = useRef(null);

    const [position, setPosition] = React.useState(32);

    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    const theme = useTheme();

    const [seconds, setSeconds] = useState(); // current position of the audio in seconds
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

    const [volume, setVolume] = useState(audioPlayer ? audioPlayer.volume : 1);
    console.log(volume);
    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        if (audioPlayer) {
            audioPlayer.volume = newValue; // Assuming audioPlayer.volume accepts values between 0 and 1
        }
    };
    const playingButton = () => {
        if (isPlaying) {
            pause(); // this will pause the audio
            setIsPlaying(false);
        } else {
            play(); // this will play the audio
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        if (duration) {
            const sec = duration / 1000;
            const min = Math.floor(sec / 60);
            const secRemain = Math.floor(sec % 60);
            setTime({
                min: min,
                sec: secRemain
            });
        }
    }, [isPlaying]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([])); // setting the seconds state with the current state
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrTime({
                    min,
                    sec,
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);
    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>

            <Widget>

                <Box sx={{ width: '100%', overflow: 'hidden' }}>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CoverImage>
                            <img
                                alt="can't win - Chilling Sunday"
                                src="/static/images/sliders/chilling-sunday.jpg"
                            />
                        </CoverImage>
                        <Box sx={{ ml: 1.5, minWidth: 0 }}>
                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                Rain
                            </Typography>
                            <Typography noWrap>
                                <b>Can't win</b>
                            </Typography>
                            <Typography noWrap letterSpacing={-0.25}>
                                Chilling Sunday
                            </Typography>
                        </Box>

                    </Box>


                </Box>

                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={position}
                    min={0}
                    step={1}
                    max={duration}
                    onChange={(_, value) => setPosition(value)}
                    sx={{
                        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                        height: 4,
                        '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&::before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                                    ? 'rgb(255 255 255 / 16%)'
                                    : 'rgb(0 0 0 / 16%)'
                                    }`,
                            },
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: -2,
                    }}
                >
                    <TinyText>{formatDuration(position)}</TinyText>
                    <TinyText>-{formatDuration(duration - position)}</TinyText>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: -2,
                    }}
                >

                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: -1,
                    }}
                >
                    <IconButton aria-label="previous song">
                        <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton>
                    <IconButton
                    >

                        {!isPlaying ? (
                            <PlayArrowRounded
                                sx={{ fontSize: '3rem' }}
                                htmlColor={mainIconColor}
                                onClick={playingButton}
                            />
                        ) : (
                            <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} onClick={playingButton} />
                        )}
                    </IconButton>
                    <IconButton aria-label="next song">
                        <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton>

                </Box>
                <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
                    <VolumeDownRounded htmlColor={lightIconColor} />
                    {/* <audio ref={audioRef} controls>
                        <source src="/static/images/sliders/chilling-sunday.jpg" type="audio/mpeg" />

                    </audio> */}
                    <Slider
                        aria-label="Volume"
                        defaultValue={30}
                        min={0}
                        max={1}
                        step={0.01}
                        // value={volume}
                        // onChange={handleVolumeChange}
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                            '& .MuiSlider-track': {
                                border: 'none',
                            },
                            '& .MuiSlider-thumb': {
                                width: 24,
                                height: 24,
                                backgroundColor: '#fff',
                                '&::before': {
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                },
                                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                    boxShadow: 'none',
                                },
                            },
                        }}
                    />
                    <VolumeUpRounded htmlColor={lightIconColor} />
                </Stack>

            </Widget>
            <WallPaper />
        </Box>
    );
}
export default Player;