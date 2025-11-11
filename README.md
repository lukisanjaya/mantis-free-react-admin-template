# Mantis Free React Material UI Dashboard Template [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Get%20Mantis%20Free%20React%20-%20The%20Most%20Beautiful%20Material-UI%20Designed%20Admin%20Dashboard%20Template%20&url=https://mantisdashboard.com/free&via=codedthemes&hashtags=react,materialui,nextjs,webdev,developers,typescript)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Price](https://img.shields.io/badge/price-FREE-0098f7.svg)](https://github.com/codedthemes/mantis-free-react-admin-template/blob/master/LICENSE)
[![GitHub package version](https://img.shields.io/github/package-json/v/codedthemes/mantis-free-react-admin-template)](https://github.com/codedthemes/mantis-free-react-admin-template/)
[![Download ZIP](https://img.shields.io/badge/Download-ZIP-blue?style=flat-square&logo=github)](https://codedthemes.com/item/mantis-free-mui-admin-template/)
[![Join Discord](https://img.shields.io/badge/Join-Discord-5865F2?style=flat-square&logo=discord&logoColor=white)](https://discord.com/invite/p2E2WhCb6s)

Mantis is a free and open source React dashboard template made using the Material UI React component library with aim of flexibility and better customizability.

### Name Derived From Nature

Mantis Logo is inspired from the insect name - 'Mantises' as they have triangular heads with flexible Necks. Also, the name is derived from two popular design systems, Material and Ant Design (M-Ant-is).

Mantis has Ant Design principal on top of the Material UI React component library.

✨ Support us! If you like this theme, click the ⭐ (Top right) and let it shine

![mantis-free-react-dashboard-template.jpg](https://org-public-assets.s3.us-west-2.amazonaws.com/Free-Version-Banners/GITHUB-FREE-REACT-REPO+-+Mantis.png)

## Table of contents

- [Getting Started](#getting-started)
- [Download](#download)
- [Why Mantis?](#why-mantis)
- [What's included in Premium Version?](#whats-included-in-premium-version)
- [Documentation](#documentation)
- [Browser support](#browser-support)
- [Technology Stack](#technology-stack)
- [Mantis Figma UI Kit](#mantis-figma-ui-kit)
- [Other Technologies](#other-technologies)
- 💰[Save more with Big Bundle](#save-more-with-big-bundle)💰
- [More React Dashboard Templates](#more-react-dashboard-templates)
- [Issues?](#issues)
- [License](#license)
- [Contributor](#contributor)
- [Useful Resources](#useful-resources)
- [Community](#community)
- [Follow us](#follow-us)

## Getting Started

1. Clone from Github

```
git clone https://github.com/codedthemes/mantis-free-react-admin-template.git
```

2. Install packages

```
yarn
```

3. Set environment variables (create `.env` file in root)

```
VITE_APP_BASE_NAME=/
```

4. Run project

```
yarn run dev
```

The app will be available at `http://localhost:5173` (or the port shown in terminal)

## Features Implemented

### CRUD Operations

This template now includes fully functional CRUD (Create, Read, Update, Delete) modules with the following features:

#### 📦 **Products Module** (`/products`)
- **List Products** (`/products/all`) - Browse all products with pagination and search
- **Add Product** (`/products/add`) - Create new product with form validation
- **Edit Product** (`/products/edit/:id`) - Update product details
- **Delete Product** - Remove products from list with confirmation
- Data source: [DummyJSON Products API](https://dummyjson.com/products)

#### 🍽️ **Recipes Module** (`/recipes`)
- **View Recipes** (`/recipes/view`) - Browse all recipes with pagination and search
- **Recipe Detail** (`/recipes/view/:id`) - View complete recipe with ingredients, instructions, and nutritional info
- **Create Recipe** (`/recipes/add`) - Add new recipe with comprehensive form
- **Edit Recipe** (`/recipes/edit/:id`) - Modify existing recipe details
- **Delete Recipe** - Remove recipes with confirmation dialog
- Data source: [DummyJSON Recipes API](https://dummyjson.com/recipes)

#### ✅ **Todos Module** (`/todos`)
- **List Todos** (`/todos/all`) - View all todos with pagination and search
- **Add Todo** (`/todos/add`) - Create new todo item
- **Edit Todo** (`/todos/edit/:id`) - Update todo details
- **Toggle Completion** - Mark todos as completed/incomplete
- **Delete Todo** - Remove todo items with confirmation
- Data source: [DummyJSON Todos API](https://dummyjson.com/todos)

### Enhanced Features

- **Dropdown Sidebar Menu** - Collapsible menu groups with nested navigation
- **Breadcrumb Navigation** - Automatic breadcrumb generation based on current route
- **Pagination** - All list pages support pagination with customizable row counts
- **Search/Filter** - Real-time search functionality on all list pages
- **Form Validation** - Formik + Yup validation for all form submissions
- **Dynamic Routing** - Support for dynamic routes with `:id` parameters
- **Responsive Design** - Fully responsive layout for all screen sizes

### Tech Stack Used

- **Frontend Framework**: React 19 + Vite
- **UI Library**: Material-UI (MUI v7)
- **Icons**: Ant Design Icons
- **Form Management**: Formik + Yup
- **Data Fetching**: SWR (stale-while-revalidate)
- **Routing**: React Router v6
- **API Source**: DummyJSON (mock API)

## Project Structure

```
src/
├── api/                          # API hooks and services
│   ├── products.js              # Products API (useGetProducts, etc.)
│   ├── recipes.js               # Recipes API (useGetRecipes, etc.)
│   ├── todos.js                 # Todos API (useGetTodos, etc.)
│   └── menu.js
├── pages/                        # Page components
│   ├── products/
│   │   ├── ProductList.jsx      # Products list with pagination/search
│   │   └── ProductForm.jsx      # Product add/edit form
│   ├── recipes/
│   │   ├── RecipeDetail.jsx     # Recipe detail view
│   │   └── RecipeForm.jsx       # Recipe add/edit form
│   ├── todos/
│   │   ├── TodoList.jsx         # Todos list with actions
│   │   └── TodoForm.jsx         # Todo add/edit form
│   ├── categories/
│   │   └── CategoriesList.jsx   # Recipes list (replaces categories)
│   └── dashboard/
├── components/                   # Reusable components
│   ├── @extended/
│   │   ├── Breadcrumbs.jsx      # Dynamic breadcrumb navigation
│   │   └── ...
│   ├── MainCard.jsx             # Main card wrapper
│   └── ...
├── menu-items/                   # Sidebar menu configuration
│   ├── index.jsx                # Main menu items export
│   ├── products.jsx             # Products menu group
│   ├── recipes.jsx              # Recipes menu group
│   ├── todos.jsx                # Todos menu group
│   └── ...
├── layout/
│   └── Dashboard/
│       ├── Drawer/
│       │   └── DrawerContent/
│       │       └── Navigation/
│       │           ├── NavCollapse.jsx  # Collapsible menu items
│       │           ├── NavGroup.jsx
│       │           └── NavItem.jsx
│       ├── Header/
│       ├── Footer.jsx
│       └── index.jsx
├── routes/
│   └── MainRoutes.jsx           # All route definitions
└── ...
```

## API Integration

This template uses **DummyJSON** as a mock API source:

- **Products**: https://dummyjson.com/products
- **Recipes**: https://dummyjson.com/recipes
- **Todos**: https://dummyjson.com/todos

All data fetching is done using **SWR** (stale-while-revalidate) for efficient caching and revalidation.

## Menu System

The sidebar menu is configured in `src/menu-items/` with support for:

- **Collapsed Items**: Multi-level nested menus with expand/collapse
- **Dynamic Routes**: Menu items with `:id` parameters
- **Breadcrumb Integration**: Automatic breadcrumb generation from menu structure
- **Hidden Items**: Items with `breadcrumbs: false` don't show in breadcrumbs but still route correctly

## Download

- Mantis Free
  - [Live Preview](https://mantisdashboard.com/free/)
  - [Download](https://codedthemes.com/item/mantis-free-mui-admin-template/)
- Mantis Pro
  - [Live Preview](https://mantisdashboard.com/)
  - [Download](https://codedthemes.com/item/mantis-mui-react-dashboard-template/)

## Why Mantis?

Mantis offers everything needed to build an advanced dashboard application. In the initial release, we included following high-end features,

- Support React19.
- Professional user interface.
- Material UI React components(MUI v7).
- Fully responsive, all modern browser supported.
- Easy to use code structure
- Flexible & high-Performance code
- Simple documentation

## What's included in Premium Version?

The [Pro version](https://mantisdashboard.com/) of Mantis react template includes features such as TypeScript, apps, authentication methods (i.e. JWT, Auth0, Firebase, AWS, Supabase), advance components, form plugins, layouts, widgets, and more.

| [Mantis Free](https://mantisdashboard.com/free/)                                                     | [Mantis](https://mantisdashboard.com/)                                            |
| ---------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| **7** Demo pages                                                                                     | **85+** demo pages                                                                |
| -                                                                                                    | ✓ Multi-language                                                                  |
| -                                                                                                    | ✓ Dark/Light Mode 🌓                                                              |
| -                                                                                                    | ✓ TypeScript version                                                              |
| -                                                                                                    | ✓ Design files (Figma)                                                            |
| -                                                                                                    | ✓ Multiple color options                                                          |
| -                                                                                                    | ✓ RTL                                                                             |
| -                                                                                                    | ✓ JWT authentications                                                             |
| -                                                                                                    | ✓ [More components](https://mantisdashboard.com/components-overview/autocomplete) |
| ✓ [MIT License](https://github.com/codedthemes/mantis-free-react-admin-template/blob/master/LICENSE) | ✓ [Pro License](https://mui.com/store/license/)                                   |

## Documentation

[Mantis documentation](https://codedthemes.gitbook.io/mantis) helps you out in all aspects from Installation to deployment.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Base path for the application (default: /)
VITE_APP_BASE_NAME=/

# Optional: API configuration
# VITE_API_URL=https://api.example.com
# VITE_API_KEY=your_api_key_here
```

## Customization Guide

### Adding a New CRUD Module

1. **Create API hooks** in `src/api/yourmodule.js`:
   ```javascript
   export const useGetItems = (limit, skip) => {
     const { data, error, isLoading, mutate } = useSWR(
       `${API_BASE}/yourmodule?limit=${limit}&skip=${skip}`,
       fetcher
     );
     return { items: data?.items || [], total: data?.total || 0, isLoading, error, mutate };
   };
   ```

2. **Create list page** in `src/pages/yourmodule/YourModuleList.jsx`
3. **Create form page** in `src/pages/yourmodule/YourModuleForm.jsx`
4. **Add menu items** in `src/menu-items/yourmodule.jsx`
5. **Register routes** in `src/routes/MainRoutes.jsx`
6. **Update menu index** in `src/menu-items/index.jsx`

### Modifying Menu Structure

Edit `src/menu-items/` files to add/remove/modify menu items. The breadcrumb component automatically generates breadcrumbs from this structure.

### Styling

- Global theme: `src/themes/index.jsx`
- Color palette: `src/themes/palette.js`
- Typography: `src/themes/typography.js`
- Component overrides: `src/themes/overrides/`

## Browser support

<img src="https://org-public-assets.s3.us-west-2.amazonaws.com/logos/chrome.png" width="45" height="45" > <img src="https://org-public-assets.s3.us-west-2.amazonaws.com/logos/edge.png" width="45" height="45" > <img src="https://org-public-assets.s3.us-west-2.amazonaws.com/logos/safari.png" width="45" height="45" > <img src="https://org-public-assets.s3.us-west-2.amazonaws.com/logos/firefox.png" width="45" height="45" > <img src="https://org-public-assets.s3.us-west-2.amazonaws.com/logos/opera.png" width="45" height="45" >

## Technology Stack

- Material UI V7
- Built with React Hooks API.
- React context API for state management.
- SWR.
- React Router for navigation routing.
- Support for Vite.
- Code splitting.
- CSS-in-JS.

## Mantis Figma UI Kit

| FREE                                                                                                                        | PRO                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
|  <a href="https://codedthemes.com/item/mantis-free-figma-ui-kit/" traget="_blank"><img src="https://org-public-assets.s3.us-west-2.amazonaws.com/Banners/Figma_Free_Mantis.png" width="450" alt="Figma Free"></a> | <a href="https://codedthemes.com/item/mantis-figma-ui-kit/" traget="_blank"><img src="https://org-public-assets.s3.us-west-2.amazonaws.com/Banners/Figma_Pro_Mantis.png" width="450" alt="Figma Pro"></a> |

## Other Technologies

| Technology                                                                                                                        | Free                                                                               | Pro                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| <p align="center"><img src="https://org-public-assets.s3.us-west-2.amazonaws.com/logos/Angular.png" width="25" height="25"></p>   | [**Free**](https://codedthemes.com/item/mantis-angular-free-admin-template/)       | [**Pro**](https://codedthemes.com/item/mantis-angular-admin-template/)    |
| <p align="center"><img src="https://org-public-assets.s3.us-west-2.amazonaws.com/logos/Bootstrap.png" width="30" height="30"></p> | [**Free**](https://codedthemes.com/item/mantis-bootstrap-free-admin-template/)     | [**Pro**](https://codedthemes.com/item/mantis-bootstrap-admin-dashboard/) |
| <p align="center"><img src="https://org-public-assets.s3.us-west-2.amazonaws.com/logos/Vue.png" width="25" height="25"></p>       | [**Free**](https://codedthemes.com/item/mantis-free-vuetify-vuejs-admin-template/) | [**Pro**](https://codedthemes.com/item/mantis-vue-admin-template/)        |

## Save more with Big Bundle

[![bundle-image](https://org-public-assets.s3.us-west-2.amazonaws.com/Banners/Bundle+banner.png)](https://links.codedthemes.com/jhFBJ)

## More React Dashboard Templates

| Dashboard                                                                                                                                                          | FREE                                                                                | PRO                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| <img src="https://org-public-assets.s3.us-west-2.amazonaws.com/logos/Berry%20with%20name.png"  height="30" style="display:inline-block; vertical-align:middle;">   | [**Free**](https://codedthemes.com/item/berry-mui-free-react-admin-template/)       | [**Pro**](https://codedthemes.com/item/berry-material-react-admin-template/)</span>   |
| <img src="https://org-public-assets.s3.us-west-2.amazonaws.com/logos/Datta%20with%20name.png" height="30" style="display:inline-block; vertical-align:middle;">    | [**Free**](https://codedthemes.com/item/datta-able-react-free-admin-template/)      | [**Pro**](https://codedthemes.com/item/datta-able-react-admin-template/)</span>       |
| <img src="https://org-public-assets.s3.us-west-2.amazonaws.com/logos/Gradient%20with%20name.png" height="30" style="display:inline-block; vertical-align:middle;"> | [**Free**](https://codedthemes.com/item/gradient-able-reactjs-free-admin-template/) | [**Pro**](https://codedthemes.com/item/gradient-able-reactjs-admin-dashboard/)</span> |

## Issues

Please generate a [Github issue](https://github.com/codedthemes/mantis-free-react-admin-template/issues) if you found a bug in any version. We are try our best to resolve the issue.

## Troubleshooting

### Common Issues

**Q: Port 5173 is already in use**
```bash
# Run on different port
yarn run dev -- --port 3000
```

**Q: Breadcrumb not updating**
- Ensure all routes are registered in `src/menu-items/` and exported from `src/menu-items/index.jsx`
- Check that the URL pattern matches the menu item URL

**Q: Dynamic routes not working (e.g., `/products/edit/:id`)**
- Verify the route is defined in `src/routes/MainRoutes.jsx`
- Check that the menu item URL pattern uses `:id` notation

**Q: API calls not working**
- Ensure the component is using the correct SWR hook from `src/api/`
- Check network tab in browser DevTools for API response errors
- DummyJSON API has rate limits - wait a moment before retrying

**Q: Form validation not working**
- Ensure you're using Formik and Yup validation schema
- Check that form fields have `name`, `value`, `onChange`, and `onBlur` props properly connected

**Q: Sidebar menu not expanding/collapsing**
- Check that the menu item has `type: 'collapse'` and `children` array
- Verify `NavCollapse.jsx` is properly imported and used in `NavGroup.jsx`

## License

- Licensed under [MIT](https://github.com/codedthemes/mantis-free-react-admin-template/blob/master/LICENSE)
- Copyright © [CodedThemes](https://codedthemes.com/)

## Contributor

**CodedThemes Team**

- https://x.com/codedthemes
- https://github.com/codedthemes

**Rakesh Nakrani**

- https://x.com/rakesh_nakrani

**Brijesh Dobariya**

- https://x.com/dobaria_brijesh

## Useful Resources

- [More Admin Templates From CodedThemes](https://codedthemes.com/item/category/admin-templates/)
- [Freebies From CodedThemes](https://codedthemes.com/item/category/free-templates/)
- [Big Bundles](https://codedthemes.com/item/big-bundle/)
- [Figma UI Kits](https://codedthemes.com/item/category/templates/figma/)
- [Affiliate Program](https://codedthemes.com/affiliate/)
- [Blogs](https://blog.codedthemes.com/)

## Community

- 👥Follow [@codedThemes](https://x.com/codedthemes)
- 🔗Join [Discord](https://discord.com/invite/p2E2WhCb6s)
- 🔔Subscribe to [CodedTheme Blogs](https://blog.codedthemes.com/)

## Follow Us

- [Twitter](https://twitter.com/codedthemes) 🐦
- [Dribbble](https://dribbble.com/codedthemes) 🏀
- [Github](https://github.com/codedthemes) 🐙
- [LinkedIn](https://www.linkedin.com/company/codedthemes/) 💼
- [Instagram](https://www.instagram.com/codedthemes/) 📷
- [Facebook](https://www.facebook.com/codedthemes) 🟦
