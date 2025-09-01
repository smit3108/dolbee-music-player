import { getApp, getApps, initializeApp } from 'firebase/app'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    // for security
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_API_KEY_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_API_KEY_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_API_KEY_MESSAGIN_ID,
    appId: process.env.REACT_APP_FIREBASE_API_KEY_API_ID
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage }
