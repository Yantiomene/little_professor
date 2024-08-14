import React from "react";

const Feedback = ({ feedback }) => {
  return (
    <div
      className={`feedback ${
        feedback.includes("Correct") ? "correct" : "incorrect"
      }`}
    >
      {feedback}
    </div>
  );
};

export default Feedback;
