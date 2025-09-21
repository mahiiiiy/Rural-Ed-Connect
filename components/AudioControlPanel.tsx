
import React, { useState } from 'react';
import { Icon } from './Icon';

interface AudioControlPanelProps {
  onLeave: () => void;
}

export const AudioControlPanel: React.FC<AudioControlPanelProps> = ({ onLeave }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="relative flex items-center justify-center h-10 w-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-8 w-8 bg-green-500"></span>
          </div>
          <span className="ml-3 font-semibold text-green-800">Connected to Live Class</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMute}
            className={`flex items-center justify-center h-12 w-12 rounded-full transition-colors ${
              isMuted ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <Icon name="micOff" className="text-white" /> : <Icon name="mic" className="text-white" />}
          </button>
          <button
            onClick={onLeave}
            className="flex items-center justify-center h-12 w-12 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors"
            aria-label="Leave class"
          >
            <Icon name="phoneOff" />
          </button>
        </div>
      </div>
    </div>
  );
};
