document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Generate Floating Cubes (The "Puzzle Structure") ---
    const cubeContainer = document.getElementById('cubeContainer');
    
    // Number of cubes to generate
    const cubeCount = 15;

    for (let i = 0; i < cubeCount; i++) {
        const cube = document.createElement('div');
        cube.classList.add('cube');
        
        // Randomize Size (between 20px and 100px)
        const size = Math.random() * 80 + 20;
        cube.style.width = `${size}px`;
        cube.style.height = `${size}px`;
        
        // Randomize Position (0% to 100% of screen width)
        cube.style.left = `${Math.random() * 100}%`;
        
        // Randomize Animation Duration (slower or faster)
        // Between 10s and 25s
        const duration = Math.random() * 15 + 10;
        cube.style.animationDuration = `${duration}s`;
        
        // Randomize Delay (so they don't all start at once)
        cube.style.animationDelay = `${Math.random() * 10}s`;

        cubeContainer.appendChild(cube);
    }

    // --- 2. Typewriter Effect (Existing logic) ---
    const textElement = document.getElementById('typewriter');
    const textToType = "Type your question and dive into your concise answer.";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            textElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50); 
        }
    }
    setTimeout(typeWriter, 500);

    // --- 3. Search Bar Logic (Existing) ---
    const searchBtn = document.getElementById("searchBtn");
    const userInput = document.getElementById("userInput");

    function goSearch() {
    const query = userInput.value.trim();

    if (!query) {
        alert("Please enter something");
        return;
    }

    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    // Best method
    window.location.replace(url);
}

    if(searchBtn) searchBtn.addEventListener("click", goSearch);
    if(userInput) userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") goSearch();
    });
});
// feedback section //
function handleSubmit() {
    const email = document.getElementById('feedbackEmail').value;
    const text = document.getElementById('feedbackText').value;
    const formContainer = document.getElementById('feedbackFormContainer');
    const successMsg = document.getElementById('successMessage');

    // Simple Validation
    if (email === "" || text === "") {
        alert("Please fill in all fields before submitting.");
        return;
    }

    // Animation: Fade out form and fade in success
    formContainer.style.opacity = "0";
    
    setTimeout(() => {
        formContainer.style.display = "none";
        successMsg.style.display = "block";
        
        // Log for testing
        console.log("Feedback Received:", { email, text });
    }, 400);
}

function resetForm() {
    const formContainer = document.getElementById('feedbackFormContainer');
    const successMsg = document.getElementById('successMessage');
    
    successMsg.style.display = "none";
    formContainer.style.display = "block";
    formContainer.style.opacity = "1";
    
    // Clear inputs
    document.getElementById('feedbackEmail').value = "";
    document.getElementById('feedbackText').value = "";
}
function checkLogin() {
  const user = localStorage.getItem("user");

  if (!user) {
    alert("⚠️ Please login first");
    window.location.href = "Signin.html";
    return false;
  }

  return true;
}

//================= about.js =================
const fadeElements = document.querySelectorAll('.intro, .card, .info-section, .member');

function showOnScroll() {
  fadeElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 50) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'all 0.8s ease';
    }
  });
}

window.addEventListener('scroll', showOnScroll);
window.addEventListener('load', showOnScroll);

// ================= contact.js =================
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  document.getElementById("successMsg").innerText = "Message sent successfully!";

  this.reset();
});
