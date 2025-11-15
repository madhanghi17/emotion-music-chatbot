const API_KEY = "PASTE_YOUR_GEMINI_KEY_HERE";

async function sendMessage() {
    let input = document.getElementById("userInput");
    let message = input.value.trim();

    if (message === "") return;

    appendMessage("You", message, "user");
    input.value = "";

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );

    let data = await response.json();
    let reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠ No response";

    appendMessage("Bot", reply, "bot");
}

function appendMessage(sender, text, cls) {
    let box = document.getElementById("chatbox");
    box.innerHTML += `<div class="${cls}"><b>${sender}:</b> ${text}</div>`;
    box.scrollTop = box.scrollHeight;
}
