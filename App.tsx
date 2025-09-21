import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { RoleSelector } from './components/RoleSelector';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import type { Lesson, UserRole } from './types';

const INITIAL_LESSONS: Lesson[] = [
  { id: 1, title: 'Introduction to Algebra', description: 'Basics of variables and equations.', duration: '45 min', status: 'idle' },
  { id: 2, title: 'The Water Cycle', description: 'Learn about evaporation and condensation.', duration: '30 min', status: 'idle' },
  { id: 3, title: 'Indian History: 1857-1947', description: 'The story of the freedom struggle.', duration: '60 min', status: 'idle' },
  { id: 4, title: 'Basics of English Grammar', description: 'Nouns, verbs, and adjectives.', duration: '50 min', status: 'idle' },
];

export default function App() {
  const [lessons, setLessons] = useState<Lesson[]>(INITIAL_LESSONS);
  const [role, setRole] = useState<UserRole | null>(null);

  const handleDownloadLesson = useCallback((lessonId: number) => {
    setLessons(prevLessons =>
      prevLessons.map(lesson =>
        lesson.id === lessonId ? { ...lesson, status: 'downloading' } : lesson
      )
    );

    setTimeout(() => {
      setLessons(prevLessons =>
        prevLessons.map(lesson =>
          lesson.id === lessonId ? { ...lesson, status: 'downloaded' } : lesson
        )
      );
    }, 2500);
  }, []);

  const handleAddLesson = useCallback((newLessonData: Omit<Lesson, 'id' | 'status'>) => {
    setLessons(prevLessons => {
      const newLesson: Lesson = {
        ...newLessonData,
        id: prevLessons.length > 0 ? Math.max(...prevLessons.map(l => l.id)) + 1 : 1,
        status: 'idle',
      };
      return [...prevLessons, newLesson];
    });
  }, []);

  const handleSwitchRole = useCallback(() => {
    setRole(null);
  }, []);
  
  const renderContent = () => {
    if (!role) {
      return <RoleSelector onSelectRole={setRole} />;
    }
    if (role === 'student') {
      return <StudentDashboard lessons={lessons} onDownloadLesson={handleDownloadLesson} />;
    }
    if (role === 'teacher') {
      return <TeacherDashboard lessons={lessons} onAddLesson={handleAddLesson} />;
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header role={role} onSwitchRole={handleSwitchRole} />
      <main className="max-w-4xl mx-auto p-4 md:p-6">
        {renderContent()}
      </main>
    </div>
  );
}
