"use client";

interface FormNavigationProps {
  currentStep: number;
  prevStep: () => void;
  nextStep: () => void;
  isLastStep: boolean;
}

export default function FormNavigation({
  currentStep,
  prevStep,
  nextStep,
  isLastStep,
}: FormNavigationProps) {
  return (
    <div className="mt-4 flex justify-between rounded-lg border border-gray-200 px-6 py-4">
      <button
        type="button"
        onClick={prevStep}
        disabled={currentStep === 1}
        className={`inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none ${
          currentStep === 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        Previous
      </button>

      {!isLastStep ? (
        <button
          type="button"
          onClick={nextStep}
          className="bg-primary inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none"
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
        >
          Submit Academy
        </button>
      )}
    </div>
  );
}
