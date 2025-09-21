import React, { useState, useCallback } from 'react';
import { LessonCard } from './LessonCard';
import { AudioControlPanel } from './AudioControlPanel';
import { Icon } from './Icon';
import { useMicrophone } from '../hooks/useMicrophone';
import type { Lesson } from '../types';

interface StudentDashboardProps {
  lessons: Lesson[];
  onDownloadLesson: (id: number) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ lessons, onDownloadLesson }) => {
  const [isClassJoined, setIsClassJoined] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const { requestMicrophonePermission } = useMicrophone();

  const handleJoinClass = useCallback(async () => {
    setIsConnecting(true);
    const permission = await requestMicrophonePermission();
    if (permission === 'granted') {
      setTimeout(() => {
        setIsClassJoined(true);
        setIsConnecting(false);
      }, 2000);
    } else {
      alert('Microphone access is required to join the audio class. Please enable it in your browser settings.');
      setIsConnecting(false);
    }
  }, [requestMicrophonePermission]);

  const handleLeaveClass = useCallback(() => {
    setIsClassJoined(false);
  }, []);

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Live Audio Classroom</h2>
            <p className="text-gray-600 mt-1">Join the ongoing class. Low bandwidth required.</p>
          </div>
          {!isClassJoined && (
            <button
              onClick={handleJoinClass}
              disabled={isConnecting}
              className="mt-4 md:mt-0 w-full md:w-auto flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <>
                  <Icon name="loader" className="animate-spin mr-2" />
                  Connecting...
                </>
              ) : (
                <>
                  <Icon name="phone" className="mr-2" />
                  Join Audio Class
                </>
              )}
            </button>
          )}
        </div>
        {isClassJoined && <AudioControlPanel onLeave={handleLeaveClass} />}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-200 pb-2">Available Lessons</h2>
        {lessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} onDownload={onDownloadLesson} />
        ))}
      </div>
    </>
  );
};
