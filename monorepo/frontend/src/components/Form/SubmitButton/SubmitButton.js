import React from 'react';

function SubmitButton({ text, isDisabled }) {
  return (
    <button
      type="submit"
      className={`mt-6 text-white font-bold py-2 px-4 rounded-xl bg-[#07151E] ${
        isDisabled
          ? 'bg-blue-500 opacity-50 cursor-not-allowed pointer-events-none'
          : 'bg-blue-500 hover:bg-[#102535]'
      }`}
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {text}
    </button>
  );
}

export default SubmitButton;
