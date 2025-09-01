import React from 'react';
import Header from './Header';
import { Form } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addnewSongdb } from '../api';
import { storage } from '../config/firebase.config';
import { ref } from "firebase/storage"
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import { uploadBytesResumable } from 'firebase/storage';


const Addnewsong = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [songuploded, setsonguploded] = useState(0);
    const [tobeuploadsong, settobeuploadsong] = useState(null);
    const [tobeuploadimg, settobeuploadimg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


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

    const handleDropsong = (event) => {
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

    const handleSongUpload = (event) => {
        const file = event.target.files[0];
        settobeuploadsong(file);
        // handlesongUploadtodb(file);
        // Handle song upload logic here
    };
    const handleimgupload = (event) => {
        const file = event.target.files[0];
        settobeuploadimg(file);
        // console.log(file);
        // Handle song upload logic here
    };

    const onStateChanged = (uploadTask, callback) => {
        uploadTask.on('state_changed', callback);
    };

    const handlesongUploadtodb = async (file) => {
        if (file) {
            try {
                const storageref = ref(storage, file.name);
                await uploadBytes(storageref, file);
                const downloadURL = await getDownloadURL(storageref);
                return downloadURL;
            } catch (error) {
                console.error('Error uploading song:', error);
            }
        }
    };
    const handleimguploadtodb = async (file) => {
        if (file) {
            try {
                const storageref = ref(storage, file.name);
                await uploadBytes(storageref, file);
                const downloadURL = await getDownloadURL(storageref);
                return downloadURL;

            } catch (error) {
                console.error('Error uploading song:', error);
            }
        }
    };

    const handlesubmit = async (event) => {
        event.preventDefault(); // Prevents the form from refreshing the page
        setIsLoading(true);
        //upload song to your database and get link
        const songurl = await handlesongUploadtodb(tobeuploadsong);
        const imgurl = await handleimguploadtodb(tobeuploadimg);
        const data = {
            songUrl: songurl,
            imgUrl: imgurl,
            name: event.target.songName.value,
            artist: event.target.artistName.value,
            musicBy_name: event.target.musicByName.value,
            composedBy_name: event.target.composedByName.value,
            language: event.target.Language.value,
            lyrics: event.target.Lyrics.value,
            category: event.target.CategoryName.value,
        }
        // console.log(data);
        addnewSongdb(data).then((success) => {
            console.log(success);
            if (success) {
                window.location.assign("/dashboard/song")
            }
        })
    }

    return (
        <div className='w-screen bg-gray-200 h-screen'>
            <Header />
            <div className="w-full flex flex-col items-center justify-center">
                <div className="h-full bg-white p-8 shadow-md rounded-lg flex flex-col items-center justify-center">
                    <div className='text-center mt-2 m-3 text-lg font-semibold text-headingColor mb-5'>New Song Details</div>
                    <form onSubmit={handlesubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-4">
                            <div
                                className={`flex items-center justify-center h-60 border hover:border-blue-100 hover:border-2 hover:shadow-lg ${isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-transparent'
                                    } rounded-lg`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDropsong}
                            >
                                <label className="cursor-pointer w-full h-full flex items-center justify-center">
                                    <input
                                        type="file"
                                        accept="audio/*"
                                        id="songFile"
                                        className="ml-3"
                                        onChange={handleSongUpload}
                                    />
                                    {isDragging ? 'Drop the file here' : 'Upload Song'}
                                </label>
                            </div>


                            <div
                                className={`flex items-center justify-center h-60 border hover:border-blue-100 hover:border-2 hover:shadow-lg ${isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-transparent'
                                    } rounded-lg`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDropimg}
                            >
                                <label className="cursor-pointer w-full h-full flex items-center justify-center ml-3">
                                    <input type="file" accept="image/*" id="songFile" className="text-center w-full " onChange={handleimgupload} />
                                    {isDragging ? 'Drop the file here' : 'Upload Image'}
                                </label>
                            </div>


                        </div>
                        <div className="flex flex-col flex-wrap gap-4">
                            <div className='flex items-center'><label className='w-32'>Song Name:</label>
                                <input type="text" name='songName' className="border border-gray-300 rounded-lg p-2 w-full" placeholder="Song Name" required />
                            </div>
                            <div className='flex items-center'><label className='w-32'>Artist Name:</label>
                                <input type="text" name='artistName' className="border border-gray-300 rounded-lg p-2 w-full" placeholder="Artist Name" required />
                            </div>
                            <div className='flex items-center'><label className='w-32'>Music By:</label>
                                <input type="text" name='musicByName' className="border border-gray-300 rounded-lg p-2 w-full" placeholder="Music By" />
                            </div>
                            <div className='flex items-center'><label className='w-32'>Composed By :</label>
                                <input type="text" name='composedByName' className="border border-gray-300 rounded-lg p-2 w-full" placeholder="Composed By" />
                            </div>
                            <div className='flex items-center'><label className='w-32'>Language:</label>
                                <input type="text" name='Language' className="border border-gray-300 rounded-lg p-2 w-full" placeholder="Language" />
                            </div>
                            <div className='flex items-center'><label className='w-32'>Lyrics:</label>
                                <textarea name='Lyrics' className="border border-gray-300 rounded-lg p-2 w-full" placeholder="Lyrics" />
                            </div>
                            <div className='flex items-center'>
                                <label htmlFor="category" className="block mb-1 w-32">Category:</label>
                                <select id="category" name='CategoryName' className="border border-gray-300 rounded-lg p-2 w-full">
                                    <option>IMP1</option>
                                    <option>IMP2</option>
                                    <option>IMP3</option>
                                </select>
                            </div>
                            <div className='flex items-center justify-center'>
                                {isLoading && (
                                    <div className="flex items-center justify-center">
                                        {/* Replace this with your preferred loading animation */}
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-solid" />
                                    </div>
                                )}
                                <div className='flex items-center justify-center w-full'>
                                    <button class="submit-button">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Addnewsong;

