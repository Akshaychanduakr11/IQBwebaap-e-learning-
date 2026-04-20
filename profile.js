const firebaseConfig = {
  apiKey: "AIzaSyAxFNTuFKovt-wMx_pp30umcMrRBF1eqL4",
  authDomain: "questionquerybank.firebaseapp.com",
  projectId: "questionquerybank",
  storageBucket: "questionquerybank.firebasestorage.app",
  messagingSenderId: "314353203003",
  appId: "1:314353203003:web:97c3644ae4b605bff7a91e",
  measurementId: "G-PEP842KK9L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore and Storage references
const db = firebase.firestore();
const storage = firebase.storage();

const fields = [
  "name", "headline", "dob", "education", "university",
  "skills", "experience", "bio", "contact", "location"
];

// Load saved data
window.onload = function () {
  fields.forEach(field => {
    const savedValue = localStorage.getItem(field);
    if (savedValue) document.getElementById(field).textContent = savedValue;
  });

  const savedPic = localStorage.getItem("profilePic");
  const savedBanner = localStorage.getItem("bannerImg");

  if (savedPic) document.getElementById("profilePic").src = savedPic;
  if (savedBanner) document.getElementById("bannerImg").src = savedBanner;
};

// Edit / Save Toggle
document.getElementById("editBtn").addEventListener("click", function () {
  if (this.textContent === "Edit Profile") {
    makeEditable();
    this.textContent = "Save Profile";
  } else {
    saveProfile();
    this.textContent = "Edit Profile";
  }
});

function makeEditable() {
  fields.forEach(field => {
    const element = document.getElementById(field);
    const currentValue = element.textContent.replace(/^.:\s/, "");
    const isBio = field === "bio";
    const input = document.createElement(isBio ? "textarea" : "input");
    input.type = "text";
    input.value = currentValue;
    input.id = field;
    input.classList.add("edit-input");
    element.replaceWith(input);
  });
}

function saveProfile() {
  fields.forEach(field => {
    const input = document.getElementById(field);
    const value = input.value.trim();
    localStorage.setItem(field, value);

    const tag = field === "name" ? "h2" : "p";
    const element = document.createElement(tag);
    element.id = field;
    element.textContent = formatField(field, value);
    input.replaceWith(element);
  });
}

function formatField(field, value) {
  const map = {
    dob: "DOB",
    education: "Education",
    university: "University",
    skills: "Skills",
    experience: "Experience",
    bio: "Bio",
    contact: "Contact",
    location: "Location"
  };
  return map[field] ? `${map[field]}: ${value}` : value;
}

// Profile Picture Upload
document.getElementById("profilePic").addEventListener("click", () => {
  document.getElementById("uploadPic").click();
});

document.getElementById("uploadPic").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profilePic").src = e.target.result;
      localStorage.setItem("profilePic", e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// Banner Upload
document.getElementById("changeBanner").addEventListener("click", () => {
  document.getElementById("uploadBanner").click();
});

document.getElementById("uploadBanner").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("bannerImg").src = e.target.result;
      localStorage.setItem("bannerImg", e.target.result);
    };
    reader.readAsDataURL(file);
  }
});