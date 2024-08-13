import React, { useState, useEffect } from "react";

const UserProgress = ({ progress }) => {
  return (
    <div>
      {!progress && <p>Loading your progress...</p>}
      <h3>Your Progress</h3>
      {progress && (
        <div>
          <p>Level: {progress.level}</p>
          <p>
            Problems Solved:{" "}
            {progress.correct_answers + progress.incorrect_answers}
          </p>
          <p>Correct Answers: {progress.correct_answers}</p>
          <p>
            Accuracy:{" "}
            {Math.floor(
              (progress.correct_answers * 100) /
                (progress.correct_answers + progress.incorrect_answers)
            )}
            %
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProgress;
