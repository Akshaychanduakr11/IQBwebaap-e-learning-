import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB8WyC3hnjxzXkX0hX6hZ_h5c7BNmuO_n8",
  authDomain: "iqbwebapp.firebaseapp.com",
  projectId: "iqbwebapp",
  storageBucket: "iqbwebapp.firebasestorage.app",
  messagingSenderId: "923239157693",
  appId: "1:923239157693:web:1431a97a17f357fd8fccd4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    await addDoc(collection(db, "contactMessages"), {
      name,
      email,
      message,
      createdAt: serverTimestamp()
    });

    document.getElementById("successMsg").innerText = "Message sent successfully!";
    this.reset();

  } catch (error) {
    console.error(error);
    document.getElementById("successMsg").innerText = "Error sending message!";
  }
});