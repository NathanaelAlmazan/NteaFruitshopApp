// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9LFXAP9GbO4nZHS1LMRSbmQ6yohV1m98",
  authDomain: "n-tea-fruitshop.firebaseapp.com",
  projectId: "n-tea-fruitshop",
  storageBucket: "n-tea-fruitshop.appspot.com",
  messagingSenderId: "535084161061",
  appId: "1:535084161061:web:0f83b1bc52a0832178c7cc",
  measurementId: "G-C7FLB1JYGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);