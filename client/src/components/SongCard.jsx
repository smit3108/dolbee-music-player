import React, { useState } from 'react';
import { default_song_img } from '../assets/img';
import { FaPlay } from 'react-icons/fa';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import { useEffect } from 'react';

const SongCard = ({ song }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [{ currentsong }, dispatch] = useStateValue();
    const [songplay, setSongplay] = useState(null);

    const handlePlayButtonClick = (song) => {
        if (song) {
            dispatch({ type: actionType.SET_CURRENTSONG, currentsong: song._id });
        }
    };

    useEffect(() => {
        if (!songplay) return;
        // Perform any actions based on the updated value of `songplay`
        dispatch({ type: actionType.SET_CURRENTSONG, currentsong: songplay._id });
        setSongplay(null);
    }, [songplay]);

    return (
        <div
            className="bg-white rounded-md shadow-lg p-4 w-[225px] relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={song.imgUrl || default_song_img}
                alt={song.title}
                className="object-cover rounded-md mb-2"
                style={{ maxWidth: '100%', maxHeight: '150px', width: '100%', height: 'auto' }}
            />
            <div className="font-bold text-lg overflow-hidden leading-tight text-gray-800">{song.name}</div>
            <div className="text-gray-600 overflow-hidden leading-tight">{song.artist}</div>
            <div
                className={`absolute bottom-4 right-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <div
                    className="flex items-center justify-center rounded-full cursor-pointer"
                    style={{
                        width: '50px',
                        height: '50px',
                        background: isHovered
                            ? 'linear-gradient(135deg, #5368F6, #EE76A8)'
                            : 'linear-gradient(135deg, #333333, #666666)',
                        boxShadow: isHovered ? '0 3px 10px rgba(83, 104, 246, 0.5)' : 'none',
                        transform: isHovered ? 'scale(1.1)' : 'none',
                        transition: 'all 0.2s ease-in-out',
                    }}
                    onClick={() => setSongplay(song)}
                >
                    <FaPlay className={`text-white ${isHovered ? 'animate-pulse' : ''}`} />
                </div>
            </div>
        </div>
    );
};

export default SongCard;
