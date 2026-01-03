import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const QuizView = ({ quizData, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    
    // --- 🛡️ CRASH PROOF LOGIC START ---
    
    // 1. Get raw values safely (Optional chaining prevents crash if data is missing)
    const rawCorrect = quizData.questions[currentQuestion]?.answer;
    
    // 2. Debugging: Check your console to see what the AI actually sent
    console.log("🔍 Quiz Debug:", {
        userSelected: option,
        aiCorrectAnswer: rawCorrect
    });

    // 3. Normalize: Convert to String, Handle Nulls, Trim, Lowercase
    // String(val || "") prevents "Cannot read properties of undefined" error
    const cleanSelected = String(option || "").trim().toLowerCase();
    const cleanCorrect = String(rawCorrect || "").trim().toLowerCase();

    // 4. Compare
    if (cleanSelected === cleanCorrect) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    // --- 🛡️ CRASH PROOF LOGIC END ---
  };

  const handleNext = () => {
    // Calculate new score based on current state
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore); // Update state for UI
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      // Finished! Send the FINAL calculated score
      // We pass 'newScore' variable because state updates are async
      onComplete(newScore); 
    }
  };

  const question = quizData.questions[currentQuestion];

  return (
    <div className="p-6 h-full flex flex-col justify-center animate-in fade-in">
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs font-mono text-cyan-500 mb-4 uppercase tracking-widest">
          <span>Simulation Sequence</span>
          <span>{currentQuestion + 1} / {quizData.questions.length}</span>
        </div>
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-500 transition-all duration-500" 
            style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }} 
          />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-6 leading-relaxed">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !selectedOption && handleOptionClick(option)}
            disabled={selectedOption !== null}
            className={`w-full text-left p-4 rounded border transition-all flex justify-between items-center group
              ${selectedOption === option 
                ? (isCorrect 
                    ? 'bg-green-500/20 border-green-500 text-green-300' 
                    : 'bg-red-500/20 border-red-500 text-red-300')
                : 'bg-black/40 border-gray-700 hover:border-cyan-500 hover:bg-cyan-900/10 text-gray-300'}
            `}
          >
            <span className="font-mono text-sm">{option}</span>
            {selectedOption === option && (
              isCorrect ? <CheckCircle size={18} /> : <XCircle size={18} />
            )}
          </button>
        ))}
      </div>

      {selectedOption && (
        <div className="mt-8 animate-in slide-in-from-bottom-2 fade-in">
          <div className={`p-4 rounded text-sm mb-4 border ${isCorrect ? 'border-green-500/30 bg-green-900/20 text-green-200' : 'border-red-500/30 bg-red-900/20 text-red-200'}`}>
            <p className="font-bold mb-1">{isCorrect ? 'CORRECT' : 'INCORRECT'}</p>
            <p className="opacity-80">
                {isCorrect 
                    ? "System Logic Verified." 
                    : `Optimization Required. Answer: ${question.answer}`
                }
            </p>
          </div>
          
          <button 
            onClick={handleNext} 
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-3 rounded flex items-center justify-center gap-2 transition-all"
          >
            {currentQuestion + 1 === quizData.questions.length ? 'Complete Simulation' : 'Next Sequence'} <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizView;