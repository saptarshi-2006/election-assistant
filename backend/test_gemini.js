const API_KEY = "AIzaSyB--Zmiqd47YuoPu7oy6Hw8AKTWFLrB_do";
const MODELS = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.5-flash-latest"];

async function test() {
  for (const model of MODELS) {
    console.log(`Testing model: ${model}`);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: "hi" }] }] })
      });
      const data = await response.json();
      if (data.error) {
        console.error(`Error for ${model}:`, data.error.message);
      } else {
        console.log(`Success for ${model}!`);
      }
    } catch (err) {
      console.error(`Request failed for ${model}`, err);
    }
  }
}
test();
