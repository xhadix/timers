import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimer } from '../contexts/TimerContext';
import Header from '../components/common/Header';
import NavigationTabs from '../components/common/NavigationTabs';
import TimerCard from '../components/TimerList/TimerCard';
import SortModal from '../components/TimerList/SortModal';
import BottomNavigation from '../components/common/BottomNavigation';

type SortOption = 'recent' | 'oldest';

const TimerList: React.FC = () => {
  const { timers, startTimer, pauseTimer } = useTimer();
  const navigate = useNavigate();
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [activeTab, setActiveTab] = useState('odoo');

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

  const handlePlayPause = (timerId: string) => {
    const timer = timers.find(t => t.id === timerId);
    if (timer) {
      if (timer.isRunning) {
        pauseTimer(timerId);
      } else {
        startTimer(timerId);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#1d47ba] to-[#0e215a] text-white">
      <Header 
        title="Timesheets"
        onSortClick={() => setShowSortModal(true)}
        onAddClick={() => navigate('/create')}
      />

      <NavigationTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Content */}
      <div className="px-6 pb-24">
        <p className="text-white/80 mb-8 text-lg">You have {sortedTimers.length} Timers</p>
        
        {/* Timer List */}
        <div className="space-y-4">
          {sortedTimers.map((timer) => (
            <TimerCard 
              key={timer.id}
              timer={timer}
              onPlayPause={handlePlayPause}
            />
          ))}
        </div>
      </div>

      <BottomNavigation 
        activeTab="timesheets"
        onTabChange={(tab) => {
          if (tab === 'projects') navigate('/projects');
          if (tab === 'settings') navigate('/settings');
        }}
      />

      <SortModal 
        isOpen={showSortModal}
        currentSort={sortBy}
        onSortSelect={handleSortOptionSelect}
        onClose={() => setShowSortModal(false)}
      />
    </div>
  );
};

export default TimerList; 