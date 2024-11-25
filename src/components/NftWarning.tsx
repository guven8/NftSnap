import React, { useState, useEffect } from "react";

const NSFWWarning: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("nsfwAccepted");
    if (!hasAccepted) {
      setShowWarning(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("nsfwAccepted", "true"); // Save acceptance in localStorage
    setShowWarning(false);
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">NSFW Content Warning</h2>
        <p className="mb-4">
          Some NFTs displayed in this app may contain content that is not safe
          for work (NSFW). Viewer discretion is advised.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default NSFWWarning;
