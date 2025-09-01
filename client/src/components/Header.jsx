import React from 'react';
import { Logo } from '../assets/img';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';
import { FaCrown } from 'react-icons/fa';
import { useStateValue } from '../context/StateProvider';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import { motion } from 'framer-motion';
import { useState } from 'react';


const Header = ({ children }) => {
    const [{ user }, dispatch] = useStateValue();
    const [isMenu, setisMenu] = useState(false);
    const navigate = useNavigate();
    const logout = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem("auth", "false");
        }).catch((e) => { console.log(e) });
        navigate("/login", { replace: true });
    };
    // console.log(user);
    // console.log(user.user.role);
    return (
        <header className='fixed z-50 bg-white top-0 bg-blend-color-burn flex items-center w-full h-[75px] p-4 md:py-2 md:px-6'>
            <NavLink to={'/'} className="flex items-center">
                <img src={Logo} alt='logo' className='w-[3rem]' />
                <h1 className='ml-2 text-blue-600 font-bold text-2xl'>DolBee</h1>
            </NavLink>

            <ul className='flex item-center justify-center ml-5'>
                <li className='mx-5 text-lg'><NavLink to="/home" className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Home</NavLink></li>
                <li className='mx-5 text-lg'><NavLink to="/musics" className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Musics</NavLink></li>
                <li className='mx-5 text-lg'><NavLink to="/contacts" className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>About Us</NavLink></li>
            </ul>
            <div
                onMouseEnter={() => { setisMenu(true) }}
                onMouseLeave={() => { setisMenu(false) }}

                className='flex items-center justify-center ml-auto cursor-pointer gap-2 relative'>
                <img referrerPolicy='no-referrer' src={user?.user?.imageURL} className='flex w-12 min-w-[44px] object-cover rounded-full shadow-md ' />
                <p className='text-textColor text-lg font-semibold'>{user?.user?.name}</p>

                {isMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className='absolute p-4 z-50 top-10 right-0 w-56 bg-white border border-gray-300 rounded shadow-md'>
                        <NavLink to={'/userProfile'} className='block py-2 px-4 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-100'>
                            Profile
                        </NavLink>
                        {
                            user?.user?.role === "admin" && (
                                <>
                                    <NavLink to={'/dashboard'} className='block py-2 px-4 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-100'>
                                        DashBoard
                                    </NavLink>
                                </>
                            )
                        }
                        <NavLink to={'/my-favourites'} className='block py-2 px-4 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-100'>
                            My Favorites
                        </NavLink>

                        <hr className='my-2 border-gray-300' />
                        <p onClick={logout} className='block py-2 px-4 text-base text-red-500 hover:text-red-700 hover:bg-gray-100'>Sign Out</p>
                    </motion.div>
                )}
            </div>
        </header>
    )
}

export default Header