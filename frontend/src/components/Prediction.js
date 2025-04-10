import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "How would you rate your stress level over the past week?",
    options: ["Low", "Moderate", "High", "Very High"]
  },
  {
    id: 2,
    question: "How often do you feel overwhelmed by your daily tasks?",
    options: ["Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 3,
    question: "How would you rate your sleep quality?",
    options: ["Excellent", "Good", "Fair", "Poor"]
  },
  {
    id: 4,
    question: "How often do you feel anxious or worried?",
    options: ["Rarely", "Sometimes", "Often", "Very Often"]
  },
  {
    id: 5,
    question: "How would you rate your overall mood?",
    options: ["Very Good", "Good", "Fair", "Poor"]
  }
];

// Assigning scores to responses
const scoreMapping = {
  "Low": 1, "Rarely": 1, "Excellent": 1, "Very Good": 1,
  "Moderate": 2, "Sometimes": 2, "Good": 2,
  "High": 3, "Often": 3, "Fair": 3,
  "Very High": 4, "Always": 4, "Poor": 4, "Very Often": 4
};

const Prediction = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [category, setCategory] = useState("");

  const handleAnswer = (answer) => {
    const updatedAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateCategory(updatedAnswers);
      setShowResult(true);
    }
  };

  // Function to calculate category based on responses
  const calculateCategory = (answers) => {
    let totalScore = Object.values(answers).reduce((sum, answer) => sum + scoreMapping[answer], 0);

    let resultCategory = "";
    if (totalScore <= 5) resultCategory = "Mild Stress and Anxiety";
    else if (totalScore <= 10) resultCategory = "Moderate Stress and Anxiety";
    else if (totalScore <= 15) resultCategory = "Severe Stress and Anxiety";
    else resultCategory = "Critical Stress and Anxiety";

    setCategory(resultCategory);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setCategory("");
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Your Mental Health Assessment
          </h2>
          <p className="text-gray-700 text-center text-lg font-semibold">
            <strong>Category:</strong> {category}
          </p>
          <p className="text-gray-600 mb-6 text-center">
            Based on your responses, we recommend scheduling a consultation with one of our mental health experts for a more detailed evaluation.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetTest}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            >
              Take Test Again
            </button>
            <button
              onClick={() => window.location.href = '/doctors'}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-200 rounded">
            <div
              className="h-full bg-indigo-600 rounded transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-center mt-2 text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left text-gray-900 bg-gray-50 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;