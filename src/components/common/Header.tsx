import React from 'react';

interface HeaderProps {
  title: string;
  onSortClick: () => void;
  onAddClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onSortClick, onAddClick }) => {
  return (
    <header className="flex justify-between items-center p-6 pb-4">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={onSortClick}
          className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
        </button>
        <button 
          onClick={onAddClick}
          className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header; 