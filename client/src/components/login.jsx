import React, { useState, useEffect } from 'react';
import { FcAbout, FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { validatUser } from '../api';
import { LoginBg } from '../assets/video'

const Login = ({ setAuth }) => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const [{ user }, dispatch] = useStateValue();

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            if (userCred) {
                setAuth(true);
                window.localStorage.setItem('auth', 'true');

                firebaseAuth.onAuthStateChanged((userCred) => {
                    if (userCred) {
                        navigate('/', { replace: true });
                        userCred.getIdToken().then((token) => {
                            validatUser(token).then((data) => {
                                dispatch({
                                    type: actionType.SET_USER,
                                    user: data,
                                })
                            })
                        });
                    } else {
                        setAuth(false);
                        dispatch({
                            type: actionType.SET_USER,
                            user: null,
                        })
                        navigate('/login');
                    }
                });
            }
        });
    };

    useEffect(() => {
        if (window.localStorage.getItem('auth') === 'true') {
            navigate('/', { replace: true });
        }
    }, []);
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="bg-blue-500 text-white rounded-md p-8">
                <h1 className="text-2xl font-bold mb-6">Welcome to DolBee</h1>
                <p className="text-gray-200 mb-8">Sign in to get started</p>
                <button
                    className="w-[100%] flex items-center justify-center bg-white text-blue-500 rounded-md px-4 py-3 hover:bg-blue-100 transition-colors duration-300"
                    onClick={loginWithGoogle}
                >
                    <FcGoogle className="text-xl mr-2" />
                    Sign in with Google
                </button>
            </div>
        </div >

    );
};

export default Login;
