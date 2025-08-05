# Timer Application

A ReactJS timer application built with TypeScript, TailwindCSS, and React Context for state management.

## Features

- **Timer List Screen**: Display list of timers with project details and ongoing timers
- **Create Timer Screen**: Form to create new timers with project and task selection
- **Task Details Screen**: Detailed view of tasks with timesheet functionality
- **State Management**: React Context for global state management
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Navigation**: React Router for seamless navigation between screens

## Technology Stack

- React 19.1.1
- TypeScript 5.9.2
- TailwindCSS 4.1.11
- React Router DOM 7.7.1
- Vite 7.0.6

## Project Structure

```
src/
├── components/
│   ├── TimerList/
│   ├── CreateTimer/
│   ├── TaskDetails/
│   └── common/
├── contexts/
│   └── TimerContext.tsx
├── types/
│   └── index.ts
├── utils/
│   └── timeUtils.ts
├── pages/
│   ├── TimerList.tsx
│   ├── CreateTimer.tsx
│   └── TaskDetails.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone git@github.com:xhadix/timers.git
cd fleek
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Development Approach

This project follows a step-by-step development approach:

1. **Templating First**: Basic layout and structure
2. **Breakdown to Components**: Extract reusable components
3. **Use React Context**: Implement state management
4. **Implement Functionality**: Add timer logic and interactions

## UI/UX Features

- **Gradient Background**: From bottom #1d47ba to top #0e215a
- **Header Layout**: Page name on left, action buttons on right
- **Timer Cards**: Left content (title, project, timeline) and right section (ongoing timer)
- **Navigation**: Timer-focused navigation with bottom navigation bar
- **Responsive Design**: Mobile-first approach with TailwindCSS

## State Management

The application uses React Context for state management with the following features:

- Timer CRUD operations
- Timer state management (running, paused, completed)
- Real-time timer updates
- Global state synchronization across components


AI Usage Documentations
https://github.com/xhadix/timers/blob/main/AI_USAGE.md