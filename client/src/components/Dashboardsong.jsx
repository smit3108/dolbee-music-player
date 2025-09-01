import React, { useState, useEffect } from 'react';
import { deleteSong, getSongs } from '../api';
import { default_song_img } from '../assets/img';
import { FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Dashboardsong = () => {
  const [allsongs, setallsongs] = useState([]);

  useEffect(() => {
    getSongs()
      .then(result => {
        setallsongs(result.song);
      })
      .catch(error => {
        // Handle any potential errors here
        console.error(error);
      });
  }, []);

  const handleDelete = (songId) => {
    // Implement delete functionality here
    // You can use the songId to delete the song from the database
    try {
      const deleted = deleteSong(songId);
      // console.log(deleted);
      window.location.reload();
    } catch (error) {
      console.log("Not deleted");
    }
  };

  const [deletesong, setdeletesong] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  // Function to handle the click outside the confirmation box

  const filteredSongs = allsongs.filter(song =>
    song?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    // allsongs
  );

  return (
    <div className='pt-7 flex flex-col items-center justify-center'>
      {/* search box */}
      <div className='flex items-center justify-center w-full'>
        <NavLink to={'/dashboard/add/song'} className='w-7 h-7 ml-[20%] mr-[3%]'><FaPlus className='w-5 h-5'></FaPlus>
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
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <div
              key={song._id}
              className='w-full text-sm flex items-center justify-center bg-blue-100 rounded-lg p-4 shadow-sm overflow-hidden animate__animated animate__fadeIn'
            >
              <div className=' flex items-center justify-center rounded-full h-16 w-16 object-cover mr-5 shadow-lg overflow-hidden'>
                <img
                  src={song.imgUrl || default_song_img}
                  className=' h-full w-full'
                  alt={"song img"}
                />
              </div>
              <div className='flex flex-col flex-grow'>
                <div className='text-md text-blue-800 font-bold'>{song.name}</div>
                <div className='text-blue-600'>{song.artist}</div>
              </div>
              <div>
                {/* Button to trigger the confirmation box */}
                <button
                  onClick={() => {
                    setdeletesong(song);
                  }}
                  className='ml-3 px-3 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600'
                >
                  Delete
                </button>

                {/* Confirmation Box */}
                {deletesong && (
                  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-10'>
                    <div className='bg-white rounded-lg p-6'>
                      <p>Are you sure you want to Delete "{deletesong.name}"?</p>
                      <p>You can't undo this action</p>
                      <div className='mt-4 flex justify-end'>
                        <button
                          onClick={() => setdeletesong(false)}
                          className='px-3 py-1 rounded bg-gray-500 text-white font-semibold hover:bg-gray-600'
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => { handleDelete(deletesong._id) }}
                          className='ml-3 px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))
        ) : (
          <div className='text-blue-800 font-semibold'>Nothing to Display</div>
        )}
      </div>
    </div>
  );
};

export default Dashboardsong;
