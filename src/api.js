import axios from 'axios';

// Налаштування адреси твого json-server
const instance = axios.create({
  baseURL: 'http://localhost:5000', 
});

// 1. Отримати всі товари
export const fetchItems = async () => {
  const response = await instance.get('/items');
  return response.data;
};

// 2. Отримати один товар по ID
export const fetchItemById = async (id) => {
  const response = await instance.get(`/items/${id}`);
  return response.data;
};

// 3. Створити новий товар (саме цієї функції не вистачало!)
export const createItem = async (newItem) => {
  const response = await instance.post('/items', newItem);
  return response.data;
};

// 4. Оновити товар
export const updateItem = async (id, updatedData) => {
  const response = await instance.put(`/items/${id}`, updatedData);
  return response.data;
};

// 5. Видалити товар
export const deleteItem = async (id) => {
  const response = await instance.delete(`/items/${id}`);
  return response.data;
};