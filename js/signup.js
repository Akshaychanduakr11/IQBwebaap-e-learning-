import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form[1].value;
  const password = form[2].value;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    localStorage.setItem("user", JSON.stringify(res.user));

    alert("Account created");

    window.location.href = "index.html";

  } catch (err) {
    alert(err.message);
  }
});