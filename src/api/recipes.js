import useSWR from 'swr';

const API_BASE = 'https://dummyjson.com';
const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetRecipes = (limit = 10, skip = 0) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_BASE}/recipes?limit=${limit}&skip=${skip}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    recipes: data?.recipes || [],
    total: data?.total || 0,
    isLoading,
    error,
    mutate
  };
};

export const useGetRecipeById = (id) => {
  const { data, error, isLoading, mutate } = useSWR(id ? `${API_BASE}/recipes/${id}` : null, fetcher, {
    revalidateOnFocus: false
  });

  return { recipe: data || null, isLoading, error, mutate };
};
