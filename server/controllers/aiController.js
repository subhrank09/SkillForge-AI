// const Groq = require("groq-sdk");
// const Course = require("../models/Course");
// const Flashcard = require("../models/FlashCard");

// // Robust PDF Import
// let pdfParse = require('pdf-parse');
// if (typeof pdfParse !== 'function') {
//     if (pdfParse.default) {
//         pdfParse = pdfParse.default;
//     }
// }

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// // --- HELPER: Clean JSON Output ---
// const cleanJSON = (text) => {
//   const firstBrace = text.indexOf('{');
//   const lastBrace = text.lastIndexOf('}');
//   if (firstBrace !== -1 && lastBrace !== -1) {
//     return text.substring(firstBrace, lastBrace + 1);
//   }
//   return text;
// };

// // 1. Generate Course (Multilingual)
// exports.generateCourse = async (req, res) => {
//   try {
//     const { topic, language = "English" } = req.body;
    
//     const completion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "You are a JSON generator. Output ONLY valid JSON." },
//         { role: "user", content: `Generate a learning path for "${topic}" in ${language}. Structure: { "title": "...", "topic": "${topic}", "nodes": [{ "id": "1", "type": "input", "data": { "label": "...", "description": "..." }, "position": { "x": 250, "y": 0 } }], "edges": [{ "id": "e1-2", "source": "1", "target": "2" }] }` }
//       ],
//       model: "llama-3.3-70b-versatile",
//     });

//     const text = cleanJSON(completion.choices[0]?.message?.content || "");
//     const courseData = JSON.parse(text);
//     const newCourse = new Course({ ...courseData, language });
//     await newCourse.save();

//     // FIX: Convert Mongoose Document to Plain Object before sending/caching
//     res.status(201).json(newCourse.toObject()); 

//   } catch (error) {
//     console.error("Course Error:", error);
//     res.status(500).json({ error: "Failed to generate course" });
//   }
// };

// // 2. Generate Lesson
// exports.generateLesson = async (req, res) => {
//   try {
//     const { topic, nodeTitle, language = "English" } = req.body;
//     const completion = await groq.chat.completions.create({
//       messages: [{ role: "user", content: `Write a concise lesson for "${nodeTitle}" inside "${topic}" in ${language}. Use Markdown. Keep it under 300 words.` }],
//       model: "llama-3.3-70b-versatile",
//     });
//     res.json({ content: completion.choices[0]?.message?.content });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to generate lesson" });
//   }
// };

// // 3. Generate Quiz
// exports.generateQuiz = async (req, res) => {
//   try {
//     const { topic, nodeTitle, language = "English" } = req.body;
//     const completion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "Output ONLY JSON." },
//         { role: "user", content: `Create 3 multiple choice questions for "${nodeTitle}" in "${topic}" in ${language}. Format: { "questions": [{ "question": "...", "options": ["..."], "correctAnswer": 0, "explanation": "..." }] }` }
//       ],
//       model: "llama-3.3-70b-versatile",
//     });
//     const text = cleanJSON(completion.choices[0]?.message?.content || "");
//     res.json(JSON.parse(text));
//   } catch (error) {
//     res.status(500).json({ error: "Failed to generate quiz" });
//   }
// };

// // 4. Career Gap Analysis (PDF Upload)
// exports.generateGapCourse = async (req, res) => {
//   try {
//     const { jobDescription } = req.body;
//     const resumeFile = req.file; 

//     if (!resumeFile || !jobDescription) {
//       return res.status(400).json({ error: "Missing resume or job description" });
//     }

//     const pdfData = await pdfParse(resumeFile.buffer);
//     const resumeText = pdfData.text;

//     const completion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "Output ONLY valid JSON." },
//         { role: "user", content: `Analyze gap. RESUME: ${resumeText.substring(0, 3000)}... JOB: ${jobDescription.substring(0, 3000)}... Identify 5 missing skills. Generate course. Structure: { "title": "Bridge Course", "topic": "Career Gap", "nodes": [{ "id": "1", "data": { "label": "Skill" }, "position": { "x": 0, "y": 0 } }], "edges": [] }` }
//       ],
//       model: "llama-3.3-70b-versatile",
//     });

//     const text = cleanJSON(completion.choices[0]?.message?.content || "");
//     const courseData = JSON.parse(text);
//     const newCourse = new Course(courseData);
//     await newCourse.save();
    
//     // FIX: Convert to Plain Object
//     res.status(201).json(newCourse.toObject());

//   } catch (error) {
//     console.error("Gap Analysis Error:", error);
//     res.status(500).json({ error: "Failed to generate gap course" });
//   }
// };

// // 5. Generate Flashcards
// exports.generateFlashcards = async (req, res) => {
//   try {
//     const { topic, nodeTitle, userId, courseId, language = "English" } = req.body;
//     const completion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "Output ONLY valid JSON." },
//         { role: "user", content: `Create 5 flashcards for "${nodeTitle}" in "${topic}" in ${language}. Format: { "cards": [{ "front": "...", "back": "..." }] }` }
//       ],
//       model: "llama-3.3-70b-versatile",
//     });

//     const text = cleanJSON(completion.choices[0]?.message?.content || "");
//     const data = JSON.parse(text);

//     const cards = data.cards.map(c => ({ 
//       userId, courseId, front: c.front, back: c.back, box: 1, nextReviewDate: new Date() 
//     }));

//     await Flashcard.insertMany(cards);
//     res.json({ success: true, count: cards.length });
//   } catch (error) {
//     console.error("Flashcard Error:", error);
//     res.status(500).json({ error: "Failed to generate flashcards" });
//   }
// };

// // 6. Generate Flowchart
// exports.generateFlowchart = async (req, res) => {
//   try {
//     const { topic, nodeTitle, language = "English" } = req.body;
//     const completion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "Output ONLY raw Mermaid code. No markdown." },
//         { role: "user", content: `Create a flowchart for "${nodeTitle}" in "${topic}" (${language}). Start with 'graph TD'.` }
//       ],
//       model: "llama-3.3-70b-versatile",
//     });

//     let code = completion.choices[0]?.message?.content || "";
//     code = code.replace(/```mermaid/g, "").replace(/```/g, "").trim();
    
//     // Sanitize Regex
//     const match = code.match(/(graph TD|graph LR|sequenceDiagram)[\s\S]*/);
//     if (match) code = match[0];
//     else code = `graph TD\nA[Error] --> B[Invalid AI Output]`;

