import useSWR from 'swr';

const API_BASE = 'https://dummyjson.com';
const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetTodos = (limit = 10, skip = 0) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_BASE}/todos?limit=${limit}&skip=${skip}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    todos: data?.todos || [],
    total: data?.total || 0,
    isLoading,
    error,
    mutate
  };
};

export const useGetTodoById = (id) => {
  const { data, error, isLoading, mutate } = useSWR(id ? `${API_BASE}/todos/${id}` : null, fetcher, {
    revalidateOnFocus: false
  });

  return { todo: data || null, isLoading, error, mutate };
};

export const addTodo = async (todoData) => {
  try {
    const res = await fetch(`${API_BASE}/todos/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoData)
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const updateTodo = async (id, todoData) => {
  try {
    const res = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoData)
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' });
    return await res.json();
  } catch (err) {
    throw err;
  }
};
