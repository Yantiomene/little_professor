import React from "react";

const UserProgress = ({ progress }) => {
  return (
    <div className="progress">
      {!progress && <p>Loading your progress...</p>}
      <h3>Your Progress</h3>
      {progress && (
        <div>
          <div className="progress-item level">
            <div className="progress-item-text">Level</div>
            <div className="progress-item-icon">{progress.level}</div>
          </div>
          <div className="progress-item solved">
            <div className="progress-item-text">Problems Solved</div>
            <div className="progress-item-icon">
              {progress.correct_answers + progress.incorrect_answers}
            </div>
          </div>
          <div className="progress-item correct">
            <div className="progress-item-text">Correct Answers</div>
            <div className="progress-item-icon">{progress.correct_answers}</div>
          </div>

          <div className="progress-item">
            <div className="progress-accuracy-text">Accuracy</div>
            <div className="progress-accuracy-container">
              <div
                className="progress-bar"
                style={{
                  width: `${Math.floor(
                    (progress.correct_answers * 100) /
                      (progress.correct_answers + progress.incorrect_answers)
                  )}%`,
                }}
              >
                {Math.floor(
                  (progress.correct_answers * 100) /
                    (progress.correct_answers + progress.incorrect_answers)
                )}
                %
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProgress;
