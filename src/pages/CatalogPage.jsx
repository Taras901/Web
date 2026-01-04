import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fetchItems, createItem, updateItem, deleteItem } from '../api';
import Loader from '../components/Loader';

const Container = styled.div`max-width: 1200px; margin: 0 auto; padding: 0 1rem;`;
const Toolbar = styled.div`display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 1rem; background-color: var(--light); border-radius: 8px; margin-top: 20px; @media (max-width: 768px) { flex-direction: column; gap: 1rem; }`;
const InputsGroup = styled.div`display: flex; gap: 1rem; width: 100%;`;
const Select = styled.select`padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; outline: none;`;
const Input = styled.input`padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; outline: none; flex-grow: 1;`;
const CreateButton = styled.button`background-color: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer; white-space: nowrap; &:hover { background-color: #059669; }`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 640px) { grid-template-columns: 1fr; }`;
const Card = styled.div`border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: white; display: flex; flex-direction: column; position: relative; &:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); transform: translateY(-2px); transition: 0.2s; }`;
const CardHeader = styled.div`background: #f9fafb; padding: 8px 12px; font-size: 0.75rem; font-weight: 600; color: #6b7280; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between;`;
const CardBody = styled.div`padding: 1rem; flex-grow: 1; display: flex; flex-direction: column;`;
const ImageBox = styled.div`height: 160px; margin-bottom: 1rem; border-radius: 6px; overflow: hidden; img { width: 100%; height: 100%; object-fit: cover; }`;
const PriceRow = styled.div`display: flex; justify-content: space-between; align-items: center; margin: 1rem 0; font-weight: bold; margin-top: auto;`;
const StyledLink = styled(Link)`width: 100%; background: var(--dark); color: white; padding: 10px; border: none; border-radius: 6px; cursor: pointer; text-align: center; text-decoration: none; &:hover { background: var(--primary); }`;
const ActionButtons = styled.div`display: flex; gap: 8px; margin-top: 10px; button { flex: 1; padding: 6px; font-size: 0.8rem; border-radius: 4px; cursor: pointer; border: 1px solid transparent; font-weight: 600; }`;
const EditBtn = styled.button`background: #eff6ff; color: #2563eb; &:hover { background: #dbeafe; }`;
const DeleteBtn = styled.button`background: #fef2f2; color: #dc2626; &:hover { background: #fee2e2; }`;


const CatalogPage = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchItems(searchTerm, selectedCategory);
      
      setTimeout(() => {
        setItems(data);
        setLoading(false);
      }, 1000);

    } catch (error) { 
      console.error(error); 
      setLoading(false);
    }
  };

  useEffect(() => { 
    const timer = setTimeout(() => {
        loadData();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]); 


  const handleCreate = async () => {
    const newItem = {
      title: "New Product",
      category: "Furniture",
      price: Math.floor(Math.random() * 200) + 50,
      description: "Freshly added item.",
      image: "/chair.jpg"
    };
    await createItem(newItem);
    loadData();
  };

  const handleEdit = async (item) => {
    const newTitle = prompt("New title:", item.title);
    if (newTitle && newTitle !== item.title) {
      const updatedItem = { ...item, title: newTitle };
      await updateItem(item.id, updatedItem);
      loadData();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete item?")) {
      await deleteItem(id);
      loadData();
    }
  };


  return (
    <Container>
      <Toolbar>
        <InputsGroup>
          <Input 
            type="text" 
            placeholder="Search items..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Furniture">Furniture</option>
            <option value="Lighting">Lighting</option>
          </Select>
        </InputsGroup>

        <CreateButton onClick={handleCreate}>+ Add Product</CreateButton>
      </Toolbar>

      {loading ? (
        <Loader />
      ) : (
        <Grid>
          {items.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <span>{item.category}</span>
                <span style={{color: '#9ca3af'}}>#{item.id}</span>
              </CardHeader>
              <CardBody>
                <ImageBox>
                  <img src={item.image} alt={item.title} />
                </ImageBox>
                <h3>{item.title}</h3>
                <p style={{fontSize: '0.85rem', color: '#6b7280', margin: '0.5rem 0'}}>
                  {item.description ? item.description.substring(0, 40) : ''}...
                </p>
                <PriceRow>
                  <span>Price:</span>
                  <span style={{color: 'var(--primary)', fontSize: '1.25rem'}}>${item.price}</span>
                </PriceRow>
                <StyledLink to={`/catalog/${item.id}`}>View Details</StyledLink>
                <ActionButtons>
                  <EditBtn onClick={() => handleEdit(item)}>Edit</EditBtn>
                  <DeleteBtn onClick={() => handleDelete(item.id)}>Delete</DeleteBtn>
                </ActionButtons>
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CatalogPage;