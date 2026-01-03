const { GoogleGenerativeAI } = require("@google/generative-ai");

// PASTE YOUR KEY DIRECTLY INSIDE THE QUOTES BELOW:
const API_KEY = "AIzaSyACQ2DhpqP26OBJ4PPC1HH8CnbgHcIJExg"; 

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run() {
  try {
    console.log("Testing Key directly...");
    const result = await model.generateContent("Explain React in one sentence.");
    console.log("✅ SUCCESS:", result.response.text());
  } catch (error) {
    console.log("❌ FAILED. Error details:");
    console.log(error.message);
  }
}

run();