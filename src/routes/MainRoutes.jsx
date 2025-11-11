import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
// render - categories (recipes)
const CategoriesList = Loadable(lazy(() => import('pages/categories/CategoriesList')));
const RecipeDetail = Loadable(lazy(() => import('pages/recipes/RecipeDetail')));
const RecipeForm = Loadable(lazy(() => import('pages/recipes/RecipeForm')));

// render - products
const ProductList = Loadable(lazy(() => import('pages/products/ProductList')));
const ProductForm = Loadable(lazy(() => import('pages/products/ProductForm')));
// render - todos
const TodoList = Loadable(lazy(() => import('pages/todos/TodoList')));
const TodoForm = Loadable(lazy(() => import('pages/todos/TodoForm')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'recipes',
      children: [
        {
          path: 'view',
          element: <CategoriesList />
        },
        {
          path: 'view/:id',
          element: <RecipeDetail />
        },
        {
          path: 'add',
          element: <RecipeForm />
        },
        {
          path: 'edit/:id',
          element: <RecipeForm />
        }
      ]
    },
    {
      path: 'products',
      children: [
        {
          path: 'all',
          element: <ProductList />
        },
        {
          path: 'add',
          element: <ProductForm />
        },
        {
          path: 'edit/:id',
          element: <ProductForm />
        }
      ]
    },
    {
      path: 'todos',
      children: [
        {
          path: 'all',
          element: <TodoList />
        },
        {
          path: 'add',
          element: <TodoForm />
        },
        {
          path: 'edit/:id',
          element: <TodoForm />
        }
      ]
    }
  ]
};

export default MainRoutes;
