// assets
import { BgColorsOutlined, FileTextOutlined } from '@ant-design/icons';

const icons = {
  BgColorsOutlined,
  FileTextOutlined
};

// ==============================|| MENU ITEMS - RECIPES ||============================== //

const recipes = {
  id: 'recipes',
  title: 'Recipes',
  type: 'group',
  children: [
    {
      id: 'recipes-list',
      title: 'Recipes',
      type: 'collapse',
      icon: icons.BgColorsOutlined,
      children: [
        {
          id: 'view-recipes',
          title: 'View Recipes',
          type: 'item',
          url: '/recipes/view'
        },
        {
          id: 'add-recipe',
          title: 'Create Recipe',
          type: 'item',
          url: '/recipes/add'
        },
        {
          id: 'recipe-detail',
          title: 'Recipe Detail',
          type: 'item',
          url: '/recipes/view/:id'
        },
        {
          id: 'recipe-edit',
          title: 'Edit Recipe',
          type: 'item',
          url: '/recipes/edit/:id'
        }
      ]
    }
  ]
};

export default recipes;
