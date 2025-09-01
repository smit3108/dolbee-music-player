import React from 'react';
import Header from './Header';
import { Form } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addnewArtistdb } from '../api';
// import { addnewSongdb } from '../api';

const AddnewArtist = () => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDropArtist = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        console.log(file);
        console.log("file in ");
        // Handle song upload logic here
    };

    const handleDropimg = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        console.log("file in img");
        // Handle song upload logic here
    };
    const handleimgupload = (event) => {
        const file = event.target.files[0];
        console.log(file);
        // Handle song upload logic here

    };
    function sbm() {
        console.log("clicked");
    }

    const handlesubmit = (event) => {
        event.preventDefault(); // Prevents the form from refreshing the page
        //upload song to your database and get link
        const data = {
            imgUrl: "",
            name: event.target.Name.value,
            instagram: event.target.insta.value
        }
        // console.log(data);
        addnewArtistdb(data).then((success) => {
            console.log(success);
            if (success) {
                window.location.assign("/dashboard/artist")
            }
        })
    }

    return (
        <div className='fixed w-screen bg-gray-200 h-screen'>
            <Header />
            <div className="mt-[7%] w-full flex flex-col items-center justify-center">
                <div className="h-full bg-white p-8 shadow-md rounded-lg flex flex-col items-center justify-center">
                    <div className='text-center mt-2 m-3 text-lg font-semibold text-headingColor mb-5'>New Artist Details</div>
                    <form onSubmit={handlesubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4">
                            <div
                                className={`flex items-center justify-center h-60 border hover:border-blue-100 hover:border-2 hover:shadow-lg ${isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-transparent'
                                    } rounded-lg`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDropimg}
                            >
                                <label className="cursor-pointer w-full h-full flex items-center justify-center">
                                    <input type="file" accept="image/*" id="artistFile" className="hidden w-full h-full" onChange={handleimgupload} />
                                    {isDragging ? 'Drop the file here' : 'Upload Image'}
                                </label>
                            </div>


                        </div>
                        <div className="flex flex-col flex-wrap gap-4">
                            <div className='flex items-center'><label className='w-32'>Artist Name:</label>
                                <input type="text" name='Name' className="border border-gray-300 rounded-lg p-2 w-full" placeholder="Artist Name" required />
                            </div>
                            <div className='flex items-center'><label className='w-32'>Instagram</label>
                                <input type="text" name='insta' className="border border-gray-300 rounded-lg p-2 w-full" placeholder="Instagram" />
                            </div>
                            <div className='flex items-center justify-center'>
                                <button class="submit-button">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default AddnewArtist;

