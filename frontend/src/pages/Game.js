import React, { useState, useEffect } from "react";
import MathProblem from "../components/MathProblem";
import AnswerInput from "../components/AnswerInput";
import Feedback from "../components/Feedback";
import Header from "../components/Header";
import { fetchQuestion, submitAnswer, getProgress } from "../api/api";
import UserProgress from "../components/UserProgress";
import Footer from "../components/Footer";
import "./Game.css";

const feedbackMessages = [
  "Correct! You are amazing!",
  "Correct! You are doing great!",
  "Correct! Keep going!",
  "Correct! You are doing fantastic!",
  "Correct! You are doing awesome!",
  "Correct! You are on fire!",
  "Correct! You are on a roll!",
  "Correct! You are a math genius!",
  "Correct! You are unstoppable!",
  "Correct! You are a math wizard!",
  "Correct! You are a math whiz!",
  "Correct! You are a math master!",
  "Correct! You are a math star!",
  "Correct! You are a math champion!",
  "Correct! You are a math expert!",
  "Correct! You are a math pro!",
  "Correct! You are a math guru!",
];

const Game = ({ userId }) => {
  const [feedback, setFeedback] = useState(null);
  const [problem, setProblem] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const getQuestion = async () => {
      const question = await fetchQuestion(userId);
      setProblem(question.problem);
    };
    getQuestion();
  }, [userId]);

  useEffect(() => {
    const fetchProgress = async () => {
      const progress = await getProgress(userId);
      setProgress(progress);
    };
    fetchProgress();
  }, [userId]);

  const handleAnswerSubmit = async (answer) => {
    const result = await submitAnswer(userId, problem, answer);
    const newProgress = await getProgress(userId);
    setProgress(newProgress);
    if (result.correct_answer) {
      const feedbackMessage =
        feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
      setFeedback(feedbackMessage);
      const newProblem = await fetchQuestion(userId);
      setProblem(newProblem.problem);
    } else {
      setFeedback(answer + "....is incorrect! Try again!");
    }
  };

  return (
    <div>
      <Header className="header" userId={userId} />
      <div className="problem">
        {problem && <MathProblem problem={problem} />}
      </div>
      <div className="answer">
        <AnswerInput onSubmit={handleAnswerSubmit} />
      </div>
      <div className="ans-feedback">
        {feedback && <Feedback feedback={feedback} />}
      </div>
      <div className="user-progress">
        <UserProgress progress={progress} />
      </div>
      <Footer />
    </div>
  );
};

export default Game;
