import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form[0].value;
  const password = form[1].value;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    // ✅ save user
    localStorage.setItem("user", JSON.stringify(res.user));

    alert("Login successful");

    // ✅ redirect logic
    const redirect = localStorage.getItem("redirectAfterLogin");

    if (redirect) {
      localStorage.removeItem("redirectAfterLogin");
      window.location.href = redirect;
    } else {
      window.location.href = "index.html";
    }

  } catch (err) {
    alert(err.message);
  }
});