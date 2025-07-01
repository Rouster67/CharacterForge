# D&D Stat Generator - Comparative Quiz

## Overview

This is a full-stack web application that generates balanced D&D ability scores through a 90-question comparative quiz system. The application presents users with scenario-based choices between different ability stats, then uses their preferences to generate fair and balanced character stats following official D&D point-buy rules.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks with local component state
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom D&D-themed color variables
- **Build Tool**: Vite with React plugin
- **Query Management**: TanStack React Query for API state management

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Development**: TSX for development server with hot reload
- **Production Build**: ESBuild for server bundling

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM with TypeScript-first schema definitions
- **Migrations**: Drizzle Kit for schema management
- **Session Storage**: Connect-pg-simple for PostgreSQL session storage
- **Development Storage**: In-memory storage implementation for local development

## Key Components

### Quiz System
- **Question Bank**: 90 pre-generated comparative questions covering all stat pairings
- **Question Generation**: Algorithmic pairing of stats with scenario-based choices
- **Progress Tracking**: Real-time progress indication and win counting per stat
- **State Management**: Local React state for quiz progression and results

### Stat Calculation Engine
- **Algorithm**: Direct port from C++ point-buy system ensuring D&D compliance
- **Cost Distribution**: Converts user preferences to target point weights (27 total)
- **Score Fitting**: Finds optimal stat scores closest to user preference distribution
- **Result Formatting**: Converts raw calculations to presentable character stats

### UI/UX Components
- **Welcome Screen**: Application introduction and feature explanation
- **Quiz Interface**: Interactive question presentation with stat-themed styling
- **Results Display**: Comprehensive stat breakdown with export functionality
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Schema Design
```typescript
// User management (basic auth ready)
users: { id, username, password }

// Quiz data structures
QuizQuestion: { id, statA, statB, optionA, optionB }
StatResult: { name, wins, percentage, finalScore, cost, color, icon }
```

## Data Flow

1. **Quiz Initialization**: Generate 90 questions covering all stat pair combinations
2. **User Interaction**: Present comparative choices, increment winning stat counters
3. **Stat Calculation**: Convert win distribution to D&D point-buy compliant scores
4. **Result Presentation**: Display final stats with breakdown and export options
5. **Reset Flow**: Allow quiz retaking with state cleanup

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **TypeScript**: Full TypeScript support across client/server/shared
- **Build Tools**: Vite, ESBuild, TSX for development workflow

### Database & ORM
- **Neon Database**: Serverless PostgreSQL for production
- **Drizzle ORM**: Type-safe database operations and migrations
- **Session Management**: PostgreSQL-backed session storage

### UI & Styling
- **Shadcn/ui**: Complete component library with Radix UI primitives
- **Tailwind CSS**: Utility-first styling with custom D&D theme
- **Lucide Icons**: Modern icon library for UI elements
- **Font Awesome**: Additional icons for D&D-themed elements

### Development Tools
- **Replit Integration**: Development environment optimizations
- **Hot Reload**: Vite HMR for rapid development iteration
- **Error Overlay**: Runtime error modal for development debugging

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express API proxy
- **Database**: Environment variable configuration for DATABASE_URL
- **Hot Reload**: Full-stack hot reloading with file watching

### Production Build
- **Client Build**: Vite production build to `dist/public`
- **Server Build**: ESBuild bundle to `dist/index.js`
- **Static Serving**: Express serves built client assets
- **Environment**: NODE_ENV-based configuration switching

### Database Management
- **Schema Migrations**: Drizzle Kit push command for schema updates
- **Connection Pooling**: Neon serverless handles connection management
- **Environment Variables**: Secure credential management via DATABASE_URL

## Changelog

Changelog:
- July 01, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.