import React from 'react'
import Header from './Header'
import { NavLink } from 'react-router-dom'
import { IoHome } from "react-icons/io5"
import { FaUser, FaHome, FaUsers, FaMusic } from 'react-icons/fa';
import { isActiveStylesdashboard, isNotActiveStylesdashboard } from '../utils/styles'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonIcon from '@mui/icons-material/Person';
import AlbumIcon from '@mui/icons-material/Album';
import { FaPaintBrush } from 'react-icons/fa';
import { FaGuitar } from 'react-icons/fa';
import { DashboardHome, Dashboardusers, Dashboardartist, DashboardAlbum, Dashboardsong, Addnewsong, AddnewArtist } from '../components';
import { Route, Routes } from 'react-router-dom';
import AddnewAlbum from './AddnewAlbum';
import SongSlideBar from './Slidebar';

const SongIcon = () => <LibraryMusicIcon />;
const AlbumsIcon = () => <AlbumIcon />;

const Dashboard = () => {
    return (
        <div className='w-full h-auto flex flex-col items-center justify-center'>
            <Header />
            <div className=' mt-[75px] w-[60%] my-2 p-2 flex items-center justify-evenly'>
                <NavLink to="/dashboard/home" className={({ isActive }) => isActive ? isActiveStylesdashboard : isNotActiveStylesdashboard}>
                    <div className='flex flex-col items-center justify-center'>
                        <FaHome className='text-2xl' /><p>Home</p>
                    </div>
                </NavLink>

                <NavLink to="/dashboard/user" className={({ isActive }) => isActive ? isActiveStylesdashboard : isNotActiveStylesdashboard}>
                    <div className='flex flex-col items-center justify-center'>
                        <FaUsers className='text-2xl' /> <p>Users</p>
                    </div>
                </NavLink>
                <NavLink to="/dashboard/song" className={({ isActive }) => isActive ? isActiveStylesdashboard : isNotActiveStylesdashboard}>
                    <div className='flex flex-col items-center justify-center'>
                        <SongIcon className='text-2xl' /> <p>Songs</p>
                    </div>
                </NavLink>
                <NavLink to="/dashboard/artist" className={({ isActive }) => isActive ? isActiveStylesdashboard : isNotActiveStylesdashboard}>
                    <div className='flex flex-col items-center justify-center'>
                        <FaGuitar className='text-2xl' /> <p>Artists</p>
                    </div>
                </NavLink>
                <NavLink to="/dashboard/album" className={({ isActive }) => isActive ? isActiveStylesdashboard : isNotActiveStylesdashboard}>
                    <div className='flex flex-col items-center justify-center'>
                        <AlbumIcon className='text-2xl' /> <p>Albums</p>
                    </div>
                </NavLink>

            </div>
            <div className=' w-full p-3 h-screen overflow-auto pb-[75px]'>
                <Routes>
                    <Route path='/*' element={<DashboardHome />} />
                    <Route path='/user' element={<Dashboardusers />} />
                    <Route path='/song' element={<Dashboardsong />} />
                    <Route path='/artist' element={<Dashboardartist />} />
                    <Route path='/album' element={<DashboardAlbum />} />
                    <Route path='/add/song' element={<Addnewsong />} />
                    <Route path='/add/artist' element={<AddnewArtist />} />
                    <Route path='/add/album' element={<AddnewAlbum />} />
                </Routes>
            </div>
            <SongSlideBar> </SongSlideBar>
        </div>
    )
}

export default Dashboard