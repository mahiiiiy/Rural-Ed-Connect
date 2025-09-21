import React, { useState } from 'react';
import type { Lesson } from '../types';
import { LessonCard } from './LessonCard';

interface TeacherDashboardProps {
  lessons: Lesson[];
  onAddLesson: (lesson: Omit<Lesson, 'id' | 'status'>) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ lessons, onAddLesson }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !duration) {
      alert('Please fill out all fields.');
      return;
    }
    onAddLesson({ title, description, duration });
    setTitle('');
    setDescription('');
    setDuration('');
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload New Lesson</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Lesson Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., Introduction to Algebra"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., Basics of variables and equations."
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., 45 min"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Upload Lesson
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-200 pb-2">Uploaded Lessons</h2>
        {lessons.length > 0 ? (
          lessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} onDownload={() => {}} isTeacherView />
          ))
        ) : (
          <p className="text-gray-500 mt-4">No lessons uploaded yet.</p>
        )}
      </div>
    </>
  );
};