//     res.json({ code });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to generate flowchart" });
//   }
// };

// // 7. Generate Mind Map
// exports.generateMindMap = async (req, res) => {
//   try {
//     const { topic, parentId } = req.body;
//     const completion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "Output ONLY valid JSON." },
//         { role: "user", content: `Generate 5 sub-concepts related to: "${topic}". Format: { "nodes": [{ "label": "Sub-concept 1" }] }. Keep labels short.` }
//       ],
//       model: "llama-3.3-70b-versatile",
//     });

//     const text = cleanJSON(completion.choices[0]?.message?.content || "");
//     const data = JSON.parse(text);
//     res.json({ nodes: data.nodes, parentId });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to expand mind map" });
//   }
// };

// // 8. Generate Interview Question
// exports.generateInterviewQuestion = async (req, res) => {
//   try {
//     const { role, difficulty } = req.body;
//     const completion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "You are a tough technical interviewer." },
//         { role: "user", content: `Generate ONE ${difficulty} interview question for a ${role} position. Keep it short. Do not include the answer.` }
//       ],
//       model: "llama-3.3-70b-versatile",
//     });
//     res.json({ question: completion.choices[0]?.message?.content });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to generate question" });
//   }
// };

// // 9. Grade Interview Answer
// exports.evaluateInterviewAnswer = async (req, res) => {
//   try {
//     const { question, userAnswer } = req.body;
//     const completion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "Output ONLY JSON." },
//         { role: "user", content: `Question: "${question}" Answer: "${userAnswer}". Evaluate. Format: { "score": 0-10, "feedback": "...", "betterAnswer": "..." }` }
//       ],
//       model: "llama-3.3-70b-versatile",
//     });
    
//     const text = cleanJSON(completion.choices[0]?.message?.content || "");
//     res.json(JSON.parse(text));
//   } catch (error) {
//     res.status(500).json({ error: "Failed to evaluate answer" });
//   }
// };

// // 10. AI Code Sensei
// exports.reviewCode = async (req, res) => {
//   try {
//     const { code, language = "javascript" } = req.body;
//     const completion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "Output ONLY valid JSON." },
//         { role: "user", content: `Review this ${language} code. CODE: ${code.substring(0, 5000)}. Format: { "score": 0-100, "bugs": ["bug 1"], "improvements": ["suggestion 1"] }` }
//       ],
//       model: "llama-3.3-70b-versatile",
//     });

//     const text = cleanJSON(completion.choices[0]?.message?.content || "");
//     res.json(JSON.parse(text));
//   } catch (error) {
//     res.status(500).json({ error: "Failed to review code" });
//   }
// };

// // 11. AI Tutor
// exports.askTutor = async (req, res) => {
//   try {
//     const { currentTopic, currentContext, userQuestion } = req.body;
//     const completion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "You are a helpful AI Tutor. Keep it short." },
//         { role: "user", content: `TOPIC: ${currentTopic}\nCONTEXT: ${currentContext.substring(0, 2000)}\nQUESTION: ${userQuestion}` }
//       ],
//       model: "llama-3.3-70b-versatile",
//     });
//     res.json({ answer: completion.choices[0]?.message?.content });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to get answer" });
//   }
// };

// // 12. Question Paper Predictor
// exports.predictQuestions = async (req, res) => {
//   try {
//     const resumeFile = req.file; 
//     if (!resumeFile) return res.status(400).json({ error: "Missing file" });

//     const pdfData = await pdfParse(resumeFile.buffer);
    
//     const completion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "Output JSON." },
//         { role: "user", content: `Analyze this exam paper text: ${pdfData.text.substring(0, 5000)}... Predict 5 high-probability questions. Format: { "predictions": [ {"question": "...", "probability": "High", "reason": "..."} ] }` }
//       ],
//       model: "llama-3.3-70b-versatile",
//     });

//     const text = cleanJSON(completion.choices[0]?.message?.content || "");
//     res.json(JSON.parse(text));
//   } catch (error) {
//     console.error("Prediction Error:", error);
//     res.status(500).json({ error: "Prediction failed" });
//   }
// };

// // aiController.js - New Features Implementation

// const axios = require('axios'); // Ensure you have installed axios: npm install axios

// // --- Feature 1: Dynamic Roadmap Generator ---
// exports.generateRoadmap = async (req, res) => {
//     try {
//         const { targetRole, currentSkillLevel, durationWeeks } = req.body;

//         const prompt = `
//             Act as a senior tech mentor. Create a ${durationWeeks}-week study roadmap for a ${currentSkillLevel} wanting to become a ${targetRole}.
//             Return ONLY a valid JSON object with this structure:
//             {
//                 "roadmap": [
//                     { "week": 1, "topic": "Topic Name", "details": "What to study", "project": "Small task" }
//                 ]
//             }
//         `;

//         const aiResponse = await callGeminiAPI(prompt);
//         // Parsing the JSON from the AI text response
//         const roadmapData = JSON.parse(extractJSON(aiResponse)); 

//         res.status(200).json({ success: true, data: roadmapData });
//     } catch (error) {
//         console.error("Roadmap Error:", error);
//         res.status(500).json({ success: false, message: "Failed to generate roadmap" });
//     }
// };

// // --- Feature 2: GitHub Repository Analyzer ---
// // Inside server/controllers/aiController.js

// exports.analyzeGithubRepo = async (req, res) => {
//     try {
//         const { repoUrl } = req.body;
        
//         // 1. ROBUST URL PARSING (Fixes the trailing slash crash)
//         // Removes trailing slash if present
//         const cleanUrl = repoUrl.endsWith('/') ? repoUrl.slice(0, -1) : repoUrl;
//         const parts = cleanUrl.split('/');
//         const repo = parts[parts.length - 1];
//         const owner = parts[parts.length - 2];

//         console.log(`Analyzing: ${owner}/${repo}`); // Debug log to see what's happening

//         // 2. Fetch file structure
//         const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
        
//         // NOTE: If you hit a rate limit (403), you need a GitHub Token in headers.
//         // For now, we try without it.
//         const repoData = await axios.get(githubApiUrl);

//         // 3. Prepare Prompt
//         const fileList = repoData.data.map(file => file.name).join(', ');
        
//         const prompt = `
//             Analyze this GitHub repository structure based on these file names: ${fileList}.
//             The user is applying for a tech job. 
//             1. Rate the project complexity (1-10).
//             2. List 3 strengths.
//             3. List 3 improvements.
//             Return ONLY valid JSON: { "rating": number, "strengths": [], "improvements": [] }
//         `;

