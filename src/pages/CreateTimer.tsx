import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTimer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-primary text-white p-6">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/')}
          className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Create Timer</h1>
      </div>
      
      <div className="bg-white/10 rounded-lg p-6">
        <p className="text-center text-white/80">Create Timer Form - Coming Soon</p>
      </div>
    </div>
  );
};

export default CreateTimer; 