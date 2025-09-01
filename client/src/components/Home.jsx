import React, { useEffect, useState } from 'react';
import { getSongs } from '../api';
import SongCard from './SongCard';
import WelcomeMe from './WelcomeMe';
import SongSlideBar from './Slidebar';
import Header from './Header';
import { useStateValue } from '../context/StateProvider';
import { getfav } from '../api';
import { actionType } from '../context/reducer';

const Home = () => {
    const [allsongs, setAllSongs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [{ favsongs }, dispatch2] = useStateValue();
    const [{ user }, dispatch] = useStateValue();
    const dpt = user?.user?._id;
    useEffect(() => {
        if (dpt) {
            getfav(dpt).then((songs) => {
                dispatch2({
                    type: actionType.SET_FAVSONGS,
                    favsongs: songs
                })
            })
        }
    }, [user])


    useEffect(() => {
        getSongs()
            .then(result => {
                setAllSongs(result.song);
            })
            .catch(error => {
                // Handle any potential errors here
                console.error(error);
            });
    }, []);

    // Filter songs based on the user's search query
    const filteredSongs = allsongs.filter(song =>
        song.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mt-[75px] pb-[75px] w-full h-auto flex flex-col items-center">
            <Header />
            <div className="w-[90%] h-auto">
                <div className="flex flex-col items-center justify-center w-full">
                    <WelcomeMe />
                    {/* Search Bar */}
                    <div className="mt-4 w-2/6">
                        <input
                            type="text"
                            placeholder="Search for a song..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div className="mt-4 w-full">
                        {filteredSongs.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {filteredSongs.map(song => (
                                    <SongCard key={song._id} song={song} />
                                ))}
                            </div>
                        ) : (
                            <div className='text-blue-800 font-semibold mt-10'>Nothing to Display</div>
                        )}
                    </div>
                </div>
            </div>
            <SongSlideBar />
        </div>
    );
};

export default Home;
