export interface Timer {
  id: string;
  title: string;
  project: Project;
  deadline: string;
  isFavorite: boolean;
  isRunning: boolean;
  elapsedTime: number; // in seconds
  totalTime: number; // in seconds
  status: 'running' | 'paused' | 'completed' | 'stopped';
}

export interface Project {
  id: string;
  code: string;
  name: string;
}

export interface Task {
  id: string;
  name: string;
  projectId: string;
}

export interface TimerContextType {
  timers: Timer[];
  addTimer: (timer: Omit<Timer, 'id' | 'elapsedTime' | 'status'>) => void;
  updateTimer: (id: string, updates: Partial<Timer>) => void;
  deleteTimer: (id: string) => void;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  stopTimer: (id: string) => void;
  getRunningTimer: () => Timer | null;
} 