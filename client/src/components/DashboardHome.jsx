import React from 'react';

import { IoHome } from "react-icons/io5"
import { FaUser, FaHome, FaUsers } from 'react-icons/fa';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonIcon from '@mui/icons-material/Person';
import AlbumIcon from '@mui/icons-material/Album';
import { FaPaintBrush } from 'react-icons/fa';
import { FaGuitar } from 'react-icons/fa';
import { NavLink, Route, Routes } from 'react-router-dom';
import { getAlbums, getArtists, getSongs, getUsers } from '../api';
import { useState, useEffect } from 'react';

// const users = getUsers();


export const DashBoardCard = ({ icon, name, count }) => {
    return (
        <div className='p-4 w-40 gap-3 rounded-md shadow-md bg-blue-300 flex flex-col items-center justify-center text-center hover:scale-105 hover:shadow-lg transition-all duration-300'>
            <p className='text-3xl'>{icon}</p>
            <p className='text-xl font-semibold'>{name}</p>
            <p className='text-xl font-semibold'>{count}</p>
        </div>
    )
}

const DashboardHome = () => {

    const [totalusers, setusers] = useState(0);
    useEffect(() => {
        getUsers()
            .then(result => {
                setusers(result.users.length);
            })
            .catch(error => {
                // Handle any potential errors here
                console.error(error);
            });
    }, []);

    const [totalartists, settotalartists] = useState(0);
    useEffect(() => {
        getArtists()
            .then(result => {
                settotalartists(result.artist.length);
            })
            .catch(error => {
                // Handle any potential errors here
                console.error(error);
            });
    }, []);

    const [totalsongs, settotalsongs] = useState(0);
    useEffect(() => {
        getSongs()
            .then(result => {
                settotalsongs(result.song.length);
            })
            .catch(error => {
                // Handle any potential errors here
                console.error(error);
            });
    }, []);

    const [totalalbum, settotalalbum] = useState(0);
    useEffect(() => {
        getAlbums()
            .then(result => {
                settotalalbum(result.album.length);
            })
            .catch(error => {
                // Handle any potential errors here
                console.error(error);
            });
    }, []);

    return (
        <div className='mt-[175px] w-full p-3 flex items-center justify-evenly flex-wrap gap-3'>
            <NavLink to="/dashboard/user"><DashBoardCard icon={<FaUsers className='text-3xl' />} name={"Users"} count={totalusers} /></NavLink>
            <NavLink to="/dashboard/song"><DashBoardCard icon={<LibraryMusicIcon style={{ fontSize: '1.875rem', lineHeight: '2.25rem' }} />} name={"Songs"} count={totalsongs} /></NavLink>
            <NavLink to="/dashboard/artist"><DashBoardCard icon={<FaGuitar className='text-3xl' />} name={"Artists"} count={totalartists} /></NavLink>
            <NavLink to="/dashboard/album"><DashBoardCard icon={<AlbumIcon className='text-3xl' />} name={"Albums"} count={totalalbum} /></NavLink>
        </div>
    )
}

export default DashboardHome