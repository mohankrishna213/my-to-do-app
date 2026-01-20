# Project Context

## Purpose
A task management application built with modern web technologies. The purpose is to provide users with a lightweight, fast, and responsive to-do list application with an optimal development experience using hot module reloading (HMR) and TypeScript for type safety.

## Tech Stack
- **Frontend Framework**: React 19.2.0 with TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4 with React plugin
- **Styling**: CSS modules (App.css, index.css)
- **Package Manager**: npm
- **Development Server**: Vite dev server with HMR support
- **Linting**: ESLint 9.39.1 with TypeScript and React hooks support
- **Type Checking**: TypeScript with strict mode

## Project Conventions

### Code Style
- **Language**: TypeScript for all source files (.ts, .tsx)
- **File Naming**: PascalCase for React components (e.g., App.tsx), camelCase for utilities
- **Formatting**: Enforced via ESLint with typescript-eslint rules
- **React Hooks**: Prefer functional components with hooks (useState, etc.)
- **Imports**: ES6 module syntax with absolute imports from project root
- **CSS**: Component-scoped CSS files alongside component files

### Architecture Patterns
- **Component Structure**: Functional React components organized in src/ directory
- **Single Entry Point**: main.tsx as the application entry point
- **Modular CSS**: One CSS file per major component (App.css for main component)
- **State Management**: React hooks (useState) for local component state; extend as needed for shared state
- **Asset Handling**: Static assets in public/ directory, bundled assets in src/assets/

### Testing Strategy
- Currently no test setup configured; tests should be added as the project grows
- Recommended: Jest with React Testing Library for component testing
- Focus on integration tests for user interactions

### Git Workflow
- Use conventional commits with clear, descriptive messages
- Branch naming: feature/*, bugfix/*, docs/* for clarity
- Code review before merging to main branch
- Keep commit history clean and meaningful

## Domain Context
This is a to-do application project. Key domain concepts:
- Tasks/todos as the primary entity (likely with properties like id, title, completed status, etc.)
- User-facing features should support CRUD operations on tasks
- Performance and responsiveness are important for good UX

## Important Constraints
- Must maintain fast build and dev server performance (Vite priority)
- TypeScript strict mode should be enforced for type safety
- Hot Module Reloading (HMR) should work seamlessly during development
- Mobile-friendly responsive design

## External Dependencies
- **React** (^19.2.0): UI library from npm registry
- **Vite plugins**: @vitejs/plugin-react for React integration
- **ESLint ecosystem**: Multiple packages for code quality
- **TypeScript**: Type definitions for React (@types/react, @types/react-dom)