//         const analysis = await callGeminiAPI(prompt);
//         const result = JSON.parse(extractJSON(analysis));

//         res.status(200).json({ success: true, data: result });

//     } catch (error) {
//         console.error("GitHub Analyzer Error:", error.message);
        
//         // Return actual error to frontend for better debugging
//         res.status(500).json({ 
//             success: false, 
//             message: "Failed to analyze. Check if repo is Public or URL is correct.",
//             error: error.message 
//         });
//     }
// };

// // --- Feature 3: Skill Gap Analysis ---
// exports.analyzeSkillGap = async (req, res) => {
//     try {
//         // Expecting quizResults: [{ topic: "React Hooks", score: 2/5 }, { topic: "CSS Grid", score: 5/5 }]
//         const { quizResults, targetRole } = req.body;

//         const prompt = `
//             The user wants to be a ${targetRole}. Here are their quiz scores: ${JSON.stringify(quizResults)}.
//             Identify the weak areas. Suggest 2 specific resources (YouTube/Docs) for each weak area.
//             Return as JSON: { "gaps": [ { "topic": "React Hooks", "advice": "..." } ] }
//         `;

//         const gapAnalysis = await callGeminiAPI(prompt);
//         const result = JSON.parse(extractJSON(gapAnalysis));

//         res.status(200).json({ success: true, data: result });

//     } catch (error) {
//         res.status(500).json({ success: false, message: "Skill gap analysis failed" });
//     }
// };

// // --- Helper Functions ---

// // Helper to clean AI response if it includes markdown code blocks (```json ...)
// function extractJSON(text) {
//     const jsonMatch = text.match(/\{[\s\S]*\}/);
//     return jsonMatch ? jsonMatch[0] : text;
// }

// // Placeholder for your actual Gemini/OpenAI call function
// async function callGeminiAPI(prompt) {
//     // Replace this with your actual API key and endpoint logic
//     const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
//     const response = await axios.post(url, {
//         contents: [{ parts: [{ text: prompt }] }]
//     });

//     return response.data.candidates[0].content.parts[0].text;
// }

require('dotenv').config();
const Groq = require("groq-sdk");
const axios = require('axios');
const Course = require("../models/Course");
const Flashcard = require("../models/FlashCard");

// Robust PDF Import
let pdfParse = require('pdf-parse');
if (typeof pdfParse !== 'function') {
    if (pdfParse.default) {
        pdfParse = pdfParse.default;
    }
}

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const AI_MODEL = "llama-3.3-70b-versatile";

// --- HELPER: Clean JSON Output ---
const cleanJSON = (text) => {
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    return text.substring(firstBrace, lastBrace + 1);
  }
  return text;
};

// --- HELPER: Universal Groq Call ---
async function callGroqAPI(systemPrompt, userPrompt) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: AI_MODEL,
            temperature: 0.5,
            response_format: { type: "json_object" } // Enforce JSON
        });
        return cleanJSON(completion.choices[0]?.message?.content || "{}");
    } catch (error) {
        console.error("AI Service Error:", error);
        throw new Error("AI Service Failed");
    }
}

// ==========================================
// 🚀 EXISTING FEATURES (1-12)
// ==========================================

// 1. Generate Course
exports.generateCourse = async (req, res) => {
  try {
    const { topic, language = "English" } = req.body;
    const jsonResponse = await callGroqAPI(
      "You are a JSON generator. Output ONLY valid JSON.",
      `Generate a learning path for "${topic}" in ${language}. Structure: { "title": "...", "topic": "${topic}", "nodes": [{ "id": "1", "type": "input", "data": { "label": "...", "description": "..." }, "position": { "x": 250, "y": 0 } }], "edges": [{ "id": "e1-2", "source": "1", "target": "2" }] }`
    );
    const courseData = JSON.parse(jsonResponse);
    const newCourse = new Course({ ...courseData, language });
    await newCourse.save();
    res.status(201).json(newCourse.toObject());
  } catch (error) {
    res.status(500).json({ error: "Failed to generate course" });
  }
};

// 2. Generate Lesson (Text Output)
exports.generateLesson = async (req, res) => {
  try {
    const { topic, nodeTitle, language = "English" } = req.body;
    const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: `Write a concise lesson for "${nodeTitle}" inside "${topic}" in ${language}. Use Markdown. Keep it under 300 words.` }],
        model: AI_MODEL,
    });
    res.json({ content: completion.choices[0]?.message?.content });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate lesson" });
  }
};

// 3. Generate Quiz
// 3. Generate Quiz (FIXED for Llama 3 & Frontend Compatibility)
exports.generateQuiz = async (req, res) => {
  try {
    const { topic, nodeTitle, language = "English" } = req.body;

    const systemPrompt = `You are an expert Teacher. Output ONLY raw JSON. Do not use Markdown formatting.`;
    
    const userPrompt = `
        Create a quiz for the topic: "${nodeTitle}" (Context: ${topic}).
        Language: ${language}.
        
        Generate exactly 3 multiple-choice questions.

        STRICT JSON SCHEMA RULES:
        1. Return an object with a "questions" array.
        2. Each question must have "question", "options" (array of strings), and "answer" (string).
        3. CRITICAL: The "answer" field MUST be an EXACT string copy of one of the items in "options". Do NOT use indices (0, 1) or letters (A, B).
        
        Example Output:
        {
            "questions": [
                {
                    "question": "What is 2 + 2?",
                    "options": ["3", "4", "5", "6"],
                    "answer": "4" 
                }
            ]
        }
    `;

    const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
    let quizData = JSON.parse(jsonResponse);

    // 🛡️ FAIL-SAFE: Double check the data before sending to frontend
    // If the AI hallucinates and forgets the answer, we auto-fix it to prevent the app from crashing.
    if (quizData.questions && Array.isArray(quizData.questions)) {
        quizData.questions = quizData.questions.map(q => {
            // Trim whitespace to ensure matching works
            q.options = q.options.map(opt => String(opt).trim());
            
            // If answer is missing OR not inside the options array
            if (!q.answer || !q.options.includes(String(q.answer).trim())) {
                console.warn(`⚠️ Quiz Fixer: AI generated invalid answer for "${q.question}". Auto-selecting first option.`);
                q.answer = q.options[0]; // Fallback to first option so the quiz is playable
            }
            return q;
        });
    }

    res.json(quizData);

  } catch (error) {
    console.error("Quiz Gen Error:", error);
    // Return a fallback quiz to prevent white screen of death
    res.json({
        questions: [
            {
                question: `Could not generate quiz for ${nodeTitle}. Try again?`,
                options: ["Retry", "Cancel"],
                answer: "Retry"
            }
        ]
    });
  }
};

