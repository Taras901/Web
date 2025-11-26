import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fetchItems } from '../api';

const Container = styled.div`max-width: 1200px; margin: 0 auto; padding: 0 1rem;`;

const HeroSection = styled.div`
  display: flex; gap: 2rem; margin-bottom: 4rem; margin-top: 2rem;
  @media (max-width: 768px) { flex-direction: column; }
`;

const HeroImage = styled.div`
  flex: 1; height: 320px; border-radius: 8px; overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const HeroContent = styled.div`
  flex: 1; display: flex; flex-direction: column; justify-content: center;
  h1 { font-size: 2.5rem; margin-bottom: 1rem; color: var(--dark); }
  p { font-size: 1.1rem; line-height: 1.6; color: var(--medium); }
`;

const TilesGrid = styled.div`
  display: grid; 
  /* Адаптивна сітка: 3 колонки */
  grid-template-columns: repeat(3, 1fr); 
  gap: 2rem; margin-bottom: 3rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const Tile = styled.div`
  text-align: center; background: #fff; padding: 15px; border-radius: 8px;
  border: 1px solid #e5e7eb; transition: 0.3s;
  
  &:hover { transform: translateY(-5px); box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
  
  img { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 15px; }
  h3 { margin-bottom: 5px; font-size: 1.2rem; }
  p { color: var(--primary); font-weight: bold; font-size: 1.1rem; }
`;

const Button = styled.button`
  background-color: var(--primary); color: white; padding: 12px 32px; 
  border: none; border-radius: 6px; font-weight: bold; cursor: pointer; 
  display: block; margin: 0 auto 50px auto; transition: 0.2s;
  
  &:hover { background-color: var(--primary-dark); }
`;

const StyledLink = styled(Link)`
  text-decoration: none; color: inherit;
`;

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchItems().then(data => {
      setItems(data);
    });
  }, []);

  const visibleItems = showAll ? items : items.slice(0, 0
  );

  return (
    <Container>
      <HeroSection>
        <HeroImage>
          <img src="/hero.jpg" alt="Shop Banner" />
        </HeroImage>
        <HeroContent>
          <h1>Welcome to Interior Shop!</h1>
          <p>Ми пропонуємо найкращі меблі для вашого комфорту. Перегляньте наші популярні товари нижче.</p>
        </HeroContent>
      </HeroSection>

      <h2 style={{marginBottom: '20px'}}>Popular Products</h2>

      <TilesGrid>
        {visibleItems.map(item => (
          <StyledLink to={`/catalog/${item.id}`} key={item.id}>
            <Tile>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>${item.price}</p>
            </Tile>
          </StyledLink>
        ))}
      </TilesGrid>

      <Button onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Less" : "View More Products"}
      </Button>

    </Container>
  );
};

export default HomePage;