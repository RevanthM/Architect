# Overview

This is a full-stack TypeScript application called "SCE Architecture" that provides enterprise architecture tools for generating business documents and performing project assessments. The application features a React frontend with a comprehensive UI component library, an Express.js backend, and PostgreSQL database integration using Drizzle ORM.

The platform offers six main tools:
- **BRD Generator**: Creates Business Requirements Documents
- **AVD Generator**: Generates Architecture Vision Documents  
- **SAD Generator**: Produces Solution Architecture Documents
- **SES Generator**: Creates Security & Compliance documents
- **QDRT Scorer**: Quality Design Review Tester for architecture evaluation
- **Project Estimator**: Provides project cost and timeline estimates

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development/build tooling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and API interactions
- **UI Framework**: Comprehensive component library built on Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with custom enterprise color palette and CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation schemas

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design with `/api` prefix for all endpoints
- **Middleware**: Request logging, JSON parsing, and error handling middleware
- **Development**: Hot reload via Vite integration in development mode

## Data Storage
- **Database**: PostgreSQL with Neon serverless driver (@neondatabase/serverless)
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Design**: Three main entities:
  - `users`: User authentication and profiles
  - `documents`: Generated business documents (BRD, AVD, SAD, SES)
  - `assessments`: Project assessments and scoring data (QDRT, Estimator)
- **Validation**: Zod schemas for runtime type validation integrated with Drizzle
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

## Authentication & Authorization
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **User Model**: Username/password authentication with unique constraints
- **Security**: Input validation, SQL injection prevention via ORM, and session-based auth

## Build & Deployment
- **Development**: Concurrent client/server development with Vite HMR
- **Build Process**: 
  - Frontend: Vite builds React app to `dist/public`
  - Backend: esbuild bundles server code to `dist/index.js`
- **Static Assets**: Express serves built frontend in production
- **Environment**: Environment-based configuration for database connections

# External Dependencies

## Database Services
- **Neon PostgreSQL**: Serverless PostgreSQL database hosting
- **Database URL**: Required environment variable for connection string

## UI Component Libraries
- **Radix UI**: Comprehensive set of accessible UI primitives for modals, dropdowns, forms, and navigation
- **Lucide React**: Modern icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel/slider component

## Development Tools
- **Vite**: Fast build tool with HMR and React plugin
- **Replit Integration**: Runtime error overlay and cartographer for Replit environment
- **TypeScript**: Full type safety across frontend, backend, and shared schemas

## Form & Validation
- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: Runtime type validation and schema definition
- **Hookform Resolvers**: Integration between React Hook Form and Zod

## Styling & UI
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Class Variance Authority**: Type-safe variant API for component styling
- **Date-fns**: Modern date utility library for formatting and manipulation

## Backend Dependencies
- **Express.js**: Web application framework for Node.js
- **Connect-pg-simple**: PostgreSQL session store for Express sessions
- **Drizzle Kit**: CLI tools for database migrations and schema management