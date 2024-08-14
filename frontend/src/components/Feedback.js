import React, { useState, useEffect } from "react";

const Feedback = ({ feedback }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (feedback) {
      setShowFeedback(true);
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <div
      className={`feedback ${
        feedback.includes("Correct") ? "correct" : "incorrect"
      } ${showFeedback ? "show" : ""}`}
    >
      {feedback}
    </div>
  );
};

export default Feedback;
