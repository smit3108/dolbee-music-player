import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaRetweet, FaRandom } from 'react-icons/fa';
import { useStateValue } from '../context/StateProvider';
import { getonesong } from '../api';
import ReactPlayer from 'react-player';
import { default_song_img } from '../assets/img';

const SongSlideBar = () => {
    const [{ currentsong }, dispatch] = useStateValue();
    const [playsong, setplaysong] = useState(null);
    const [isPlaying, setisPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const playerRef = useRef(null);
    const [plysec, setPlayedSeconds] = useState(0);
    const [totalsec, settotalSeconds] = useState(0);

    useEffect(() => {
        if (!currentsong) return;
        getonesong(currentsong).then((song) => {
            if (!isPlaying) toggleplay();
            setplaysong(song);
        });
    }, [currentsong]);

    const toggleplay = () => {
        setisPlaying(!isPlaying);
    };

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.addEventListener('progress', handleProgress);
        }
        return () => {
            if (playerRef.current) {
                playerRef.current.removeEventListener('progress', handleProgress);
            }
        };
    }, []);

    const handleProgress = () => {
        if (playerRef.current) {
            const playedSeconds = playerRef.current.getCurrentTime();
            setPlayedSeconds(playedSeconds);
            const totalSeconds = playerRef.current.getDuration();
            settotalSeconds(totalSeconds);
            const calculatedProgress = playedSeconds / totalSeconds;
            setProgress(calculatedProgress);
        }
    };
    const handleSeek = (e) => {
        if (playerRef.current) {
            const seekTime = playerRef.current.getDuration() * (e.nativeEvent.offsetX / e.currentTarget.offsetWidth);
            playerRef.current.seekTo(seekTime);
            setProgress(seekTime / playerRef.current.getDuration());
        }
    };

    return (
        playsong && (
            <div className="w-full">
                {/* Progress bar */}
                <div className="bg-gray-200 fixed bottom-[75px] h-1 w-full cursor-pointer hover:h-1.5 hover:transition-transform  hover:ease-in-out hover:duration-1000"
                    onClick={handleSeek}>
                    <div
                        className="h-full bg-blue-500"
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>
                <div className="fixed bottom-0 bg-white w-full h-[75px] flex items-center justify-between px-4 z-10">
                    <div className=" bg-white w-full h-[75px] grid grid-cols-3 grid-rows-1 items-center justify-center px-4 z-10">
                        {/* Middle section: Song image and info */}
                        <div className="flex items-center mr-auto">
                            <div className="m-1 w-16 h-full max-h-[70px] mr-auto">
                                <img className='shadow-sm border-e-2 rounded-sm' src={playsong.imgUrl || default_song_img} alt="Song Cover" />
                            </div>
                            <div className="text-gray-700 ml-3">
                                <div className='font-semibold overflow-hidden'>{playsong.name}</div>
                                <div className='font-thin h-6 overflow-hidden'>
                                    {playsong.artist} - {playsong.album}
                                </div>
                            </div>
                        </div>
                        {/* Left side playback control */}
                        <div className="flex items-center justify-center pb-5 ml-3 mr-3 gap-7">
                            <div>
                                {Math.floor(plysec / 60).toString().padStart(2, '0')}:{Math.floor(plysec % 60).toString().padStart(2, '0')}
                            </div>
                            <button className="p-2 rounded-full">
                                <FaStepBackward className="w-7 h-7" />
                            </button>
                            <button className="p-2 rounded-full" onClick={toggleplay}>
                                {/* Use a conditional rendering for Play/Pause button */}
                                {isPlaying ? <FaPause className="w-7 h-7" /> : <FaPlay className="w-7 h-7" />}
                            </button>
                            <button className="p-2 rounded-full">
                                <FaStepForward className="w-7 h-7" />
                            </button>
                            <div>
                                {Math.floor(totalsec / 60).toString().padStart(2, '0')}:{Math.floor(totalsec % 60).toString().padStart(2, '0')}
                            </div>
                        </div>
                        {/* right side */}
                        <div className="flex items-center gap-7 ml-auto">
                            <FaRetweet className="w-5 h-5" />
                            <FaRandom className="w-5 h-5" />
                            <FaVolumeUp className="w-5 h-5" />
                        </div>
                    </div>


                    <ReactPlayer
                        ref={playerRef}
                        url={playsong?.songUrl}
                        playing={isPlaying}
                        onProgress={handleProgress}
                        width="0"
                        height="0"
                        config={{
                            youtube: {
                                playerVars: {
                                    controls: 0,
                                    showinfo: 0,
                                    iv_load_policy: 3,
                                },
                            },
                        }}
                    />

                </div>
            </div >
        )
    );
};

export default SongSlideBar;
