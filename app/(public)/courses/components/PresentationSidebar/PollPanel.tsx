// components/PresentationSidebar/PollPanel.tsx
import { BarChart2, Plus, Check } from "lucide-react";
import { useState } from "react";
import { Poll } from "./type";

type PollPanelProps = {
  polls: Poll[];
  onCreatePoll: (question: string, options: string[]) => void;
  onVote: (pollId: string, optionId: string) => void;
};

export default function PollPanel({
  polls,
  onCreatePoll,
  onVote,
}: PollPanelProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [activePoll, setActivePoll] = useState<string | null>(null);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && options.filter((opt) => opt.trim()).length >= 2) {
      onCreatePoll(
        question,
        options.filter((opt) => opt.trim())
      );
      setQuestion("");
      setOptions(["", ""]);
      setIsCreating(false);
    }
  };

  const totalVotes = (poll: Poll) => {
    return poll.options.reduce((sum, opt) => sum + opt.votes, 0);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Live Polls</h3>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="p-1 rounded-full bg-green-600 text-white hover:bg-green-700"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {isCreating ? (
          <form
            onSubmit={handleCreatePoll}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Poll Question
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none  text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Options
              </label>
              {options.map((opt, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none  text-sm"
                    required={index < 2}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddOption}
                className="text-xs text-green-600 hover:text-green-800 flex items-center mt-1"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add another option
              </button>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Poll
              </button>
            </div>
          </form>
        ) : polls.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            No active polls. Create one!
          </p>
        ) : (
          polls.map((poll) => (
            <div
              key={poll.id}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <h4 className="font-medium text-gray-800 mb-3">
                {poll.question}
              </h4>

              <div className="space-y-2 mb-3">
                {poll.options.map((option) => {
                  const votes = totalVotes(poll) || 1; // Avoid division by zero
                  const percentage = Math.round((option.votes / votes) * 100);

                  return (
                    <div key={option.id} className="relative">
                      <button
                        onClick={() => onVote(poll.id, option.id)}
                        className={`w-full text-left p-2 rounded-lg border ${
                          activePoll === poll.id
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{option.text}</span>
                          {activePoll === poll.id && (
                            <Check className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                      </button>

                      {activePoll === poll.id && (
                        <div className="mt-1">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{percentage}%</span>
                            <span>{option.votes} votes</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Total votes: {totalVotes(poll)}</span>
                <button
                  onClick={() =>
                    setActivePoll(activePoll === poll.id ? null : poll.id)
                  }
                  className="flex items-center text-green-600 hover:text-green-800"
                >
                  <BarChart2 className="w-3 h-3 mr-1" />
                  {activePoll === poll.id ? "Hide results" : "Show results"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
