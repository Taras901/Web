import axios from 'axios';

// Налаштування адреси твого json-server
const instance = axios.create({
  baseURL: 'http://localhost:5000', 
});

// 1. GET - Отримати всі товари
export const fetchItems = async () => {
  const response = await instance.get('/items');
  return response.data;
};

// 2. POST - Створити новий товар
export const createItem = async (newItem) => {
  const response = await instance.post('/items', newItem);
  return response.data;
};

// 3. PUT - Оновити товар (потрібен ID і нові дані)
export const updateItem = async (id, updatedData) => {
  const response = await instance.put(`/items/${id}`, updatedData);
  return response.data;
};

// 4. DELETE - Видалити товар по ID
export const deleteItem = async (id) => {
  const response = await instance.delete(`/items/${id}`);
  return response.data;
};