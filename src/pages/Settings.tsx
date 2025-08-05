import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const settings = [
    { id: '1', title: 'Profile', icon: 'user', action: () => {} },
    { id: '2', title: 'Notifications', icon: 'bell', action: () => {} },
    { id: '3', title: 'Theme', icon: 'paint', action: () => {} },
    { id: '4', title: 'About', icon: 'info', action: () => {} }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'user':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'bell':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'paint':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#1d47ba] to-[#0e215a] text-white">
      <Header 
        title="Settings"
        onSortClick={() => {}}
        onAddClick={() => {}}
        showBackButton
        onBackClick={() => navigate('/')}
      />

      <div className="px-6 pb-24">
        <div className="space-y-4">
          {settings.map((setting) => (
            <button
              key={setting.id}
              onClick={setting.action}
              className="w-full bg-white/10 rounded-lg p-4 flex items-center justify-between hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center gap-3">
                {getIcon(setting.icon)}
                <span className="font-medium">{setting.title}</span>
              </div>
              <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <BottomNavigation 
        activeTab="settings"
        onTabChange={(tab) => {
          if (tab === 'timesheets') navigate('/');
          if (tab === 'projects') navigate('/projects');
        }}
      />
    </div>
  );
};

export default Settings; 