// 4. Career Gap Analysis (PDF)
exports.generateGapCourse = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const resumeFile = req.file; 
    if (!resumeFile || !jobDescription) return res.status(400).json({ error: "Missing resume or JD" });

    const pdfData = await pdfParse(resumeFile.buffer);
    const resumeText = pdfData.text;

    const jsonResponse = await callGroqAPI(
        "Output ONLY valid JSON.",
        `Analyze gap. RESUME: ${resumeText.substring(0, 3000)}... JOB: ${jobDescription.substring(0, 3000)}... Identify 5 missing skills. Generate course. Structure: { "title": "Bridge Course", "topic": "Career Gap", "nodes": [{ "id": "1", "data": { "label": "Skill" }, "position": { "x": 0, "y": 0 } }], "edges": [] }`
    );
    const courseData = JSON.parse(jsonResponse);
    const newCourse = new Course(courseData);
    await newCourse.save();
    res.status(201).json(newCourse.toObject());
  } catch (error) {
    res.status(500).json({ error: "Gap analysis failed" });
  }
};

// 5. Generate Flashcards
exports.generateFlashcards = async (req, res) => {
  try {
    const { topic, nodeTitle, userId, courseId, language = "English" } = req.body;
    
    // ... (AI Generation Logic) ...
    const jsonResponse = await callGroqAPI(
        "Output ONLY valid JSON.",
        `Create 5 flashcards for "${nodeTitle}" in "${topic}" in ${language}. Format: { "cards": [{ "front": "...", "back": "..." }] }`
    );

    const text = cleanJSON(completion.choices[0]?.message?.content || "");
    const data = JSON.parse(text);

    const cards = data.cards.map(c => ({ 
      userId, // Ensure this matches the ID sent from frontend
      courseId, 
      front: c.front, 
      back: c.back, 
      box: 1, 
      nextReviewDate: new Date() 
    }));

    // ✅ SAVE TO FLASHCARD COLLECTION
    await Flashcard.insertMany(cards);
    
    res.json({ success: true, count: cards.length });
  } catch (error) {
    console.error("Flashcard Gen Error:", error);
    res.status(500).json({ error: "Failed" });
  }
};
// 6. Generate Flowchart (Raw Text)
exports.generateFlowchart = async (req, res) => {
  try {
    const { topic, nodeTitle, language = "English" } = req.body;
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Output ONLY raw Mermaid code. No markdown." },
        { role: "user", content: `Create a flowchart for "${nodeTitle}" in "${topic}" (${language}). Start with 'graph TD'.` }
      ],
      model: AI_MODEL,
    });
    let code = completion.choices[0]?.message?.content || "";
    code = code.replace(/```mermaid/g, "").replace(/```/g, "").trim();
    res.json({ code });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate flowchart" });
  }
};

// 7. Mind Map
exports.generateMindMap = async (req, res) => {
  try {
    const { topic, parentId } = req.body;
    const jsonResponse = await callGroqAPI(
        "Output ONLY valid JSON.",
        `Generate 5 sub-concepts related to: "${topic}". Format: { "nodes": [{ "label": "Sub-concept 1" }] }. Keep labels short.`
    );
    const data = JSON.parse(jsonResponse);
    res.json({ nodes: data.nodes, parentId });
  } catch (error) {
    res.status(500).json({ error: "Failed to expand mind map" });
  }
};

// 8. Interview Question (Text)
exports.generateInterviewQuestion = async (req, res) => {
  try {
    const { role, difficulty } = req.body;
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: `Generate ONE ${difficulty} interview question for a ${role} position. Keep it short. Do not include the answer.` }],
      model: AI_MODEL,
    });
    res.json({ question: completion.choices[0]?.message?.content });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate question" });
  }
};

// 9. Evaluate Answer
exports.evaluateInterviewAnswer = async (req, res) => {
  try {
    const { question, userAnswer } = req.body;
    const jsonResponse = await callGroqAPI(
        "Output ONLY JSON.",
        `Question: "${question}" Answer: "${userAnswer}". Evaluate. Format: { "score": 0-10, "feedback": "...", "betterAnswer": "..." }`
    );
    res.json(JSON.parse(jsonResponse));
  } catch (error) {
    res.status(500).json({ error: "Failed to evaluate answer" });
  }
};

// 10. Code Review
exports.reviewCode = async (req, res) => {
  try {
    const { code, language = "javascript" } = req.body;
    const jsonResponse = await callGroqAPI(
        "Output ONLY valid JSON.",
        `Review this ${language} code. CODE: ${code.substring(0, 5000)}. Format: { "score": 0-100, "bugs": ["bug 1"], "improvements": ["suggestion 1"] }`
    );
    res.json(JSON.parse(jsonResponse));
  } catch (error) {
    res.status(500).json({ error: "Failed to review code" });
  }
};

exports.askTutor = async (req, res) => {
  try {
    const { courseTitle, context, question } = req.body;

    // ✅ FIX: Explicitly instruct the AI to return JSON with a specific key
    const systemPrompt = `
        You are an expert tutor specializing in ${courseTitle}. 
        Context: ${context}.
        
        IMPORTANT: You must output your response in JSON format with a single key called "answer".
        Example: { "answer": "Here is how you solve that..." }
    `;
    
    // Call the API
    const jsonResponse = await callGroqAPI(systemPrompt, question);

    // ✅ FIX: Parse the JSON string to get the actual text answer
    const parsedData = JSON.parse(jsonResponse);

    // Send just the answer text to the frontend
    res.json({ answer: parsedData.answer });

  } catch (error) {
    console.error("❌ Mentor API Error:", error.message);
    // ... rest of error handling
    res.status(500).json({ error: "Failed to get answer", details: error.message });
  }
};

