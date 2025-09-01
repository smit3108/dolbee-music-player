import axios from "axios";
import { json } from "react-router-dom";
const baseURL = "http://localhost:4000/";
//it will take the token and now it will give data from the database from the server side
export const validatUser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`, {
            headers:
            {
                Authorization: "Bearer " + token,
            }
        });
        return res.data;
    } catch (error) {

    }
}

export const getUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}api/users/getAll`, {});
        return res.data;

    } catch (error) {
    }
}

export const deleteUser = async (id) => {
    try {
        const res = await axios.get(`${baseURL}api/users/delete/${id}`, {});
        return res.data;
    } catch (error) {
    }
}

export const updateUser = async (id, body) => {
    try {
        // console.log(body);
        const res = await axios.put(`${baseURL}api/users/update/${id}`, body);
        return res.data;
    } catch (error) {

    }
}




//artist related
export const getArtists = async () => {
    try {
        const res = await axios.get(`${baseURL}api/artist/getAll`, {});
        return res.data;
    } catch (error) {
    }
}
export const deleteArtist = async (id) => {
    try {
        const res = await axios.get(`${baseURL}api/artist/delete/${id}`, {});
        return res.data;
    } catch (error) {

    }
}
export const addnewArtistdb = async (data) => {
    try {
        const res = await axios.post(`${baseURL}api/artist/save`, data);
        return res.data.success;
    } catch (error) {

    }
}

//song related
export const getonesong = async (id) => {
    try {
        const res = await axios.get(`${baseURL}api/song/getOne/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
}
export const getSongs = async () => {
    try {
        const res = await axios.get(`${baseURL}api/song/getAll`, {});
        return res.data;
    } catch (error) {

    }
}
export const deleteSong = async (id) => {
    try {
        const res = await axios.get(`${baseURL}api/song/delete/${id}`, {});
        return res.data;
    } catch (error) {

    }
}
//adding new song 
export const addnewSongdb = async (data) => {
    try {
        const res = await axios.post(`${baseURL}api/song/save`, data);
        return res.data.success;
    } catch (error) {

    }
}
export const addfav = async (song_id, user_id) => {
    try {
        const data = {
            songid: song_id,
            userid: user_id
        }
        const res = await axios.put(`${baseURL}api/users/addfav`, data);
        return res.data.success;
    } catch (error) {

    }
}
export const getfav = async (body) => {
    try {
        const res = await axios.get(`${baseURL}api/users/getfav/${body}`);
        return res.data;
    } catch (error) {
    }
}



//Album related
export const getAlbums = async () => {
    try {
        const res = await axios.get(`${baseURL}api/album/getAll`, {});
        return res.data;
    } catch (error) {

    }
}

export const deleteAlbum = async (id) => {
    try {
        const res = await axios.get(`${baseURL}api/album/delete/${id}`, {});
        return res.data;
    } catch (error) {

    }
}

export const addnewalbumdb = async (data) => {
    try {
        const res = await axios.post(`${baseURL}api/album/save`, data);
        return res.data.success;
    } catch (error) {

    }
}