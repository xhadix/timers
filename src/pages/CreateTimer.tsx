import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimer } from '../contexts/TimerContext';
import Header from '../components/common/Header';

interface FormData {
  title: string;
  description: string;
  projectId: string;
  deadline: string;
  isFavorite: boolean;
}

const CreateTimer: React.FC = () => {
  const navigate = useNavigate();
  const { addTimer } = useTimer();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    projectId: '',
    deadline: '',
    isFavorite: false
  });

  // Sample projects data
  const projects = [
    { id: '1', code: 'SO056', name: 'Booqio V2' },
    { id: '2', code: 'SO057', name: 'Booqio V3' },
    { id: '3', code: 'SO058', name: 'Mobile App' },
    { id: '4', code: 'SO059', name: 'Web Dashboard' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedProject = projects.find(p => p.id === formData.projectId);
    if (!selectedProject) return;

    addTimer({
      title: formData.title,
      description: formData.description,
      project: selectedProject,
      deadline: formData.deadline,
      isFavorite: formData.isFavorite,
      isRunning: false,
      totalTime: 0
    });

    navigate('/');
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#1d47ba] to-[#0e215a] text-white">
      <Header 
        title="Create Timer"
        onSortClick={() => {}}
        onAddClick={() => {}}
        showBackButton
        onBackClick={() => navigate('/')}
      />

      <div className="px-6 pb-24">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Timer Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white/40"
              placeholder="Enter timer title"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white/40 resize-none"
              placeholder="Enter timer description"
              rows={3}
            />
          </div>

          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Project</label>
            <select
              value={formData.projectId}
              onChange={(e) => handleInputChange('projectId', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
              required
            >
              <option value="" className="bg-[#1d47ba]">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id} className="bg-[#1d47ba]">
                  {project.code} - {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Deadline Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => handleInputChange('deadline', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
              required
            />
          </div>

          {/* Favorite Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="favorite"
              checked={formData.isFavorite}
              onChange={(e) => handleInputChange('isFavorite', e.target.checked)}
              className="w-5 h-5 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="favorite" className="text-sm font-medium">
              Mark as favorite
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg px-6 py-3 font-medium text-white transition-colors"
          >
            Create Timer
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTimer; 