// 12. Predict Questions (PDF)
exports.predictQuestions = async (req, res) => {
  try {
    const resumeFile = req.file; 
    if (!resumeFile) return res.status(400).json({ error: "Missing file" });
    const pdfData = await pdfParse(resumeFile.buffer);

    const jsonResponse = await callGroqAPI(
        "Output JSON.",
        `Analyze this exam paper text: ${pdfData.text.substring(0, 5000)}... Predict 5 high-probability questions. Format: { "predictions": [ {"question": "...", "probability": "High", "reason": "..."} ] }`
    );
    res.json(JSON.parse(jsonResponse));
  } catch (error) {
    res.status(500).json({ error: "Prediction failed" });
  }
};

// ==========================================
// 🚀 NEW FEATURES (ROADMAP, GITHUB, SKILL GAP)
// ==========================================

// 13. Dynamic Roadmap Generator
exports.generateRoadmap = async (req, res) => {
    try {
        const { targetRole, currentSkillLevel, durationWeeks } = req.body;
        const jsonResponse = await callGroqAPI(
            "You are a senior tech mentor. Output ONLY valid JSON.",
            `Create a ${durationWeeks}-week study roadmap for a ${currentSkillLevel} wanting to become a ${targetRole}. Structure: { "roadmap": [{ "week": 1, "topic": "Topic Name", "details": "What to study", "project": "Small task" }] }`
        );
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        console.error("Roadmap Error:", error);
        res.status(500).json({ success: false, message: "Failed to generate roadmap" });
    }
};

// 14. GitHub Repository Analyzer
exports.analyzeGithubRepo = async (req, res) => {
    try {
        const { repoUrl } = req.body;
        if (!repoUrl) throw new Error("Repo URL is required");

        // URL Parsing
        const cleanUrl = repoUrl.endsWith('/') ? repoUrl.slice(0, -1) : repoUrl;
        const parts = cleanUrl.split('/');
        const repo = parts[parts.length - 1];
        const owner = parts[parts.length - 2];

        // Fetch Files (No Token)
        const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
        const repoData = await axios.get(githubApiUrl);
        const fileList = repoData.data.map(file => file.name).join(', ');

        const jsonResponse = await callGroqAPI(
            "You are a Senior Code Reviewer. Output ONLY valid JSON.",
            `Analyze project files: ${fileList}. Rate complexity (1-10). Return JSON: { "rating": 8, "strengths": ["..."], "improvements": ["..."] }`
        );

        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        console.error("GitHub Analyzer Error:", error.message);
        res.status(500).json({ success: false, message: "Could not access public repo." });
    }
};

// 15. Skill Gap Analysis
exports.analyzeSkillGap = async (req, res) => {
    try {
        const { quizResults, targetRole } = req.body;
        const jsonResponse = await callGroqAPI(
            "You are a Career Coach. Output ONLY valid JSON.",
            `User wants to be ${targetRole}. Scores: ${JSON.stringify(quizResults)}. Identify weak areas. Return JSON: { "gaps": [{ "topic": "Weak Topic", "advice": "How to improve" }] }`
        );
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        console.error("Skill Gap Error:", error);
        res.status(500).json({ success: false, message: "Skill gap analysis failed" });
    }
};

//THE FORGE
// --- Feature: The Forge (Project Scaffolder) ---
// server/controllers/aiController.js

exports.generateProjectScaffold = async (req, res) => {
    try {
        // ✅ Accept 'customIdea' from request body
        const { techStack, level, customIdea } = req.body; 

        const systemPrompt = `You are a Senior Architect. Output ONLY valid JSON.`;
        
        // ✅ Logic: If customIdea exists, use it. Otherwise, generate random.
        let specificPrompt = "";
        if (customIdea) {
            specificPrompt = `
                Generate the starter code for this SPECIFIC project:
                Title: "${customIdea.title}"
                Description: "${customIdea.description}"
                
                Ensure the README and file structure match this exact idea.
            `;
        } else {
            specificPrompt = `Create a unique, portfolio-worthy project idea for a ${level} ${techStack} developer.`;
        }

        const userPrompt = `
            ${specificPrompt}
            
            Return a JSON object with this EXACT structure:
            {
                "title": "Project Name",
                "description": "Short summary",
                "readme": "# Project Title\\n\\n## Features...",
                "files": {
                    "index.js": "...", 
                    "package.json": "..."
                }
            }
            
            Rules:
            1. "files" keys are paths (e.g., "src/App.jsx").
            2. Provide working starter code in the values.
        `;

        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });

    } catch (error) {
        console.error("Forge Error:", error);
        res.status(500).json({ success: false, message: "Failed to forge project." });
    }
};

//ADVANCEMENTS
// --- Feature: Titan Resume Builder ---
// server/controllers/aiController.js

exports.generateResumeJSON = async (req, res) => {
    try {
        const { userInfo, history, badges } = req.body;

        const systemPrompt = "You are a Professional Resume Writer. Output ONLY valid JSON.";
        
        const userPrompt = `
            Convert this user's learning history into a professional resume JSON matching the exact structure below.
            
            User: ${userInfo.name}
            Email: ${userInfo.email}
            Raw History: ${JSON.stringify(history)}
            Badges: ${JSON.stringify(badges)}

            RULES:
            1. **Experience**: Treat complex Arcade Simulations (e.g., "FinOps Frontier", "Freelance Fortress") as "Virtual Internships" or "Experience". Create professional bullet points for them.
            2. **Projects**: Treat coding tasks as "Projects".
            3. **Technologies**: Extract skills from the history (e.g., if they did "React Course", add React to Technologies).
            4. **Objective**: Write a strong summary based on their focus area.

            REQUIRED JSON STRUCTURE:
            {
                "personal": {
                    "name": "...",
                    "email": "...",
                    "phone": "555-0199", 
                    "links": "linkedin.com/in/user | github.com/user | portfolio.dev"
                },
                "education": {
                    "school": "Institute of Technology (Placeholder)",
                    "degree": "B.Tech Computer Science",
                    "duration": "2023 - 2027"
                },
                "objective": "...",
                "experience": [
                    { 
                        "role": "Cloud Architecture Trainee (Virtual)", 
                        "company": "SkillForge Arcade", 
                        "location": "Remote",
                        "duration": "Aug 2025",
                        "points": ["Architected scalable cloud solutions...", "Optimized costs..."]
                    }
                ],
                "projects": [
                    {
                        "title": "E-Commerce API",
                        "tools": "Node.js, Express, MongoDB",
                        "description": "Built a RESTful API..."
                    }
                ],
                "acholades": [
                    "Top 10% in Global Leaderboard",
                    "Solved 50+ Algorithm Challenges"
                ],
                "technologies": {
                    "languages": "JavaScript, Python, C++",
                    "frameworks": "React, Node.js, Express, Tailwind"
                }
            }
        `;

        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        
        // Clean and parse
        const cleanJson = jsonResponse.replace(/```json|```/g, "").trim();
        const resumeData = JSON.parse(cleanJson);

        res.status(200).json({ success: true, data: resumeData });

    } catch (error) {
        console.error("Resume Error:", error);
        res.status(500).json({ success: false, message: "Resume generation failed." });
    }
};

