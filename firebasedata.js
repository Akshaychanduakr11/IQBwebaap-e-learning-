import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadPosts() {
  console.log("LOADING POSTS...");

  const container = document.getElementById("postsContainer");

  console.log("Container:", container);

  const snapshot = await getDocs(collection(db, "posts"));

  console.log("TOTAL POSTS:", snapshot.size);

  snapshot.forEach(doc => {
    const data = doc.data();

    console.log("DATA:", data);

    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.content}</p>
    `;

    container.appendChild(div);
  });
}

loadPosts();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".update-card").forEach(card => {
  observer.observe(card);
});