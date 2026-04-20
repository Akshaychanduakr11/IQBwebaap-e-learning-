// Default Question Data
const questions = [
  { text: "What is Newton’s second law?", topic: "Science", difficulty: "Medium" },
  { text: "Solve: 12 × 8 ÷ 4", topic: "Math", difficulty: "Easy" },
  { text: "Who discovered electricity?", topic: "Science", difficulty: "Easy" },
  { text: "Explain World War 2 in short.", topic: "History", difficulty: "Hard" }
];

// Render questions
function renderQuestions(list) {
  const container = document.getElementById("questionList");
  container.innerHTML = "";

  list.forEach(q => {
    container.innerHTML += `
      <div class="questionCard">
        <h3>${q.text}</h3>
        <p><b>Topic:</b> ${q.topic} • <b>Difficulty:</b> ${q.difficulty}</p>
      </div>
    `;
  });
}

renderQuestions(questions);

// Filters
document.getElementById("searchBar").addEventListener("input", filterQuestions);
document.getElementById("topicFilter").addEventListener("change", filterQuestions);
document.getElementById("difficultyFilter").addEventListener("change", filterQuestions);

function filterQuestions() {
  const search = document.getElementById("searchBar").value.toLowerCase();
  const topic = document.getElementById("topicFilter").value;
  const diff = document.getElementById("difficultyFilter").value;

  const filtered = questions.filter(q => 
    q.text.toLowerCase().includes(search) &&
    (topic === "all" || q.topic === topic) &&
    (diff === "all" || q.difficulty === diff)
  );

  renderQuestions(filtered);
}

// Fake AI Question Generator
document.getElementById("generateAI").addEventListener("click", () => {
  const newQ = {
    text: "AI Prediction: " + generateRandomQuestion(),
    topic: ["Math", "Science", "History"][Math.floor(Math.random() * 3)],
    difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)]
  };

  questions.push(newQ);
  renderQuestions(questions);
});

// AI Random Generator Function
function generateRandomQuestion() {
  const patterns = [
    "Explain the importance of ___ in simple terms.",
    "What is the formula of ___?",
    "List any three advantages of ___.",
    "Define ___ with an example.",
    "Why is ___ important in real life?"
  ];

  const fillers = ["Photosynthesis", "Pythagoras Theorem", "Gravity", "Electricity", "Democracy"];

  return patterns[Math.floor(Math.random() * patterns.length)]
    .replace("___", fillers[Math.floor(Math.random() * fillers.length)]);
}

// Title Animation
const title = document.getElementById("animatedTitle");
let i = 0;
let text = "AI Based Question Bank";

function typeEffect() {
  title.innerText = text.slice(0, i++);
  if (i <= text.length) setTimeout(typeEffect, 80);
}
typeEffect();
