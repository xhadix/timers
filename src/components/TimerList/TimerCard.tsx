import React from 'react';
import { Timer } from '../../types';

interface TimerCardProps {
  timer: Timer;
  onPlayPause: (timerId: string) => void;
}

const TimerCard: React.FC<TimerCardProps> = ({ timer, onPlayPause }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/10 rounded-lg p-4">
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
            <div className="text-sm font-medium text-white">
              {formatTime(timer.elapsedTime)}
            </div>
          </div>
          <button 
            onClick={() => onPlayPause(timer.id)}
            className="text-white/80"
          >
            {timer.isRunning ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerCard; 