import React, { useState, useEffect } from 'react';
import { deleteArtist, getArtists, } from '../api';
import { default_artist_img } from '../assets/img';
import { NavLink } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Dashboardartist = () => {
    const [allartist, setallartist] = useState([]);

    useEffect(() => {
        getArtists()
            .then(result => {
                setallartist(result.artist);
            })
            .catch(error => {
                // Handle any potential errors here
                console.error(error);
            });
    }, []);

    const handleDelete = (artistId) => {
        // Implement delete functionality here
        // You can use the songId to delete the song from the database
        try {
            const deleted = deleteArtist(artistId);
            // console.log(deleted);
            window.location.reload();
            setShowConfirmation(null);
        } catch (error) {
            console.log("Not deleted");
        }
    };
    const [showConfirmation, setShowConfirmation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    // Function to handle the click outside the confirmation box
    const filteredartist = allartist.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
        // allsongs
    );
    return (
        <div className='pt-7 flex flex-col items-center justify-center'>
            {/* search box */}
            <div className='flex items-center justify-center w-full'>
                <NavLink to={'/dashboard/add/artist'} className='w-7 h-7 ml-[20%] mr-[3%]'><FaPlus className='w-5 h-5'></FaPlus>
                </NavLink>
                <div className='mr-[25%] w-[50%] h-auto border-solid rounded-full border-black border-2 flex overflow-auto relative'>
                    <input
                        type='text'
                        placeholder='Search'
                        className='w-full h-9 p-5 outline-none hover:bg-blue-50'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className='p-7 w-full flex flex-col items-center gap-5'>
                {filteredartist.length > 0 ? (
                    filteredartist.map(artist => (
                        <div
                            key={artist._id}
                            className='w-full text-sm flex items-center justify-center bg-blue-100 rounded-lg p-4 shadow-sm overflow-hidden'
                        >
                            <div className=' flex items-center justify-center rounded-full h-16 w-16 object-cover mr-5 shadow-lg overflow-hidden'>
                                <img
                                    src={artist.imgUrl || default_artist_img}
                                    className=' h-full w-full'
                                    alt={"song img"}
                                />
                            </div>
                            <div className='flex flex-col flex-grow'>
                                <div className='text-md text-blue-800 font-bold'>{artist.name}</div>
                            </div>
                            <button
                                onClick={() => setShowConfirmation(artist)}
                                className='ml-3 px-3 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600'
                            >
                                Delete
                            </button>

                            {showConfirmation && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
                                    <div className="bg-white rounded-lg p-6">
                                        <p>Are you sure you want to Delete "{showConfirmation.name}"?</p>
                                        <p>You can't undo this action</p>
                                        <div className="mt-4 flex justify-end">
                                            <button
                                                onClick={() => setShowConfirmation(false)}
                                                className="px-3 py-1 rounded bg-gray-500 text-white font-semibold hover:bg-gray-600"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleDelete(showConfirmation._id)}
                                                className="ml-3 px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    ))
                ) : (
                    <div className='text-blue-800 font-semibold'>Nothing to Display</div>
                )}
            </div>
        </div>
    );
};

export default Dashboardartist;
