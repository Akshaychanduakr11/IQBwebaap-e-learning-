import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

console.log("Admin Loaded");

// ➕ ADD POST
window.addPost = async function () {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Fill all fields");
    return;
  }

  try {
    await addDoc(collection(db, "posts"), {
      title,
      content,
      time: Date.now()
    });

    alert("Post Added ✅");
    loadPosts();

  } catch (err) {
    alert(err.message);
  }
};

// 📄 LOAD POSTS
window.loadData = async function () {
  const list = document.getElementById("dataList");

  const snap = await getDocs(collection(db, "posts"));

  list.innerHTML = "";

  snap.forEach((d) => {
    const data = d.data();

    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.content}</p>
      <button onclick="deletePost('${d.id}')">Delete</button>
    `;

    list.appendChild(div);
  });
}

// 🗑 DELETE
window.deletePost = async function (id) {
  await deleteDoc(doc(db, "posts", id));
  loadPosts();
};

loadData();