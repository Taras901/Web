import React, { useState } from 'react';
import styled from 'styled-components';
import heroImage from '../assets/hero.jpg';

const Container = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 0 1rem;
`;

const HeroSection = styled.div`
  display: flex; gap: 2rem; margin-bottom: 4rem; margin-top: 2rem;
  @media (max-width: 768px) { flex-direction: column; }
`;

const HeroImage = styled.div`
  flex: 1;
  height: 320px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  
  /* Стиль для картинки всередині */
  img {
    width: 100%; height: 100%; object-fit: cover;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  display: flex; flex-direction: column; justify-content: center;
  h1 { font-size: 2.5rem; margin-bottom: 1rem; color: var(--dark); }
  p { font-size: 1.1rem; line-height: 1.6; color: var(--medium); }
`;

const TilesGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const Tile = styled.div`
  text-align: center;
  background: #fff; padding: 20px; border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  h3 { margin-bottom: 0.5rem; }
`;

const Button = styled.button`
  background-color: var(--primary); color: white; padding: 12px 32px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; display: block; margin: 0 auto;
  &:hover { background-color: var(--primary-dark); }
`;

const ExtraContent = styled.div`
  margin-top: 3rem; padding: 2rem; background: #e0f2fe; border-radius: 8px; text-align: center;
`;

const HomePage = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Container>
      <HeroSection>
        <HeroImage>
          <img src={heroImage} alt="Shop Banner" />
        </HeroImage>
        
        <HeroContent>
          <h1>Welcome!</h1>
          <p>Ми пропонуємо найкращі меблі для вашого комфорту.</p>
        </HeroContent>
      </HeroSection>

      <TilesGrid>
        {[1, 2, 3].map(item => (
          <Tile key={item}>
            <h3>Tile {item}</h3>
            <p>Static content here.</p>
          </Tile>
        ))}
      </TilesGrid>

      <Button onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show Less" : "View more"}
      </Button>

      {showMore && (
        <ExtraContent>
          <h2>Extra Content Loaded!</h2>
          <p>This section appears because you clicked the button.</p>
        </ExtraContent>
      )}
    </Container>
  );
};

export default HomePage;