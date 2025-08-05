import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import BottomNavigation from '../components/common/BottomNavigation';

const Projects: React.FC = () => {
  const navigate = useNavigate();

  const projects = [
    { id: '1', code: 'SO056', name: 'Booqio V2', status: 'active' },
    { id: '2', code: 'SO057', name: 'Booqio V3', status: 'active' },
    { id: '3', code: 'SO058', name: 'Mobile App', status: 'completed' },
    { id: '4', code: 'SO059', name: 'Web Dashboard', status: 'active' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#1d47ba] to-[#0e215a] text-white">
      <Header 
        title="Projects"
        onSortClick={() => {}}
        onAddClick={() => {}}
        showBackButton
        onBackClick={() => navigate('/')}
      />

      <div className="px-6 pb-24">
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-white/70">{project.code}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {project.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation 
        activeTab="projects"
        onTabChange={(tab) => {
          if (tab === 'timesheets') navigate('/');
          if (tab === 'settings') navigate('/settings');
        }}
      />
    </div>
  );
};

export default Projects; 