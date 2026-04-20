import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 YOUR FIREBASE CONFIG (must match yours)
const firebaseConfig = {
  apiKey: "AIzaSyB8WyC3hnjxzXkX0hX6hZ_h5c7BNmuO_n8",
  authDomain: "iqbwebapp.firebaseapp.com",
  projectId: "iqbwebapp",
  storageBucket: "iqbwebapp.firebasestorage.app",
  messagingSenderId: "923239157693",
  appId: "1:923239157693:web:1431a97a17f357fd8fccd4"
};

export const auth = getAuth(app);

// ================= LOGIN =================
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("user", JSON.stringify(userCred.user));

      alert("Login Success");

      window.location.href = "ChatBot.html";

    } catch (err) {
      alert("Login Failed: " + err.message);
    }
  });
}