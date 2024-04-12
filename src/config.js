
import { initializeApp } from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDtW5AYEjpw7DNTJuJtaLhRYpz6zfCzIck",
  authDomain: "auth-fbb2a.firebaseapp.com",
  projectId: "auth-fbb2a",
  storageBucket: "auth-fbb2a.appspot.com",
  messagingSenderId: "404540198736",
  appId: "1:404540198736:web:560fc551e311e909b2a655",
  measurementId: "G-0K5JJXLLVJ"
};
const app = initializeApp(firebaseConfig);

export {app};
