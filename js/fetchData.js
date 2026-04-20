import { db } from "./firebase.js";

import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

console.log("Realtime Fetch Loaded");

const container = document.getElementById("postsContainer");

if (!container) {
  console.log("Container not found");
}

// 🔥 REALTIME LISTENER
onSnapshot(collection(db, "posts"), (snapshot) => {
  console.log("Live update:", snapshot.size);

  container.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();

    container.innerHTML += `
      <div class="post-card">
        <h3>${data.title}</h3>
        <p>${data.content}</p>
      </div>
    `;
  });
});