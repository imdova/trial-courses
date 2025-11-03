/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';

const days = [
  { letter: 'M', name: 'Monday' },
  { letter: 'T', name: 'Tuesday' },
  { letter: 'W', name: 'Wednesday' },
  { letter: 'T', name: 'Thursday' },
  { letter: 'F', name: 'Friday' },
  { letter: 'S', name: 'Saturday' },
  { letter: 'S', name: 'Sunday' }
];

export default function LearningPlan() {
  const [selectedDays, setSelectedDays] = useState<number[]>([0]); // Monday selected by default
  const [commitment, setCommitment] = useState(1);

  const toggleDay = (index: number) => {
    setSelectedDays(prev => 
      prev.includes(index) 
        ? prev.filter(day => day !== index)
        : [...prev, index]
    );
  };

  const getCommitmentText = () => {
    const dayCount = selectedDays.length;
    const dayText = dayCount === 1 ? 'day' : 'days';
    return `I'm committed to learning ${dayCount} ${dayText} a week on Medicova.`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-4">
      <h3 className="text-lg font-bold text-gray-900 mb-3">Learning plan</h3>
      
      <p className="text-sm text-gray-600 mb-6">
        {getCommitmentText()}
      </p>
      
      <div className="flex gap-3 mb-6">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => toggleDay(index)}
            className={`
              w-14 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors
              ${selectedDays.includes(index)
                ? 'bg-green-100 border-green-500 text-green-800'
                : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
              }
            `}
            title={day.name}
          >
            {day.letter}
          </button>
        ))}
      </div>
      
      {/* <button className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors flex items-center gap-1">
        <Edit3 size={14} />
        Edit my learning plan
      </button> */}
    </div>
  );
}
