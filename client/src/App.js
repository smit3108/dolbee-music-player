import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login, Contact, Premium, Dashboard } from "./components";
import { app } from "./config/firebase.config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
//to maintain animation and all the things
import { AnimatePresence } from 'framer-motion';
import { getfav, validatUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import AddNewSong from "./components/Addnewsong";
import AddnewArtist from "./components/AddnewArtist";


const App = () => {
    const firebaseauth = getAuth(app);
    const navigate = useNavigate();

    const [{ user }, dispatch] = useStateValue();

    const [Auth, setAuth] = useState(false || window.localStorage.getItem("auth") === true)
    // it takes 2 parameter 1 function 2 dependency
    useEffect(() => {
        firebaseauth.onAuthStateChanged((userCred) => {
            // console.log(userCred);
            if (userCred) {
                userCred.getIdToken().then((token) => {
                    // console.log(token);
                    validatUser(token).then((data) => {
                        // console.log(data);
                        dispatch({
                            type: actionType.SET_USER,
                            user: data,
                        });
                    })
                })
            }
            else {
                setAuth(false);
                window.localStorage.setItem("auth", "false");
                dispatch({
                    type: actionType.SET_USER,
                    user: null,
                });
                navigate("/login");
            }
        })
    }, [])

    return (
        <AnimatePresence mode="wait">
            <div className='w-screen h-screen'>
                <Routes>
                    <Route path='/login' element={<Login setAuth={setAuth} />} />
                    <Route path='/contacts' element={<Contact />} />
                    <Route path='/premium' element={<Premium />} />
                    <Route path='/dashboard/*' element={<Dashboard />} />
                    <Route path='/*' element={<Home />} />
                </Routes>
            </div>
        </AnimatePresence>
    )
}
export default App