// --- Feature: Company Oracle (Targeted Mock Tests) ---
exports.generateCompanyTest = async (req, res) => {
    try {
        const { company, role } = req.body; // e.g., "Google", "Frontend Engineer"

        const systemPrompt = "You are a Hiring Manager at a top tech company. Output ONLY valid JSON.";
        const userPrompt = `
            Create a mock interview test for a ${role} position at ${company}.
            Include 5 questions that specifically match ${company}'s known interview style (e.g., Leadership Principles for Amazon, Algorithmic for Google).
            
            Return JSON:
            {
                "testTitle": "${company} Calibration Test",
                "questions": [
                    {
                        "id": 1,
                        "question": "Question text...",
                        "options": ["A", "B", "C", "D"],
                        "correctAnswer": 0,
                        "explanation": "Why A is correct..."
                    }
                ]
            }
        `;

        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        console.error("Oracle Error:", error);
        res.status(500).json({ success: false, message: "Failed to generate test." });
    }
};

// --- Feature: The Daily Byte (Tech News) ---
exports.getTechNews = async (req, res) => {
    try {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        // ✅ FIX 1: Add a random ID to force the AI to generate a FRESH response every time
        const randomSeed = Math.floor(Math.random() * 10000);

        const systemPrompt = "You are a Tech News Editor. Output ONLY valid JSON.";
        
        const userPrompt = `
            Request ID: ${randomSeed} (Ignore this ID, just generate fresh news).
            Generate a tech news feed for today: ${today}.
            
            Create 6 to 8 distinct, realistic tech news headlines.
            
            IMPORTANT: Do not repeat the same generic news. Try to find different angles or stories than the previous request if possible.
            
            Structure the JSON strictly like this:
            {
                "news": [
                    {
                        "title": "Headline here",
                        "summary": "2-sentence summary...",
                        "category": "AI",
                        "impact": "High"
                    }
                ]
            }
        `;

        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        
        // ... (rest of the parsing logic stays the same) ...
        let data;
        try {
             data = JSON.parse(jsonResponse);
        } catch (e) {
             const cleanJson = jsonResponse.replace(/```json|```/g, "").trim();
             data = JSON.parse(cleanJson);
        }

        res.status(200).json({ success: true, data });

    } catch (error) {
        console.error("News Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch news." });
    }
};

// --- Feature: Hackathon Hub ---
// server/controllers/aiController.js

exports.generateHackathonIdea = async (req, res) => {
  try {
    const { theme, techStack, difficulty } = req.body; // ✅ Added difficulty

    // 1. Random seed to ensure unique results every time
    const randomSeed = Math.floor(Math.random() * 10000);

    const systemPrompt = "You are a Creative Hackathon Mentor. Output ONLY valid JSON.";
    
    const userPrompt = `
        Request ID: ${randomSeed} (Ignore this ID, just use it to generate a FRESH, UNIQUE idea).
        Theme: ${theme}
        Tech Stack: ${techStack}
        Difficulty Level: ${difficulty || 'Intermediate'}

        Task: Generate a UNIQUE hackathon project idea different from previous ones.
        
        Constraints based on Difficulty:
        - If Beginner: Focus on simple CRUD, UI, and basic APIs.
        - If Intermediate: Include Authentication, Database relationships, and external APIs.
        - If Advanced: Include AI integration, Real-time sockets, Blockchain, or Complex Algorithms.

        Return JSON:
        {
            "title": "Project Name",
            "tagline": "Catchy 1-liner",
            "problem": "What issue does it solve?",
            "solution": "How does it work technically?",
            "pitch": "A 2-sentence elevator pitch."
        }
    `;

    const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
    const cleanJson = jsonResponse.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanJson);

    res.status(200).json(data);
  } catch (error) {
    console.error("Hackathon Idea Error:", error);
    res.status(500).json({ error: "Failed to generate idea" });
  }
};

// ✅ Feature: Refactor Reactor
exports.analyzeRefactor = async (req, res) => {
    try {
        const { originalCode, refactoredCode, language } = req.body;
        const systemPrompt = "You are a Senior Code Reviewer. Output ONLY valid JSON.";
        const userPrompt = `
            Compare these two code snippets (${language}).
            Original: ${originalCode}
            Refactored: ${refactoredCode}
            Analyze readability, efficiency, and cleanliness.
            Return JSON: { "score": 85, "improvement": "text", "issues": ["text"], "xpAwarded": 50 }
        `;
        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        console.error("Refactor Error:", error);
        res.status(500).json({ success: false, message: "Analysis failed." });
    }
};

// ✅ Feature: Glitch Hunt
exports.generateGlitchLevel = async (req, res) => {
    try {
        const { level, language } = req.body;
        const systemPrompt = "You are a Bug Generator. Output ONLY valid JSON.";
        const userPrompt = `Generate a broken code snippet for Level ${level} in ${language}. Return JSON: { "id": ${level}, "title": "Title", "description": "Desc", "buggyCode": "code", "hint": "text" }`;
        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        console.error("Glitch Error:", error);
        res.status(500).json({ success: false, message: "Level generation failed." });
    }
};

// --- Feature: The Negotiator (Salary Bot) ---
exports.negotiateResponse = async (req, res) => {
    try {
        const { history, currentOffer } = req.body; // history = [{role: 'user', content: '...'}]

        const systemPrompt = "You are a tough but fair HR Manager at a Tech Giant. Output ONLY valid JSON.";
        const userPrompt = `
            Current Context: The candidate has an offer of $${currentOffer}.
            
            Conversation History:
            ${JSON.stringify(history)}

            Your Goal: Negotiate. Do not give in easily. Only raise the offer if the user provides a valid reason (market rate, other offers, unique skills).
            Max Budget: $150,000. If they ask for more, refuse politely.
            
            Return JSON:
            {
                "message": "Your response to the candidate...",
                "newOffer": 105000, // The updated offer amount (keep same if not convinced, increase if convinced)
                "sentiment": "neutral", // neutral, annoyed, impressed
                "status": "ongoing" // ongoing, accepted, rejected (if user is rude)
            }
        `;

        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        console.error("Negotiation Error:", error);
        res.status(500).json({ success: false, message: "HR is busy." });
    }
};

