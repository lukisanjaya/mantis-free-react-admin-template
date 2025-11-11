// assets
import { ShoppingOutlined, BgColorsOutlined, FileTextOutlined } from '@ant-design/icons';

// icons
const icons = {
  ShoppingOutlined,
  BgColorsOutlined,
  FileTextOutlined
};

// ==============================|| MENU ITEMS - PRODUCTS ||============================== //

const products = {
  id: 'products',
  title: 'Products',
  type: 'group',
  children: [
    {
      id: 'product-list',
      title: 'Product List',
      type: 'collapse',
      icon: icons.ShoppingOutlined,
      children: [
        {
          id: 'all-products',
          title: 'All Products',
          type: 'item',
          url: '/products/all'
        },
        {
          id: 'add-product',
          title: 'Add Product',
          type: 'item',
          url: '/products/add'
        },
        {
          id: 'product-edit',
          title: 'Edit Product',
          type: 'item',
          url: '/products/edit/:id'
        }
      ]
    }
  ]
};

export default products;
