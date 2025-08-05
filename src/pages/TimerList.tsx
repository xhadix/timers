import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimer } from '../contexts/TimerContext';

type SortOption = 'recent' | 'oldest';

const TimerList: React.FC = () => {
  const { timers } = useTimer();
  const navigate = useNavigate();
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  // Sort timers based on selected option
  const sortedTimers = [...timers].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      case 'oldest':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      default:
        return 0;
    }
  });

  const handleSortOptionSelect = (option: SortOption) => {
    setSortBy(option);
    setShowSortModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#1d47ba] to-[#0e215a] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Timesheets</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowSortModal(true)}
            className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </button>
          <button 
            onClick={() => navigate('/create')}
            className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="px-6 mb-8">
        <div className="flex gap-8 border-b border-white/10">
          <button className="pb-3 border-b-2 border-white font-semibold text-white">Odoo</button>
          <button className="pb-3 text-white/60 font-medium">Favorites</button>
          <button className="pb-3 text-white/60 font-medium">Local</button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-24">
        <p className="text-white/80 mb-8 text-lg">You have {timers.length} Timers</p>
        
        {/* Timer List */}
        <div className="space-y-4">
          {sortedTimers.map((timer) => (
            <div key={timer.id} className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {/* Timer Title and Checkbox */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-4 h-4 border border-white/60 rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-white/40 rounded-sm"></div>
                    </div>
                    <span className="font-medium text-white">{timer.title}</span>
                  </div>
                  
                  {/* Project Info */}
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                    <span className="text-sm text-white/70">{timer.project.code} - {timer.project.name}</span>
                  </div>
                  
                  {/* Deadline Info */}
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-white/60">Deadline {timer.deadline}</span>
                  </div>
                </div>
                
                {/* Timer Display */}
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 rounded-full px-4 py-2 text-center min-w-[80px]">
                    <div className="text-sm font-medium text-white">00:30</div>
                  </div>
                  <button className="text-white/80">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center gap-1 text-black bg-white px-4 py-2 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium">Timesheets</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-black bg-gray-200 px-4 py-2 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            <span className="text-xs font-medium">Projects</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-black bg-gray-200 px-4 py-2 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* Sort Modal */}
      {showSortModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end">
          <div className="bg-[#1d47ba] w-full rounded-t-3xl p-6 pb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Sort by</h3>
              <button 
                onClick={() => setShowSortModal(false)}
                className="text-white/60"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => handleSortOptionSelect('recent')}
                className="w-full flex items-center justify-between p-4 bg-white/10 rounded-lg"
              >
                <span className="text-white font-medium">Recent</span>
                {sortBy === 'recent' && (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                )}
              </button>
              
              <button 
                onClick={() => handleSortOptionSelect('oldest')}
                className="w-full flex items-center justify-between p-4 bg-white/10 rounded-lg"
              >
                <span className="text-white font-medium">Oldest</span>
                {sortBy === 'oldest' && (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerList; 