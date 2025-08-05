import React from 'react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'favorites', label: 'Favorites' },
    { id: 'odoo', label: 'Odoo' },
    { id: 'local', label: 'Local' }
  ];

  return (
    <div className="px-6 mb-8">
      <div className="flex gap-8 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-3 font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-white font-semibold text-white'
                : 'text-white/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs; 