import useSWR from 'swr';

const API_BASE = 'https://dummyjson.com';

// Fetcher untuk SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

// Fetch products dengan pagination
export const useGetProducts = (limit = 10, skip = 0) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_BASE}/products?limit=${limit}&skip=${skip}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  return {
    products: data?.products || [],
    total: data?.total || 0,
    isLoading,
    error,
    mutate
  };
};

// Fetch single product by ID
export const useGetProductById = (id) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `${API_BASE}/products/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false
    }
  );

  return {
    product: data || null,
    isLoading,
    error,
    mutate
  };
};

// Get all categories
export const useGetCategories = () => {
  const { data, error, isLoading } = useSWR(`${API_BASE}/products/categories`, fetcher, {
    revalidateOnFocus: false
  });

  return {
    categories: data || [],
    isLoading,
    error
  };
};

// Search products
export const useSearchProducts = (query, limit = 10) => {
  const { data, error, isLoading } = useSWR(
    query ? `${API_BASE}/products/search?q=${query}&limit=${limit}` : null,
    fetcher,
    {
      revalidateOnFocus: false
    }
  );

  return {
    products: data?.products || [],
    isLoading,
    error
  };
};

// Add product (mock - DummyJSON is read-only)
export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE}/products/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Update product (mock - DummyJSON is read-only)
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Delete product (mock - DummyJSON is read-only)
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};
