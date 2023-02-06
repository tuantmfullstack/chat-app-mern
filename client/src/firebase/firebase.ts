import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCScscEGtXnlM5dB1iI_G6YPUNszKsUJWs',
  authDomain: 'chat-app-mern-412dd.firebaseapp.com',
  projectId: 'chat-app-mern-412dd',
  storageBucket: 'chat-app-mern-412dd.appspot.com',
  messagingSenderId: '809054707261',
  appId: '1:809054707261:web:dd3c62d6356c6e8e955454',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