// --- Feature: Ghost Writer (Documentation) ---
exports.generateDocs = async (req, res) => {
    try {
        const { code } = req.body;

        const systemPrompt = "You are a Technical Writer. Output Markdown.";
        const userPrompt = `
            Generate professional documentation for this code.
            Include:
            1. Overview
            2. Param definitions
            3. Return values
            4. Example Usage
            
            Code:
            ${code}
        `;

        // Note: Here we return raw text (Markdown), not JSON
        const markdownResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: markdownResponse });
    } catch (error) {
        console.error("Docs Error:", error);
        res.status(500).json({ success: false, message: "Documentation failed." });
    }
};

// --- Feature: Standup Sentinel (Speech Analysis) ---
exports.analyzeStandup = async (req, res) => {
    try {
        const { transcript } = req.body;
        const systemPrompt = "You are a Scrum Master. Output ONLY valid JSON.";
        const userPrompt = `
            Analyze this Daily Standup update:
            "${transcript}"
            
            Check for:
            1. Did they cover Yesterday, Today, and Blockers?
            2. Was it concise?
            3. Too many filler words?
            
            Return JSON:
            {
                "score": 8, // 1-10
                "feedback": "Good update, but you forgot to mention blockers.",
                "fillerCount": 3,
                "betterVersion": "Here is a more concise version..."
            }
        `;
        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        res.status(500).json({ success: false, message: "Standup analysis failed." });
    }
};

// --- Feature: Docs Dojo (Reading Comprehension) ---
exports.generateReadingChallenge = async (req, res) => {
    try {
        const { topic } = req.body; // e.g. "React Hooks" or "Docker Containers"
        const systemPrompt = "You are a Technical Writer. Output ONLY valid JSON.";
        const userPrompt = `
            Generate a short, dense technical paragraph about "${topic}" (approx 100 words).
            Then generate 3 multiple-choice comprehension questions.
            
            Return JSON:
            {
                "text": "React Hooks are functions that let you hook into...",
                "questions": [
                    {
                        "id": 1,
                        "q": "What do hooks allow you to do?",
                        "options": ["Write classes", "Use state in functional components", "Directly access DOM"],
                        "answer": 1
                    }
                ]
            }
        `;
        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        res.status(500).json({ success: false, message: "Docs generation failed." });
    }
};

// --- Feature: Lexicon Uplink (Tech Dictionary) ---
exports.generateLexiconTerm = async (req, res) => {
    try {
        // 1. Generate a random seed (Letter A-Z) to force variety
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

        // 2. Add randomness to the prompt
        const systemPrompt = "You are a Senior Tech Lead. Output ONLY valid JSON.";
        const userPrompt = `
            Generate a sophisticated Technical or Corporate Jargon term used in software engineering that **starts with the letter '${randomLetter}'**.
            
            Examples: Idempotency, Heuristic, Race Condition, Sharding, Throttling, Zombie Process, Hydration.
            
            Return JSON:
            {
                "term": "Term Name",
                "pronunciation": "/phonetic/",
                "category": "DevOps / Backend / Corporate",
                "definition": "Clear, concise definition.",
                "example": "A realistic sentence using the term in a work context.",
                "origin": "Brief origin or why it matters."
            }
        `;

        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        console.error("Lexicon Error:", error);
        res.status(500).json({ success: false, message: "Dictionary offline." });
    }
};

// --- Feature: Freelance Fortress (Proposal Generator) ---
exports.generateProposal = async (req, res) => {
    try {
        const { clientName, projectDesc, mySkills, rate } = req.body;

        const systemPrompt = "You are a Top-Rated Upwork Freelancer. Output Markdown.";
        const userPrompt = `
            Write a winning freelance proposal for this job:
            Client: ${clientName}
            Job: "${projectDesc}"
            My Skills: ${mySkills}
            My Rate: $${rate}/hr
            
            Structure:
            1. Hook (Grab attention)
            2. Understanding of the problem
            3. My Solution & Approach
            4. Why me? (Social Proof)
            5. Call to Action
        `;

        const markdownResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: markdownResponse });
    } catch (error) {
        res.status(500).json({ success: false, message: "Proposal generation failed." });
    }
};

// --- Feature: The Guild Hall (Community Data) ---
exports.getGuildData = async (req, res) => {
    // Mock Data simulating a live community
    const feed = [
        { id: 1, user: "Alex_Dev", avatar: "👨‍💻", project: "E-Commerce API", stack: "Node.js", bounty: 50, time: "2m ago" },
        { id: 2, user: "Sarah_JS", avatar: "👩‍💻", project: "Portfolio v2", stack: "React", bounty: 30, time: "15m ago" },
        { id: 3, user: "IronCoder", avatar: "🤖", project: "Algo Visualizer", stack: "Python", bounty: 100, time: "1h ago" }
    ];

    const leaderboard = [
        { rank: 1, user: "CodeNinja", rep: 1500, badge: "S-Rank" },
        { rank: 2, user: "DevGuru", rep: 1200, badge: "A-Rank" },
        { rank: 3, user: "BugSlayer", rep: 950, badge: "A-Rank" }
    ];

    res.status(200).json({ success: true, feed, leaderboard });
};

// --- Feature: The Pitch (ELI5 Simulator) ---
exports.analyzePitch = async (req, res) => {
    try {
        const { topic, explanation, persona } = req.body; 
        // persona = 'Grandma' or 'CEO'

        const systemPrompt = `You are a strict roleplay AI. You are playing the character: ${persona}. Output ONLY valid JSON.`;
        const userPrompt = `
            The user is trying to explain "${topic}" to you.
            
            Your Character Rules:
            - If persona is 'Grandma': You know nothing about tech. You like cooking analogies. If they say "server" or "database" without explaining, you get confused.
            - If persona is 'CEO': You care about money and speed. You hate details.
            
            User's Explanation: "${explanation}"
            
            Analyze their explanation. Did you understand it? Did they use too much jargon?
            
            Return JSON:
            {
                "score": 8, // 1-10
                "reaction": "Oh dear, what is a 'server'? Is that like a waiter?", // Roleplay response
                "jargonDetected": ["server", "http"],
                "feedback": "Use an analogy for 'server' next time."
            }
        `;

        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        res.status(500).json({ success: false, message: "The Pitch failed." });
    }
};

