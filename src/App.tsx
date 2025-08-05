import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TimerProvider } from './contexts/TimerContext';
import TimerList from './pages/TimerList';
import CreateTimer from './pages/CreateTimer';
import TaskDetails from './pages/TaskDetails';

function App() {
  return (
    <TimerProvider>
      <Router>
        <div className="min-h-screen bg-gradient-primary">
          <Routes>
            <Route path="/" element={<TimerList />} />
            <Route path="/create" element={<CreateTimer />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Routes>
        </div>
      </Router>
    </TimerProvider>
  );
}

export default App; 