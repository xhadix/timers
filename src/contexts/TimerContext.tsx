import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Timer, TimerContextType } from '../types';

interface TimerState {
  timers: Timer[];
}

type TimerAction =
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'UPDATE_TIMER'; payload: { id: string; updates: Partial<Timer> } }
  | { type: 'DELETE_TIMER'; payload: string }
  | { type: 'START_TIMER'; payload: string }
  | { type: 'PAUSE_TIMER'; payload: string }
  | { type: 'STOP_TIMER'; payload: string }
  | { type: 'UPDATE_ELAPSED_TIME'; payload: { id: string; elapsedTime: number } };

const initialState: TimerState = {
  timers: [
    {
      id: '1',
      title: 'iOS app deployment',
      project: { id: '1', code: 'SO056', name: 'Booqio V2' },
      deadline: '07/20/2023',
      isFavorite: false,
      isRunning: false,
      elapsedTime: 0,
      totalTime: 1800, // 30 minutes
      status: 'stopped'
    },
    {
      id: '2',
      title: 'iOS app deployment with odd',
      project: { id: '2', code: 'SO057', name: 'Booqio V3' },
      deadline: '07/25/2023',
      isFavorite: true,
      isRunning: true,
      elapsedTime: 1800, // 30 minutes
      totalTime: 3600, // 1 hour
      status: 'running'
    },
    {
      id: '3',
      title: 'Android app testing',
      project: { id: '3', code: 'SO058', name: 'Mobile App' },
      deadline: '07/30/2023',
      isFavorite: true,
      isRunning: false,
      elapsedTime: 900, // 15 minutes
      totalTime: 2700, // 45 minutes
      status: 'paused'
    }
  ]
};

const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case 'ADD_TIMER':
      return {
        ...state,
        timers: [...state.timers, action.payload]
      };
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id
            ? { ...timer, ...action.payload.updates }
            : timer
        )
      };
    case 'DELETE_TIMER':
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.payload)
      };
    case 'START_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer => ({
          ...timer,
          isRunning: timer.id === action.payload,
          status: timer.id === action.payload ? 'running' : timer.status
        }))
      };
    case 'PAUSE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload
            ? { ...timer, isRunning: false, status: 'paused' }
            : timer
        )
      };
    case 'STOP_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload
            ? { ...timer, isRunning: false, status: 'completed' }
            : timer
        )
      };
    case 'UPDATE_ELAPSED_TIME':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id
            ? { ...timer, elapsedTime: action.payload.elapsedTime }
            : timer
        )
      };
    default:
      return state;
  }
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  // Timer tick effect
  useEffect(() => {
    const interval = setInterval(() => {
      state.timers.forEach(timer => {
        if (timer.isRunning && timer.status === 'running') {
          dispatch({
            type: 'UPDATE_ELAPSED_TIME',
            payload: { id: timer.id, elapsedTime: timer.elapsedTime + 1 }
          });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timers]);

  const addTimer = (timerData: Omit<Timer, 'id' | 'elapsedTime' | 'status'>) => {
    const newTimer: Timer = {
      ...timerData,
      id: Date.now().toString(),
      elapsedTime: 0,
      status: 'stopped',
      totalTime: timerData.totalTime || 0
    };
    dispatch({ type: 'ADD_TIMER', payload: newTimer });
  };

  const updateTimer = (id: string, updates: Partial<Timer>) => {
    dispatch({ type: 'UPDATE_TIMER', payload: { id, updates } });
  };

  const deleteTimer = (id: string) => {
    dispatch({ type: 'DELETE_TIMER', payload: id });
  };

  const startTimer = (id: string) => {
    // Stop all other timers first
    state.timers.forEach(timer => {
      if (timer.isRunning) {
        dispatch({ type: 'PAUSE_TIMER', payload: timer.id });
      }
    });
    dispatch({ type: 'START_TIMER', payload: id });
  };

  const pauseTimer = (id: string) => {
    dispatch({ type: 'PAUSE_TIMER', payload: id });
  };

  const stopTimer = (id: string) => {
    dispatch({ type: 'STOP_TIMER', payload: id });
  };

  const getRunningTimer = () => {
    return state.timers.find(timer => timer.isRunning) || null;
  };

  const value: TimerContextType = {
    timers: state.timers,
    addTimer,
    updateTimer,
    deleteTimer,
    startTimer,
    pauseTimer,
    stopTimer,
    getRunningTimer
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}; 