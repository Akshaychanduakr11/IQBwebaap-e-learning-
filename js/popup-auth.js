import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const popup = document.getElementById("popup");

// show popup
setTimeout(() => {
  if (!localStorage.getItem("user")) {
    popup.style.display = "flex";
  }
}, 5000);

// LOGIN
document.addEventListener("click", async (e) => {
  if (e.target.id === "loginBtn") {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);

      localStorage.setItem("user", res.user.uid);

      popup.style.display = "none";

      alert("Login successful!");
    } catch (err) {
      alert(err.message);
    }
  }

  // REGISTER
  if (e.target.id === "registerBtn") {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);

      localStorage.setItem("user", res.user.uid);

      popup.style.display = "none";

      alert("Account created!");
    } catch (err) {
      alert(err.message);
    }
  }
});