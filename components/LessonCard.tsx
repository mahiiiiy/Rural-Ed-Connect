import React from 'react';
import type { Lesson } from '../types';
import { Icon } from './Icon';

interface LessonCardProps {
  lesson: Lesson;
  onDownload: (id: number) => void;
  isTeacherView?: boolean;
}

const DownloadButton: React.FC<{ status: Lesson['status']; onClick: () => void }> = ({ status, onClick }) => {
  switch (status) {
    case 'downloading':
      return (
        <button
          disabled
          className="w-full sm:w-auto flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-md cursor-wait"
        >
          <Icon name="loader" className="animate-spin mr-2" />
          Downloading...
        </button>
      );
    case 'downloaded':
      return (
        <div className="w-full sm:w-auto flex items-center justify-center px-4 py-2 text-sm font-medium text-green-800 bg-green-100 rounded-md">
          <Icon name="checkCircle" className="mr-2" />
          Downloaded
        </div>
      );
    case 'idle':
    default:
      return (
        <button
          onClick={onClick}
          className="w-full sm:w-auto flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Icon name="download" className="mr-2" />
          Download
        </button>
      );
  }
};


export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onDownload, isTeacherView = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start">
            <div className='flex-grow'>
                <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{lesson.description}</p>
                <div className="flex items-center text-xs text-gray-500 mt-3">
                    <Icon name="clock" className="mr-1.5" />
                    <span>{lesson.duration}</span>
                </div>
            </div>
            {!isTeacherView && (
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                  <DownloadButton status={lesson.status} onClick={() => onDownload(lesson.id)} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
