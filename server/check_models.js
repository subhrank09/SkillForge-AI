require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    console.log("Checking available models...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    // We just need the SDK instance, but let's try the listing method:
    
    // Note: The SDK doesn't have a direct "listModels" helper in all versions, 
    // so we will test the most common specific names directly.
    
    const candidates = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro",
        "gemini-1.0-pro",
        "gemini-pro"
    ];

    for (const modelName of candidates) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            console.log(`✅ SUCCESS: '${modelName}' is working!`);
            return; // Stop at the first working one
        } catch (e) {
            console.log(`❌ '${modelName}' failed: ${e.message.split('[')[0]}`); // simplify error
        }
    }
    console.log("😭 No models worked. Check your API Key permissions.");

  } catch (error) {
    console.error("Error:", error);
  }
}

listModels();