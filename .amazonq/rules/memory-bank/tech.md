# Mantis Technology Stack & Dependencies

## Core Technologies
- **React**: 19.2.0 (Latest stable with concurrent features)
- **Material UI**: 7.3.4 (Complete component library)
- **Vite**: 7.1.9 (Fast build tool and dev server)
- **React Router**: 7.9.4 (Client-side routing)

## UI & Styling
- **@mui/material**: 7.3.4 - Core Material UI components
- **@mui/lab**: 7.0.1-beta.18 - Experimental Material UI components
- **@mui/x-charts**: 8.14.0 - Advanced charting components
- **@emotion/react**: 11.14.0 - CSS-in-JS styling
- **@emotion/styled**: 11.14.1 - Styled components
- **@ant-design/icons**: 6.1.0 - Icon library
- **@ant-design/colors**: 7.2.1 - Color palette utilities

## State Management & Data Fetching
- **SWR**: 2.3.6 - Data fetching with caching and revalidation
- **React Context API** - Global state management
- **formik**: 2.4.6 - Form state management
- **yup**: 1.7.1 - Schema validation

## Development Tools
- **ESLint**: 9.37.0 - Code linting
- **Prettier**: 3.6.2 - Code formatting
- **@vitejs/plugin-react**: 5.0.4 - Vite React plugin
- **vite-jsconfig-paths**: 2.0.1 - Path alias support

## Utility Libraries
- **lodash-es**: 4.17.21 - Utility functions (ES modules)
- **framer-motion**: 12.23.24 - Animation library
- **react-number-format**: 5.4.4 - Number input formatting
- **react-device-detect**: 2.2.3 - Device detection
- **simplebar-react**: 3.3.2 - Custom scrollbars
- **web-vitals**: 5.1.0 - Performance monitoring

## Build Configuration
- **Package Manager**: Yarn 4.10.3
- **Build Target**: Modern browsers (>0.2% usage)
- **Development Server**: Vite dev server on port 3000
- **Code Splitting**: Automatic with Vite
- **Source Maps**: Enabled for debugging

## Development Commands
```bash
# Start development server
yarn start

# Build for production
yarn build

# Preview production build
yarn preview

# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Format code with Prettier
yarn prettier
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Environment Configuration
- **Base URL**: Configurable via VITE_APP_BASE_NAME
- **Development Port**: 3000 (configurable)
- **Environment Variables**: .env file support
- **Path Aliases**: JSConfig-based path resolution

## Performance Optimizations
- Tree shaking with Vite
- Code splitting by routes and components
- CSS code splitting
- Asset optimization (images, fonts)
- Console removal in production builds
- Dependency pre-bundling with Vite