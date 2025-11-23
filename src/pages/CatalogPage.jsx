import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 0 1rem;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--light);
  border-radius: 8px;
  
  @media (max-width: 768px) { flex-direction: column; gap: 1rem; }
`;

const SelectGroup = styled.div`
  display: flex; gap: 1rem;
  @media (max-width: 768px) { flex-direction: column; }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  outline: none;
`;

const ApplyButton = styled.button`
  background: white;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 8px 32px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;

  &:hover { background: var(--primary); color: white; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  transition: 0.2s;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    border-color: var(--primary-light);
  }
`;

const CardHeader = styled.div`
  background: var(--light);
  padding: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--medium);
  border-bottom: 1px solid #e5e7eb;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

const PriceRow = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin: 1rem 0;
  font-weight: bold;
`;

const ViewButton = styled.button`
  width: 100%;
  background: var(--dark);
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover { background: var(--primary); }
`;

const ProductCard = () => (
  <Card>
    <CardHeader>Item</CardHeader>
    <CardBody>
      <div style={{height: '150px', background: '#f3f4f6', marginBottom: '1rem', borderRadius: '4px'}}></div>
      <h3>Amazing stuff</h3>
      <p style={{fontSize: '0.875rem', color: '#6b7280', margin: '0.5rem 0'}}>
        ttt
      </p>
      <PriceRow>
        <span>Price:</span>
        <span style={{color: 'var(--primary)', fontSize: '1.25rem'}}>$ 2415</span>
      </PriceRow>
      <ViewButton>View more</ViewButton>
    </CardBody>
  </Card>
);

const CatalogPage = () => {
  return (
    <Container>
      <FilterBar>
        <SelectGroup>
          <Select><option>Filter 1</option></Select>
          <Select><option>Filter 2</option></Select>
          <Select><option>Filter 3</option></Select>
        </SelectGroup>
        <ApplyButton>Apply</ApplyButton>
      </FilterBar>

      <Grid>
        {[1, 2, 3, 4].map(item => <ProductCard key={item} />)}
      </Grid>
    </Container>
  );
};

export default CatalogPage;