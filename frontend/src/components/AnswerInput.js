import React, { useState } from "react";

const AnswerInput = ({ onSubmit }) => {
  const [answer, setAnswer] = useState("");
  const clickSound = new Audio(require("../assets/sounds/click.mp3"));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answer);
    clickSound
      .play()
      .catch((error) => console.error("Error playing sound:", error));
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Enter your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AnswerInput;
