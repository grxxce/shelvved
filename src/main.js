import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from "./router"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk2JANZl6gI7cR_jTttV6x7EoB-5O0xF8",
  authDomain: "vue-59288.firebaseapp.com",
  projectId: "vue-59288",
  storageBucket: "vue-59288.appspot.com",
  messagingSenderId: "35737005917",
  appId: "1:35737005917:web:de4c27fe56f5e5852dc2b4",
  measurementId: "G-CQDK3LCE3J"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = createApp(App)
app.use(router)
app.mount('#app')