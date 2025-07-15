import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCRVlm4VDW-2KXzTIumObvMfvYa8puxeKE",
  authDomain: "oceans-restaurant-369ce.firebaseapp.com",
  projectId: "oceans-restaurant-369ce",
  storageBucket: "oceans-restaurant-369ce.firebasestorage.app",
  messagingSenderId: "767502328224",
  appId: "1:767502328224:web:f951d78dbe0a662f9244c5"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);