import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { itemsData } from '../data'; // БЕРЕМО ДАНІ З ФАЙЛУ

// --- STYLES ---
const Container = styled.div`max-width: 1200px; margin: 0 auto; padding: 0 1rem;`;
const FilterBar = styled.div`display: flex; justify-content: space-between; margin-bottom: 2rem; padding: 1rem; background-color: var(--light); border-radius: 8px; @media (max-width: 768px) { flex-direction: column; gap: 1rem; }`;
const InputsGroup = styled.div`display: flex; gap: 1rem; @media (max-width: 768px) { flex-direction: column; }`;
const Select = styled.select`padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 4px; outline: none;`;
const Input = styled.input`padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 4px; outline: none;`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); } @media (max-width: 640px) { grid-template-columns: 1fr; }`;
const Card = styled.div`border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: white; transition: 0.2s; display: flex; flex-direction: column; &:hover { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border-color: var(--primary-light); }`;
const CardHeader = styled.div`background: var(--light); padding: 8px; font-size: 0.75rem; font-weight: 600; color: var(--medium); border-bottom: 1px solid #e5e7eb;`;
const CardBody = styled.div`padding: 1rem; flex-grow: 1; display: flex; flex-direction: column;`;
const ImageBox = styled.div`height: 150px; margin-bottom: 1rem; border-radius: 4px; overflow: hidden; img { width: 100%; height: 100%; object-fit: cover; }`;
const PriceRow = styled.div`display: flex; justify-content: space-between; align-items: center; margin: 1rem 0; font-weight: bold; margin-top: auto;`;
const StyledLink = styled(Link)`width: 100%; background: var(--dark); color: white; padding: 8px; border: none; border-radius: 4px; cursor: pointer; text-align: center; &:hover { background: var(--primary); }`;

const CatalogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Фільтруємо локальні дані
  const filteredItems = itemsData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container>
      <FilterBar>
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
      </FilterBar>

      <Grid>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <Card key={item.id}>
              <CardHeader>{item.category}</CardHeader>
              <CardBody>
                <ImageBox>
                  <img src={item.image} alt={item.title} />
                </ImageBox>
                <h3>{item.title}</h3>
                <p style={{fontSize: '0.875rem', color: '#6b7280', margin: '0.5rem 0'}}>
                  {item.description.substring(0, 50)}...
                </p>
                <PriceRow>
                  <span>Price:</span>
                  <span style={{color: 'var(--primary)', fontSize: '1.25rem'}}>${item.price}</span>
                </PriceRow>
                <StyledLink to={`/catalog/${item.id}`}>View more</StyledLink>
              </CardBody>
            </Card>
          ))
        ) : (
          <h3>No items found</h3>
        )}
      </Grid>
    </Container>
  );
};

export default CatalogPage;