import Groq from "groq-sdk";

// Initialize Groq Client
// 🔴 IMPORTANT: Replace with your actual API Key or use process.env.VITE_GROQ_API_KEY
const groq = new Groq({ 
    apiKey: import.meta.env.VITE_GROQ_API_KEY, 
    dangerouslyAllowBrowser: true // Required for frontend-only usage
});

// --- PROMPTS FOR EACH GAME ---
const GAME_PROMPTS = {
    // 1. Glitch Hunt
    glitch: `Generate a single Javascript code snippet (max 5 lines) that contains a subtle logic bug. 
             Return ONLY valid JSON with this structure: 
             { 
               "code": "string (the full buggy snippet)", 
               "bugLine": number (0-indexed line number where bug is), 
               "fix": "string (the corrected version of that specific line)",
               "explanation": "string (short reason)" 
             }`,

    // 🔴 UPDATED PROMPT: Complex Typing Challenge
    syntax: `Generate a single, complex Javascript, TypeScript, or Regex one-liner that is difficult to type (uses many symbols like {}, [], (), $, \\, =>). 
             Return ONLY valid JSON with this structure:
             { 
               "code": "string (the complex line)", 
               "description": "string (short comment on what it does)" 
             }`,
    
    // 3. Regex Rift
    regex: `Generate a Regex challenge. Provide a test string and a goal (e.g. find all emails, find dates).
            Return ONLY valid JSON with this structure:
            { "target": "string (e.g. 'Find all digits')", "testString": "string", "answer": "string (the regex pattern, e.g. '\\\\d+')" }`,

    // 4. Refactor Reactor
    refactor: `Generate a 'Bad Code' vs 'Good Code' comparison. The 'Good' code should be modern ES6+ or more efficient.
               Return ONLY valid JSON with this structure:
               { "bad": "string (legacy/messy code)", "good": "string (clean code)", "context": "string (why it is better)" }`,

    // 5. Sentinel Audit (Security Audit)
    audit: `Generate a Javascript/Node.js code snippet that contains a security vulnerability (e.g. hardcoded secrets, eval(), SQLi).
            Return ONLY valid JSON with this structure:
            { "code": "string (max 2 lines)", "issue": "string (name of vulnerability, e.g. 'Hardcoded Secret')" }`,

    // 6. Security Breach (Exploitation)
    breach: `Generate a security target scenario (e.g. SQL Login, XSS Input).
             Return ONLY valid JSON with this structure:
             { "target": "string (e.g. 'Admin Login Form')", "payload": "string (common exploit payload, e.g. \"' OR 1=1 --\")", "hint": "string" }`,

    // 7. Database Dungeon
    db: `Generate a SQL query that is either a safe 'Read' operation or a dangerous 'Destructive' operation (DROP, DELETE).
         Return ONLY valid JSON with this structure:
         { "query": "string (SQL command)", "type": "string (Must be exactly 'Read' or 'Destructive')" }`,

    // 8. Pipeline Pulse (DevOps)
    pipeline: `Generate a broken CI/CD pipeline stage scenario.
               Return ONLY valid JSON with this structure:
               { "stage": "string (e.g. Build, Test, Deploy)", "status": "Failed", "fix": "string (command to fix it, e.g. 'npm install')" }`,

    // 9. Shell Shock (Terminal)
    shell: `Generate a Linux/Bash terminal task. 
            IMPORTANT: The task description MUST specify the exact file or directory names to be used.
            Return ONLY valid JSON with this structure:
            { 
              "task": "string (e.g. 'Create a directory named projects')", 
              "cmd": "string (the exact command matching the task, e.g. 'mkdir projects')" 
            }`,
            
    // 10. The Negotiator (Soft Skills)
    negotiator: `Generate a salary negotiation scenario for a developer.
                 Return ONLY valid JSON with this structure:
                 { "offer": "string (e.g. '$90,000')", "counter": "string (a reasonable counter response)", "result": "string (Must be exactly 'Accepted' or 'Rejected')" }`,

    // 11. Chrono Shift (Big O)
    chrono: `Generate a code snippet (loop structure) and its Time Complexity.
             Return ONLY valid JSON with this structure:
             { "code": "string (the loop)", "answer": "string (Big O, e.g. 'O(n)')", "wrong": "string (incorrect Big O)" }`,

    // 12. Oculus Vision (CSS Debugging)
    oculus: `Generate a visual CSS bug scenario.
             Return ONLY valid JSON with this structure:
             { "issue": "string (description of visual bug)", "fix": "string (correct CSS property)", "bad": "string (incorrect CSS property)" }`,

    // 13. Freelance Fortress
    freelance: `Generate a freelance client request. It should be either a good request (Accept) or a red flag (Decline).
                Return ONLY valid JSON with this structure:
                { "client": "string (the client's message)", "action": "string (Must be exactly 'Accept' or 'Decline')" }`,

    // 14. The Pitch
    pitch: `Generate a startup idea pitch. Provide a 'Good' concise pitch and a 'Bad' vague pitch.
            Return ONLY valid JSON with this structure:
            { "concept": "string (startup name/idea)", "goodPitch": "string", "badPitch": "string" }`,

    // 15. FinOps Frontier
    finops: `Generate a cloud cost optimization scenario.
             Return ONLY valid JSON with this structure:
             { "resource": "string (e.g. 'Idle EC2 Instance')", "action": "string (action to save money, e.g. 'Terminate')" }`
};

export const generateChallenge = async (gameType) => {
    try {
        const prompt = GAME_PROMPTS[gameType];
        if (!prompt) throw new Error("Unknown Game Type: " + gameType);

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "You are a coding game engine. Output ONLY raw valid JSON. Do not use Markdown code blocks. Do not add explanations." },
                { role: "user", content: prompt }
            ],
            model: "llama-3.3-70b-versatile", // Fast, low-latency model
            temperature: 0.8, // Slightly higher creativity for unique questions
        });

        const rawContent = completion.choices[0]?.message?.content;
        
        // CLEANUP: Robust JSON parsing to handle potential "```json" wrappers
        const jsonString = rawContent
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Groq Gen Error:", error);
        // Returning null allows the UI components to fall back to their local MOCK_DATA
        return null;
    }
};