import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'



initializeApp ({
    apiKey: "AIzaSyA6pScmso49PnG9HOZkS3Zgth_EnPUFXnk",
    authDomain: "todo-3b6ed.firebaseapp.com",
    projectId: "todo-3b6ed",
    storageBucket: "todo-3b6ed.appspot.com",
    messagingSenderId: "340007987218",
    appId: "1:340007987218:web:25d04ddbb8b9efc7bd50cb",
    measurementId: "G-KH6C24SFR0"
})


export const auth = getAuth()
export const db = getFirestore()



