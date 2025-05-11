import React, { useState } from 'react';

type TutorialStep = {
  title: string;
  description: string;
  image: string; // Could be emoji or actual image paths
  buttonText?: string;
};

export const PongTutorial: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showTutorial, setShowTutorial] = useState<boolean>(true);

  const tutorialSteps: TutorialStep[] = [
    {
      title: "Welcome to Pong! 🎾",
      description: "Get ready for some classic paddle action! This tutorial will show you how to play this arcade masterpiece.",
      image: "🏓",
      buttonText: "Let's Go!"
    },
    {
      title: "Your Paddle 🏓",
      description: "Use the ↑ (up) and ↓ (down) arrow keys to move your paddle vertically. Keep that paddle moving!",
      image: "🔼🔽",
    },
    {
      title: "The Ball ⚽",
      description: "The ball will bounce around. Your goal is to hit it with your paddle and send it to your opponent's side!",
      image: "⚽",
    },
    {
      title: "Scoring 🎯",
      description: "Score points when the ball passes your opponent's paddle. First to 11 points wins!",
      image: "1️⃣1️⃣",
    },
    {
      title: "Power-ups! 💥",
      description: "Some versions have power-ups that can change paddle size, ball speed, or add fun effects!",
      image: "🌟✨",
    },
    {
      title: "Ready to Play? 🎮",
      description: "That's all there is to it! Simple, fun, and addictive. Let's get started!",
      image: "🚀",
      buttonText: "Start Game!"
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTutorial(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!showTutorial) {
    return (
      <button 
        onClick={() => setShowTutorial(true)}
        className="fixed bottom-4 right-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full shadow-lg border-4 border-black animate-bounce"
      >
        Show Tutorial Again 🎓
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl border-4 border-black shadow-2xl max-w-md w-full overflow-hidden animate-pop-in">
        {/* Comic-style header */}
        <div className="bg-yellow-400 p-4 border-b-4 border-black">
          <h2 className="text-3xl text-center font-extrabold text-black">
            {tutorialSteps[currentStep].title}
          </h2>
        </div>
        
        {/* Content area */}
        <div className="p-6 bg-white">
          <div className="text-9xl text-center mb-6 animate-wiggle">
            {tutorialSteps[currentStep].image}
          </div>
          <p className="text-sm text-center mb-6 text-gray-800">
            {tutorialSteps[currentStep].description}
          </p>
        </div>
        
        {/* Progress dots - comic style */}
        <div className="flex justify-center space-x-2 mb-4">
          {tutorialSteps.map((_, index) => (
            <div 
              key={index}
              className={`w-4 h-4 rounded-full ${index === currentStep ? 'bg-black' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between p-4 bg-gray-100 border-t-4 border-black">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-2 text-sm rounded-full cursor-pointer font-bold border-2 border-black shadow-md ${currentStep === 0 ? 'bg-gray-300 text-gray-500' : 'bg-blue-400 hover:bg-blue-500 text-black'}`}
          >
            ← Back
          </button>
          
          <button
            onClick={nextStep}
            className="px-6 py-2 text-sm bg-green-400 cursor-pointer hover:bg-green-500 text-black font-bold rounded-full border-2 border-black shadow-md transform transition-transform"
          >
            {tutorialSteps[currentStep].buttonText || 'Next'} →
          </button>
        </div>
      </div>
    </div>
  );
};