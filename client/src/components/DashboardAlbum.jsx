import React, { useState, useEffect } from 'react';
import { getAlbums, deleteAlbum } from '../api';
import { default_album_img } from '../assets/img';
import { NavLink } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
const DashboardAlbum = () => {
  const [allAlbum, setallAlbum] = useState([]);

  useEffect(() => {
    getAlbums()
      .then(result => {
        setallAlbum(result.album);
      })
      .catch(error => {
        // Handle any potential errors here
        console.error(error);
      });
  }, []);

  const handleDelete = (AlbumId) => {
    // Implement delete functionality here
    try {
      const deleted = deleteAlbum(AlbumId);
      // console.log(deleted);
      setShowConfirmation(null);
      window.location.reload();
    } catch (error) {
      console.log("Not deleted");
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  // Function to handle the click outside the confirmation box
  const filteredAlbum = allAlbum.filter(albums =>
    albums.name.toLowerCase().includes(searchQuery.toLowerCase())
    // allsongs
  );
  const [showConfirmation, setShowConfirmation] = useState(null);

  return (
    <div className='pt-7 flex flex-col items-center justify-center'>
      {/* search box */}
      <div className='flex items-center justify-center w-full'>
        <NavLink to={'/dashboard/add/album'} className='w-7 h-7 ml-[20%] mr-[3%]'><FaPlus className='w-5 h-5'></FaPlus>
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
        {filteredAlbum.length > 0 ? (
          filteredAlbum.map(album => (
            <div
              key={album._id}
              className='w-full text-sm flex items-center justify-center bg-blue-100 rounded-lg p-4 shadow-sm overflow-hidden'
            >
              <img
                src={album.imageUrl || default_album_img}
                className='rounded-full h-14 w-14 object-cover mr-5 shadow-md'
                alt={album.name}
              />
              <div className='text-md text-blue-800 font-bold'>{album.name}</div>
              <button
                onClick={() => setShowConfirmation(album)}
                className='ml-auto px-3 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600'
              >
                Delete
              </button>


              {/* Confirmation Box */}
              {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
                  <div className="bg-white rounded-lg p-6">
                    <p>Are you sure you want to Delete "{showConfirmation.name}"?</p>
                    <p>You can't undo this action</p>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => setShowConfirmation(null)}
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
    </div >
  );
};

export default DashboardAlbum;
