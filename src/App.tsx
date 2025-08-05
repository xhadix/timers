import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TimerProvider } from './contexts/TimerContext';
import TimerList from './pages/TimerList';
import CreateTimer from './pages/CreateTimer';
import TaskDetails from './pages/TaskDetails';
import Projects from './pages/Projects';
import Settings from './pages/Settings';

function App() {
  return (
    <TimerProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-t from-[#1d47ba] to-[#0e215a]">
          <Routes>
            <Route path="/" element={<TimerList />} />
            <Route path="/create" element={<CreateTimer />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </TimerProvider>
  );
}

export default App; 