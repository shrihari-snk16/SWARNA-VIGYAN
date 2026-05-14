import { motion } from 'framer-motion';
import { useState } from 'react';
import './Quiz.css';

const questions = [
  {
    question: "Which ancient Indian text extensively details the role of the 'Director of Mines' overseeing gold extraction?",
    options: ["Rigveda", "Arthashastra", "Mahabharata", "Sushruta Samhita"],
    answer: 1
  },
  {
    question: "What was the primary purpose of 'Sodhana' in ancient Indian gold metallurgy?",
    options: ["To increase the weight of gold", "To purify raw gold and remove toxic elements", "To melt gold into coins", "To paint gold onto temple walls"],
    answer: 1
  },
  {
    question: "Which metal was used extensively as an amalgamator to extract pure gold from crushed ores?",
    options: ["Copper (Tamra)", "Iron (Loha)", "Mercury (Parada)", "Silver (Rajata)"],
    answer: 2
  },
  {
    question: "What does the term 'Deha Vada' primarily refer to in the context of gold processing?",
    options: ["The medicinal application of gold for longevity", "A type of furnace", "A golden coin", "The god of metallurgy"],
    answer: 0
  },
  {
    question: "Which flux was commonly used during the smelting of gold to lower its melting point and remove oxide impurities?",
    options: ["Salt", "Sand", "Borax (Tankana)", "Charcoal"],
    answer: 2
  },
  {
    question: "In the context of ancient nanotechnology, what is 'Swarna Bhasma'?",
    options: ["A golden crown", "Colloidal gold nanoparticles", "A type of crucible", "A mining technique"],
    answer: 1
  },
  {
    question: "What element is considered the consort of Parada (Mercury) and is used to stabilize it during gold amalgamation?",
    options: ["Iron (Loha)", "Sulfur (Gandhaka)", "Tin (Vanga)", "Lead (Naga)"],
    answer: 1
  },
  {
    question: "What is an ancient Indian 'Musha'?",
    options: ["A heat-resistant crucible", "An alloy", "A purification herb", "A philosophical text"],
    answer: 0
  },
  {
    question: "To smelt volatile metals alongside gold, metallurgists at Zawar utilized which advanced technique centuries before the rest of the world?",
    options: ["Smelting", "Electrolysis", "Downward Distillation", "Cold working"],
    answer: 2
  },
  {
    question: "Through the grueling process of 'Marana', raw gold was transformed into what?",
    options: ["Jewelry", "Bio-absorbable therapeutic powders", "Swords", "Currency"],
    answer: 1
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (index) => {
    setSelectedOption(index);
    
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const getRank = (s) => {
    if (s >= 8) return "Master of the Gold Forge";
    if (s >= 5) return "Initiate Metallurgist";
    return "Novice Apprentice";
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  return (
    <motion.div 
      className="page-wrapper quiz-page container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="quiz-header">
        <h2 className="cinzel">The Metallurgist's Trial</h2>
        <p className="inter">Test your knowledge of Ancient Indian Gold Making</p>
      </div>

      <div className="quiz-container">
        {showResult ? (
          <motion.div 
            className="result-section"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="cinzel">Your Rank</h3>
            <h2 className="cinzel rank-text">{getRank(score)}</h2>
            <p className="score-text inter">You scored {score} out of {questions.length}</p>
            
            <div className="rank-description inter">
              {score >= 8 && "You have attained the supreme knowledge of gold extraction and purification. The ancient forge welcomes its new master."}
              {score >= 5 && score < 8 && "You understand the fundamentals of Sodhana and Marana. Continue your studies, adept."}
              {score < 5 && "The secrets of the ancient crucible still elude you. Return to the texts and try again."}
            </div>

            <button className="btn-gold restart-btn" onClick={resetQuiz}>
              Attempt Again
            </button>
          </motion.div>
        ) : (
          <motion.div 
            className="question-section"
            key={currentQuestion}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="question-count inter">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text cinzel">
              {questions[currentQuestion].question}
            </div>
            
            <div className="options-container">
              {questions[currentQuestion].options.map((option, index) => {
                let buttonClass = "option-btn inter";
                if (selectedOption !== null) {
                  if (index === questions[currentQuestion].answer) {
                    buttonClass += " correct";
                  } else if (index === selectedOption) {
                    buttonClass += " incorrect";
                  }
                }

                return (
                  <button 
                    key={index} 
                    className={buttonClass}
                    onClick={() => selectedOption === null && handleAnswer(index)}
                    disabled={selectedOption !== null}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
