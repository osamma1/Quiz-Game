import React, { useState, useEffect } from "react";
import "./Quiz.css";

const questions = [
  {
    questionText: "What does HTML stand for?",
    answerOptions: [
      { answerText: "Hyper Text Markup Language", isCorrect: true },
      { answerText: "High-Level Text Markup Language", isCorrect: false },
      { answerText: "Hyperlink and Text Markup Language", isCorrect: false },
      { answerText: "None of the above", isCorrect: false },
    ],
  },
  {
    questionText: "Which of the following is a CSS framework?",
    answerOptions: [
      { answerText: "Bootstrap", isCorrect: true },
      { answerText: "jQuery", isCorrect: false },
      { answerText: "PHP", isCorrect: false },
      { answerText: "Angular", isCorrect: false },
    ],
  },
  {
    questionText: "What does CSS stand for?",
    answerOptions: [
      { answerText: "Cascading Style Sheets", isCorrect: true },
      { answerText: "Computer Style Sheets", isCorrect: false },
      { answerText: "Creative Style Sheets", isCorrect: false },
      { answerText: "Colorful Style Sheets", isCorrect: false },
    ],
  },
  {
    questionText: "Which HTML tag is used to define an internal style sheet?",
    answerOptions: [
      { answerText: "<style>", isCorrect: true },
      { answerText: "<css>", isCorrect: false },
      { answerText: "<script>", isCorrect: false },
      { answerText: "<link>", isCorrect: false },
    ],
  },
  {
    questionText:
      "Which of the following is used to select elements with a specific class in CSS?",
    answerOptions: [
      { answerText: "#classname", isCorrect: false },
      { answerText: ".classname", isCorrect: true },
      { answerText: "classname", isCorrect: false },
      { answerText: "*classname", isCorrect: false },
    ],
  },
  {
    questionText:
      "Which method is used to send data to the server in an AJAX request?",
    answerOptions: [
      { answerText: "GET", isCorrect: true },
      { answerText: "POST", isCorrect: true },
      { answerText: "PUT", isCorrect: false },
      { answerText: "Both A and B", isCorrect: false },
    ],
  },
  {
    questionText: "What is the purpose of the viewport meta tag in HTML?",
    answerOptions: [
      { answerText: "To set the width of the page", isCorrect: false },
      {
        answerText: "To control the layout on mobile browsers",
        isCorrect: true,
      },
      { answerText: "To include external stylesheets", isCorrect: false },
      { answerText: "To optimize images for web", isCorrect: false },
    ],
  },
  {
    questionText: "Which language is primarily used for client-side scripting?",
    answerOptions: [
      { answerText: "HTML", isCorrect: false },
      { answerText: "CSS", isCorrect: false },
      { answerText: "JavaScript", isCorrect: true },
      { answerText: "PHP", isCorrect: false },
    ],
  },
  {
    questionText: "What is the purpose of the alt attribute in an <img> tag?",
    answerOptions: [
      { answerText: "To set the image source", isCorrect: false },
      {
        answerText: "To provide alternative text for the image",
        isCorrect: true,
      },
      { answerText: "To specify the image dimensions", isCorrect: false },
      { answerText: "To link the image to another page", isCorrect: false },
    ],
  },
  {
    questionText:
      "What is the main advantage of using a Content Management System (CMS)?",
    answerOptions: [
      {
        answerText: "Easier to manage content without coding knowledge",
        isCorrect: true,
      },
      { answerText: "Faster website loading times", isCorrect: false },
      { answerText: "Improved SEO out of the box", isCorrect: false },
      { answerText: "More secure websites", isCorrect: false },
    ],
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(null);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswerOptionClick(false);
    }

    const timer =
      timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setShowFeedback("Correct!");
    } else {
      setShowFeedback("Wrong!");
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setShowFeedback(null);
        setTimeLeft(10);
        setProgress(((nextQuestion + 1) / questions.length) * 100);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="header">
            <h1 className="quiz-title">Dynamic Quiz Game</h1>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
            <div className="timer">Time Left: {timeLeft}s</div>
          </div>

          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(option.isCorrect)}
                className="answer-btn"
              >
                {option.answerText}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div
              className={`feedback ${
                showFeedback === "Correct!" ? "correct" : "wrong"
              }`}
            >
              {showFeedback}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;