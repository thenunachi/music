// apiService.js
export const apiService = {
    getItems: async () => {
      const response = await fetch('/api/items');
      if (!response.ok) throw new Error('Failed to fetch items');
      return await response.json();
    },
  
    createItem: async (item) => {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!response.ok) throw new Error('Failed to create item');
      return await response.json();
    },
  
    updateItem: async (id, item) => {
      const response = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!response.ok) throw new Error('Failed to update item');
      return await response.json();
    },
  
    deleteItem: async (id) => {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete item');
    },
  };
  