# Mantis Development Guidelines & Patterns

## Code Quality Standards

### Import Organization (100% of files follow this pattern)
```javascript
// React imports first
import { useState } from 'react';

// Material-UI imports grouped
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// Project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// Assets imports last
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';
```

### Component Structure Standards
- **Default exports**: All components use `export default function ComponentName()`
- **Functional components**: 100% functional components with hooks
- **JSX file extension**: Use `.jsx` for React components
- **Component naming**: PascalCase for components, camelCase for functions

### Styling Patterns

#### Material UI sx Prop Usage (Primary pattern)
```javascript
// Inline sx styling for component-specific styles
<Grid sx={{ mb: -2.25 }} size={12}>
  <Typography variant="h5">Dashboard</Typography>
</Grid>

// Complex styling objects defined outside component
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};
```

#### Theme Integration
```javascript
// Access theme in components
const theme = useTheme();

// Use theme variables in styles
fill={theme.vars.palette.primary.light}

// Color utilities for advanced theming
import { alpha } from '@mui/material/styles';
```

### State Management Patterns

#### Local State with useState
```javascript
// Multiple state variables for related UI state
const [orderMenuAnchor, setOrderMenuAnchor] = useState(null);
const [analyticsMenuAnchor, setAnalyticsMenuAnchor] = useState(null);

// Event handlers follow handle[Action] naming
const handleOrderMenuClick = (event) => {
  setOrderMenuAnchor(event.currentTarget);
};
```

### Routing Architecture

#### Lazy Loading Pattern (100% of routes)
```javascript
// All page components are lazy loaded
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const ProductList = Loadable(lazy(() => import('pages/products/ProductList')));

// Nested route structure for feature organization
{
  path: 'recipes',
  children: [
    { path: 'view', element: <CategoriesList /> },
    { path: 'view/:id', element: <RecipeDetail /> },
    { path: 'add', element: <RecipeForm /> },
    { path: 'edit/:id', element: <RecipeForm /> }
  ]
}
```

### Layout & Grid System

#### Material UI Grid v2 Usage
```javascript
// Responsive grid with size prop
<Grid container rowSpacing={4.5} columnSpacing={2.75}>
  <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
    <AnalyticEcommerce title="Total Page Views" count="4,42,236" />
  </Grid>
</Grid>
```

#### Layout Composition
- Dashboard layout wraps all main routes
- Consistent spacing using Material UI spacing system
- Responsive breakpoints: xs, sm, md, lg

### Component Composition Patterns

#### Card-Based Layout
```javascript
// MainCard as primary container component
<MainCard sx={{ mt: 2 }} content={false}>
  <OrdersTable />
</MainCard>

// Stack for vertical layouts
<Stack sx={{ gap: 2 }}>
  <Typography variant="h6" color="text.secondary">
    This Week Statistics
  </Typography>
  <Typography variant="h3">$7,650</Typography>
</Stack>
```

#### Menu & Interaction Patterns
```javascript
// Consistent menu implementation
<Menu
  anchorEl={menuAnchor}
  open={Boolean(menuAnchor)}
  onClose={handleMenuClose}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
>
  <MenuItem onClick={handleMenuClose}>Export as CSV</MenuItem>
</Menu>
```

### Utility Functions & Helpers

#### Color Utilities
```javascript
// Hex to RGB channel conversion for CSS variables
export function hexToRgbChannel(hex) {
  // Handles 3, 4, 6, and 8 character hex codes
  // Returns "r g b" format for CSS custom properties
}

// Alpha transparency with CSS variables support
export function withAlpha(color, opacity) {
  // Supports both regular colors and CSS variables
  // Returns rgba() format for transparency
}
```

#### Theme Configuration
```javascript
// Structured color palette definition
return {
  primary: {
    lighter: blue[0],
    light: blue[3],
    main: blue[5],
    dark: blue[6],
    darker: blue[8],
    contrastText: '#fff'
  }
};
```

### Performance Optimizations

#### Code Splitting
- All routes lazy loaded with React.lazy()
- Loadable wrapper for consistent loading states
- Feature-based code splitting by page directories

#### Asset Management
- Static imports for images and icons
- Consistent asset organization in `assets/` directory
- SVG components for scalable graphics

### Error Handling & Validation

#### Input Validation
```javascript
// Hex color validation with detailed error messages
if (cleaned.length !== 6 && cleaned.length !== 8) {
  throw new Error(`Invalid hex color: ${hex}`);
}
```

### Documentation Standards

#### Comment Headers
```javascript
// ==============================|| COMPONENT NAME - DESCRIPTION ||============================== //
```

#### JSDoc for Utility Functions
```javascript
/**
 * Converts a hex color string to an RGB channel string.
 * @param hex - The hex color string (e.g. "#C8FAD6")
 * @returns The RGB channel string (e.g. "200 250 214")
 * @throws {Error} If the input is not a valid hex color
 */
```

### File Organization Principles

#### Feature-Based Structure
- Pages organized by domain (dashboard, products, recipes, todos)
- Shared components in `components/` directory
- Utility functions in `utils/` directory
- Theme configuration centralized in `themes/`

#### Naming Conventions
- Components: PascalCase (e.g., `DashboardDefault.jsx`)
- Utilities: camelCase (e.g., `colorUtils.js`)
- Constants: UPPER_SNAKE_CASE
- CSS classes: kebab-case

### Accessibility Standards

#### Semantic HTML
- Proper use of Material UI components with built-in accessibility
- ARIA labels for interactive elements
- Keyboard navigation support through Material UI

#### Color Contrast
- Theme-based color system ensures proper contrast ratios
- Support for light/dark themes through Material UI theme system