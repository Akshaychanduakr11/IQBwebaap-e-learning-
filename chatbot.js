let chatHistory = [];

const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Add message to chat
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-message" : "bot-message";
  msg.innerText = text;
  chatBox.appendChild(msg);

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Show typing
function showTyping() {
  const typing = document.createElement("div");
  typing.className = "bot-message";
  typing.id = "typing";
  typing.innerText = "Typing...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Remove typing
function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

// Send message
async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  // show user message
  addMessage(message, "user");
  input.value = "";

  // save to history
  chatHistory.push({
    role: "user",
    parts: [{ text: message }]
  });

  showTyping();

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ history: chatHistory })
    });

    const data = await res.json();

    removeTyping();

    const reply = data.reply || "No response";

    // show bot reply
    addMessage(reply, "bot");

    // save bot reply
    chatHistory.push({
      role: "model",
      parts: [{ text: reply }]
    });

  } catch (err) {
    removeTyping();
    addMessage("❌ Error connecting to AI", "bot");
  }
}

// Click send
sendBtn.addEventListener("click", sendMessage);

// Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
function checkLogin() {
  const user = localStorage.getItem("user");

  if (!user) {
    alert("⚠️ Please login first");
    window.location.href = "Signin.html";
    return false;
  }

  return true;
}
body: JSON.stringify({
  history: chatHistory,
  userName: "Akshay" // or dynamic later
})