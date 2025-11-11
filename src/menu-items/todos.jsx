// assets
import { CheckSquareOutlined, FileTextOutlined } from '@ant-design/icons';

const icons = { CheckSquareOutlined, FileTextOutlined };

const todos = {
  id: 'todos',
  title: 'Todos',
  type: 'group',
  children: [
    {
      id: 'todo-list',
      title: 'Todo List',
      type: 'collapse',
      icon: icons.CheckSquareOutlined,
      children: [
        {
          id: 'all-todos',
          title: 'All Todos',
          type: 'item',
          url: '/todos/all'
        },
        {
          id: 'add-todo',
          title: 'Add Todo',
          type: 'item',
          url: '/todos/add'
        },
        {
          id: 'todo-edit',
          title: 'Edit Todo',
          type: 'item',
          url: '/todos/edit/:id'
        }
      ]
    }
  ]
};

export default todos;
