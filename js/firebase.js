import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB8WyC3hnjxzXkX0hX6hZ_h5c7BNmuO_n8",
  authDomain: "iqbwebapp.firebaseapp.com",
  projectId: "iqbwebapp",
  storageBucket: "iqbwebapp.firebasestorage.app",
  messagingSenderId: "923239157693",
  appId: "1:923239157693:web:1431a97a17f357fd8fccd4"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };