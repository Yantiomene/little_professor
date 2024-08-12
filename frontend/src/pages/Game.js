import React, { useState, useEffect } from "react";
import MathProblem from "../components/MathProblem";
import AnswerInput from "../components/AnswerInput";
import Feedback from "../components/Feedback";
import Header from "../components/Header";
import { fetchQuestion, submitAnswer } from "../api/api";

const feedbackMessages = [
  "Correct! You are amazing!",
  "Correct! You are doing great!",
  "Correct! Keep going!",
  "Correct! You are on fire!",
  "Correct! You are a math genius!",
  "Correct! You are unstoppable!",
  "Correct! You are a math wizard!",
  "Correct! You are a math whiz!",
  "Correct! You are a math master!",
];

const Game = ({ userId }) => {
  const [feedback, setFeedback] = useState(null);
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const getQuestion = async () => {
      const question = await fetchQuestion(userId);
      setProblem(question.problem);
    };
    getQuestion();
  }, [userId]);

  const handleAnswerSubmit = async (answer) => {
    const result = await submitAnswer(userId, problem, answer);
    if (result.correct_answer) {
      const feedbackMessage =
        feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
      setFeedback(feedbackMessage);
      const newProblem = await fetchQuestion(userId);
      setProblem(newProblem.problem);
    } else {
      setFeedback("Incorrect! Try again!");
    }
  };

  return (
    <div>
      <Header userId={userId} />
      {problem && <MathProblem problem={problem} />}
      <AnswerInput onSubmit={handleAnswerSubmit} />
      {feedback && <Feedback feedback={feedback} />}
    </div>
  );
};

export default Game;
