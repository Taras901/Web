import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', 
});


export const fetchItems = async (search = '', category = 'All') => {
  const params = {};

  if (search) {
    params.title_like = search;
  }

  if (category && category !== 'All') {
    params.category = category;
  }

  const response = await instance.get('/items', { params });
  return response.data;
};

export const fetchItemById = async (id) => {
  const response = await instance.get(`/items/${id}`);
  return response.data;
};

export const createItem = async (newItem) => {
  const response = await instance.post('/items', newItem);
  return response.data;
};


export const updateItem = async (id, updatedData) => {
  const response = await instance.put(`/items/${id}`, updatedData);
  return response.data;
};


export const deleteItem = async (id) => {
  const response = await instance.delete(`/items/${id}`);
  return response.data;
};