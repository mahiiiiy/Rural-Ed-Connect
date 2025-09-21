import React from 'react';
import { Icon } from './Icon';
import type { UserRole } from '../types';

interface HeaderProps {
    role: UserRole | null;
    onSwitchRole: () => void;
}

export const Header: React.FC<HeaderProps> = ({ role, onSwitchRole }) => {
  return (
    <header className="bg-white shadow-sm border-b-2 border-blue-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
             <div className="bg-blue-500 p-2 rounded-full">
                <Icon name="book" className="text-white h-6 w-6" />
             </div>
            <h1 className="text-xl font-bold text-gray-900">Rural Ed Connect</h1>
          </div>
          {role && (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600 capitalize bg-gray-100 px-3 py-1 rounded-full">{role} View</span>
              <button
                onClick={onSwitchRole}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                Switch Role
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
