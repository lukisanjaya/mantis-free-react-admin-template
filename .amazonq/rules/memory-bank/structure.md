# Mantis Project Structure & Architecture

## Root Directory Structure
```
mantis-free-react-admin-template/
├── src/                    # Main source code
├── .amazonq/              # Amazon Q configuration
├── .github/               # GitHub workflows and templates
├── package.json           # Dependencies and scripts
├── vite.config.mjs        # Vite build configuration
├── eslint.config.mjs      # ESLint configuration
└── README.md              # Project documentation
```

## Core Source Architecture (`src/`)

### Application Entry Points
- `index.jsx` - React application entry point
- `App.jsx` - Main application component with routing
- `config.js` - Application configuration constants

### Feature Organization
```
src/
├── api/                   # API service layer
├── assets/                # Static assets (images, styles)
├── components/            # Reusable UI components
├── contexts/              # React context providers
├── hooks/                 # Custom React hooks
├── layout/                # Layout components (Auth, Dashboard)
├── menu-items/            # Navigation menu definitions
├── pages/                 # Page components by feature
├── routes/                # Routing configuration
├── sections/              # Page section components
├── themes/                # Material UI theme configuration
└── utils/                 # Utility functions and helpers
```

### Component Architecture Patterns

#### Layout System
- `layout/Dashboard/` - Main dashboard layout with sidebar and header
- `layout/Auth/` - Authentication pages layout
- Responsive design with Material UI breakpoints

#### Page Structure
- `pages/` organized by feature domains (dashboard, auth, products, recipes, todos)
- Each feature has dedicated subdirectories for related pages
- Consistent page component structure with Material UI integration

#### Navigation System
- `menu-items/` contains modular menu configurations
- Dynamic menu rendering with icons and nested structures
- Route-based navigation with React Router integration

#### Component Hierarchy
- `components/` for shared, reusable components
- `sections/` for page-specific component compositions
- `@extended/` for enhanced/customized Material UI components

### State Management Architecture
- React Context API for global state (`contexts/`)
- SWR for server state management and caching
- Local state with React hooks for component-level state

### Theming & Styling
- Material UI theme system with custom overrides
- Centralized theme configuration in `themes/`
- Color utilities and design tokens
- CSS-in-JS approach with emotion/styled

### Build & Development
- Vite for fast development and optimized builds
- ESLint + Prettier for code quality
- JSConfig for path aliases and IDE support
- Yarn package manager with workspace support