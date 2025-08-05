import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTimer } from '../contexts/TimerContext';
import Header from '../components/common/Header';
import TimerCard from '../components/TimerList/TimerCard';

const TaskDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { timers, startTimer, pauseTimer, stopTimer } = useTimer();
  const [activeTab, setActiveTab] = useState<'details' | 'timesheets'>('details');

  const timer = timers.find(t => t.id === id);

  if (!timer) {
    return (
      <div className="min-h-screen bg-gradient-to-t from-[#1d47ba] to-[#0e215a] text-white">
        <Header 
          title="Task Details"
          onSortClick={() => {}}
          onAddClick={() => {}}
          showBackButton
          onBackClick={() => navigate('/')}
        />
        <div className="px-6">
          <p className="text-center text-white/80">Timer not found</p>
        </div>
      </div>
    );
  }

  const handlePlayPause = (timerId: string) => {
    if (timer.isRunning) {
      pauseTimer(timerId);
    } else {
      startTimer(timerId);
    }
  };

  const handleStop = () => {
    stopTimer(timer.id);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#1d47ba] to-[#0e215a] text-white">
      <Header 
        title="Task Details"
        onSortClick={() => {}}
        onAddClick={() => {}}
        showBackButton
        onBackClick={() => navigate('/')}
      />

      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="flex gap-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 font-medium transition-colors ${
              activeTab === 'details'
                ? 'border-b-2 border-white font-semibold text-white'
                : 'text-white/60'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('timesheets')}
            className={`pb-3 font-medium transition-colors ${
              activeTab === 'timesheets'
                ? 'border-b-2 border-white font-semibold text-white'
                : 'text-white/60'
            }`}
          >
            Timesheets
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-24">
        {activeTab === 'details' ? (
          <div className="space-y-6">
            {/* Task Info */}
            <div className="bg-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">{timer.title}</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  <span className="text-white/80">{timer.project.code} - {timer.project.name}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white/80">Deadline: {timer.deadline}</span>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-white/80">Assigned to: John Doe</span>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white/80">Status: {timer.status}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-white/80 leading-relaxed">
                {timer.description || 'No description provided'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Timer Display */}
            <div className="bg-white/10 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">
                  {formatTime(timer.elapsedTime)}
                </div>
                <div className="text-white/60">Elapsed Time</div>
              </div>

              {/* Timer Controls */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handlePlayPause(timer.id)}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-colors"
                >
                  {timer.isRunning ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Play</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleStop}
                  className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 px-6 py-3 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Stop</span>
                </button>
              </div>
            </div>

            {/* Timer Info */}
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Timer Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Status:</span>
                  <span className="text-white">{timer.status}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/60">Total Time:</span>
                  <span className="text-white">{formatTime(timer.totalTime)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/60">Elapsed Time:</span>
                  <span className="text-white">{formatTime(timer.elapsedTime)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/60">Remaining Time:</span>
                  <span className="text-white">{formatTime(timer.totalTime - timer.elapsedTime)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetails; 