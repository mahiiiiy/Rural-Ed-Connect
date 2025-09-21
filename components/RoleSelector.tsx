import React from 'react';
import { UserRole } from '../types';
import { Icon } from './Icon';

interface RoleSelectorProps {
  onSelectRole: (role: UserRole) => void;
}

const RoleCard: React.FC<{ role: UserRole; title: string; description: string; icon: React.ComponentProps<typeof Icon>['name']; onClick: (role: UserRole) => void }> = ({ role, title, description, icon, onClick }) => (
  <button
    onClick={() => onClick(role)}
    className="w-full md:w-80 p-8 text-left bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
  >
    <div className="flex items-center space-x-4">
      <div className="bg-blue-500 p-3 rounded-full">
        <Icon name={icon} className="text-white h-8 w-8" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  </button>
);

export const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelectRole }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">Welcome to Rural Ed Connect</h2>
        <p className="mt-2 text-lg text-gray-600">Please select your role to continue.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <RoleCard 
          role="student" 
          title="I'm a Student" 
          description="Join classes and download lessons." 
          icon="book"
          onClick={onSelectRole} 
        />
        <RoleCard 
          role="teacher" 
          title="I'm a Teacher" 
          description="Upload and manage lessons." 
          icon="upload"
          onClick={onSelectRole} 
        />
      </div>
    </div>
  );
};
