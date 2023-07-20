import {initializeApp} from "firebase/app";
import {FirebaseOptions} from "@firebase/app";

export const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyCFTG6bkU3pUKkhbE1hVCnRLVYf9x6FCNk",
    authDomain: "fsse2305-project-david.firebaseapp.com",
    projectId: "fsse2305-project-david",
    storageBucket: "fsse2305-project-david.appspot.com",
    messagingSenderId: "338419221490",
    appId: "1:338419221490:web:40fce8ce0466197455216b",
    measurementId: "G-Q7Y8CRC56J"
};

const app = initializeApp(firebaseConfig);