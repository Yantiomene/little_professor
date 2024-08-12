import React, { useState } from "react";
import MathProblem from "../components/MathProblem";
import AnswerInput from "../components/AnswerInput";
import Feedback from "../components/Feedback";
import Header from "../components/Header";

const Game = () => {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [problem, setProblem] = useState("5 + 3"); // This is a placeholder value
  const [answer, setAnswer] = useState("");

  const handleNameSubmit = (name) => {
    setName(name);
  };

  const handleAnswerSubmit = (answer) => {
    if (answer === "8") {
      setFeedback("Correct! You're a math genius, " + name + "!");
    } else {
      setFeedback("Incorrect. Try again!");
    }
  };

  return (
    <div>
      <Header onNameSubmit={handleNameSubmit} />
      <MathProblem problem={problem} />
      <AnswerInput onSubmit={handleAnswerSubmit} />
      <Feedback feedback={feedback} />
    </div>
  );
};

export default Game;
