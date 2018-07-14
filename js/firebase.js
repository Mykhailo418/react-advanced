import { initializeApp } from 'firebase/app';
import 'firebase/auth';

export const app_name = 'react-advanced-fb021';

export const config = {
    apiKey: "AIzaSyBa2tLDBA04CbecLig0bgJAS1w1MY8QVqo",
    authDomain: `${app_name}.firebaseapp.com`,
    databaseURL: `https://${app_name}.firebaseio.com`,
    projectId: app_name,
    storageBucket: `${app_name}.appspot.com`,
    messagingSenderId: "268012363840"
 };
initializeApp(config);