import React from "react";

type QuizProgressProps = {
  score: number;
  questionsCorrect: number;
  totalQuestions: number;
  passingScore?: number;
  size?: number;
  strokeWidth?: number;
};

const QuizProgress: React.FC<QuizProgressProps> = ({
  score = 20,
  questionsCorrect = 2,
  totalQuestions = 10,
  passingScore = 70,
  size = 120,
  strokeWidth = 10,
}) => {
  const hasPassed = score >= passingScore;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const progressColor = hasPassed ? "text-green-500" : "text-red-500";

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Circular progress */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            className="text-gray-200"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress circle */}
          <circle
            className={`${progressColor} transition-all duration-500`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>

        {/* Percentage text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${progressColor}`}>
            {score}%
          </span>
        </div>
      </div>

      {/* Result message */}
      <h2
        className={`mt-4 text-lg font-semibold ${
          hasPassed ? "text-green-600" : "text-red-600"
        }`}>
        {hasPassed ? "Congratulations!" : "Better luck next time!"}
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        You need {passingScore}% to pass this quiz
      </p>

      {/* Score display */}
      <div className="mt-4 text-sm font-semibold text-gray-800">
        {questionsCorrect} / {totalQuestions}
        <span className="text-sm font-normal ml-2 text-gray-500">Points</span>
      </div>
    </div>
  );
};

export default QuizProgress;