// --- Feature: FinOps Frontier (Cloud Cost Sim) ---
exports.generateFinOpsChallenge = async (req, res) => {
    try {
        const systemPrompt = "You are a Cloud Architect. Output ONLY valid JSON.";
        const userPrompt = `
            Generate a Cloud Architecture Challenge.
            Scenario: A specific app type (e.g. Streaming, E-commerce, Blog) with a specific user load (e.g. 10k daily active users).
            Budget: A strict monthly dollar limit.
            
            Provide 3 categories of options (Compute, Database, Storage).
            Each option must have: name, cost (monthly), and pros/cons.
            
            Return JSON:
            {
                "title": "Startup MVP",
                "description": "Launch a social app for 10k users.",
                "budget": 200,
                "traffic": "10k DAU",
                "categories": {
                    "compute": [
                        { "id": "c1", "name": "Serverless Functions (Lambda)", "cost": 20, "desc": "Pay per use, scales to zero." },
                        { "id": "c2", "name": "EC2 m5.large Cluster", "cost": 150, "desc": "High performance, fixed cost." }
                    ],
                    "database": [
                        { "id": "d1", "name": "Managed RDS (Postgres)", "cost": 80, "desc": "Reliable, automated backups." },
                        { "id": "d2", "name": "Self-hosted Mongo on EC2", "cost": 30, "desc": "Cheap, high maintenance." }
                    ],
                    "storage": [
                        { "id": "s1", "name": "S3 Standard", "cost": 10, "desc": "High availability." },
                        { "id": "s2", "name": "EBS Snapshots", "cost": 50, "desc": "Fast block storage." }
                    ]
                }
            }
        `;

        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        res.status(500).json({ success: false, message: "Challenge generation failed." });
    }
};

exports.evaluateFinOps = async (req, res) => {
    try {
        const { scenario, choices } = req.body; 
        // choices = [{ name: "Lambda", cost: 20 }, ...]

        const totalCost = choices.reduce((acc, curr) => acc + curr.cost, 0);

        const systemPrompt = "You are a FinOps Auditor. Output ONLY valid JSON.";
        const userPrompt = `
            Scenario: ${scenario.title} (${scenario.traffic}).
            Budget: $${scenario.budget}.
            
            User Selected Stack ($${totalCost}):
            ${JSON.stringify(choices)}

            Analyze:
            1. Is it under budget?
            2. Will this stack actually handle the ${scenario.traffic} load? (e.g. if they picked a cheap tiny server for high traffic, fail them).
            
            Return JSON:
            {
                "success": true/false,
                "score": 85,
                "message": "You stayed under budget, but using a single t2.micro for 10k users will crash.",
                "tip": "Consider scaling horizontally."
            }
        `;

        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        res.status(500).json({ success: false, message: "Audit failed." });
    }
};

// server/controllers/userController.js (or wherever your routes are)

exports.updateUserXP = async (req, res) => {
  const { clerkId, xp, action } = req.body;

  try {
    // 1. Find the user
    // 2. Use $inc to ATOMICALLY add the new XP (prevents overwriting)
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: clerkId },
      { $inc: { xp: xp } }, // $inc adds 'xp' amount to existing value
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true, newXP: updatedUser.xp });
  } catch (error) {
    console.error("XP Update Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// // --- Feature: Deploy Droid (Config Generator) ---
// exports.generateDeployConfig = async (req, res) => {
//     try {
//         const { stack, platform } = req.body; 
//         // stack: 'React', 'Node', 'Python'; platform: 'Vercel', 'Netlify', 'Docker'

//         const systemPrompt = "You are a DevOps Engineer. Output ONLY raw code (JSON/YAML/Dockerfile).";
//         const userPrompt = `
//             Generate the production configuration file for a "${stack}" project deploying to "${platform}".
            
//             - If Vercel: return valid vercel.json
//             - If Netlify: return valid netlify.toml
//             - If Docker: return valid Dockerfile
            
//             Do not add markdown formatting. Just the raw file content.
//         `;

//         const response = await callGroqAPI(systemPrompt, userPrompt);
//         // Groq sometimes wraps in markdown ```json ... ```, let's clean it if needed
//         const cleanResponse = response.replace(/```json|```yaml|```dockerfile|```/g, "").trim();

//         res.status(200).json({ success: true, data: cleanResponse });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Config generation failed." });
//     }
// };

// --- Feature: Resume Reactor (ATS Scanner) ---
exports.analyzeResume = async (req, res) => {
    try {
        const { resumeText, jobDescription } = req.body;

        const systemPrompt = "You are an ATS (Applicant Tracking System) AI. Output ONLY valid JSON.";
        const userPrompt = `
            Analyze this Resume against this Job Description.
            
            Resume: "${resumeText.substring(0, 2000)}..." 
            Job Description: "${jobDescription.substring(0, 2000)}..."
            
            Tasks:
            1. Calculate a Match Score (0-100).
            2. Find missing keywords (skills mentioned in Job but not in Resume).
            3. Find Red Flags (spelling, weak verbs, vague statements).
            4. Give a harsh but helpful summary.

            Return JSON:
            {
                "score": 65,
                "missingKeywords": ["Docker", "AWS", "Typescript"],
                "redFlags": ["Used 'responsible for' instead of action verbs", "Typo in 'Enginner'"],
                "summary": "Your resume is decent but fails to highlight cloud skills."
            }
        `;

        const jsonResponse = await callGroqAPI(systemPrompt, userPrompt);
        res.status(200).json({ success: true, data: JSON.parse(jsonResponse) });
    } catch (error) {
        res.status(500).json({ success: false, message: "ATS Scan failed." });
    }
};

// ... existing code ...

// ✅ NEW: Get Flashcards (Reads from the correct 'Flashcard' collection)
exports.getFlashcards = async (req, res) => {
  try {
    // Check for userId in either parameter location
    const userId = req.params.userId || req.params.clerkId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    console.log(`🔍 Fetching flashcards for: ${userId}`);

    // Query the separate Flashcard collection
    const cards = await Flashcard.find({ userId: userId }).sort({ createdAt: -1 });

    console.log(`✅ Found ${cards.length} cards`);
    res.json(cards);
  } catch (error) {
    console.error("❌ Get Flashcards Error:", error);
    res.status(500).json({ error: "Failed to fetch flashcards" });
  }
};