import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from "firebase/database";


const firebaseConfig = {

   apiKey: "AIzaSyAaY5glI7jWUHDIkH5I3wYtikya-WPkqzg",
  
   authDomain: "labsfisicaunicauca.firebaseapp.com",
  
   databaseURL: "https://labsfisicaunicauca.firebaseio.com",
  
   projectId: "labsfisicaunicauca",
  
   storageBucket: "labsfisicaunicauca.appspot.com",
  
   messagingSenderId: "135637098822",
  
   appId: "1:135637098822:web:c32ee44f980fc57c"

  };

const app = initializeApp(firebaseConfig, 'DanyDays');

// Get a reference to the database service
const database = ref(getDatabase(app));

@Injectable({
  providedIn: 'root'
})
export class ServiceRealTimeService {

  getDatabase(){
    return database;
  }



  constructor() { }
}
