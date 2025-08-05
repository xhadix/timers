import React from 'react';

type SortOption = 'recent' | 'oldest';

interface SortModalProps {
  isOpen: boolean;
  currentSort: SortOption;
  onSortSelect: (option: SortOption) => void;
  onClose: () => void;
}

const SortModal: React.FC<SortModalProps> = ({ isOpen, currentSort, onSortSelect, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="bg-[#1d47ba] w-full rounded-t-3xl p-6 pb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Sort by</h3>
          <button 
            onClick={onClose}
            className="text-white/60"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <button 
            onClick={() => onSortSelect('recent')}
            className="w-full flex items-center justify-between p-4 bg-white/10 rounded-lg"
          >
            <span className="text-white font-medium">Recent</span>
            {currentSort === 'recent' && (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            )}
          </button>
          
          <button 
            onClick={() => onSortSelect('oldest')}
            className="w-full flex items-center justify-between p-4 bg-white/10 rounded-lg"
          >
            <span className="text-white font-medium">Oldest</span>
            {currentSort === 'oldest' && (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortModal; 