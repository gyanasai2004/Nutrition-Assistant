import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAH13PfELSht7iahjdm3fJ8arL5cHvl4bo",
  authDomain: "nutrition-assistant-35e3c.firebaseapp.com",
  projectId: "nutrition-assistant-35e3c",
  storageBucket: "nutrition-assistant-35e3c.firebasestorage.app",
  messagingSenderId: "506496532586",
  appId: "1:506496532586:web:bf3ae8b49de11b5f7dca13",
  measurementId: "G-GZCK2JJF05",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;