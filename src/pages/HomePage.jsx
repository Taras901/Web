import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroSection = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HeroImage = styled.div`
  width: 50%;
  height: 320px;
  background-color: var(--primary-light);
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%; height: 100%; object-fit: cover;
  }
  @media (max-width: 768px) { width: 100%; }
`;

const HeroContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  h1 { font-size: 2.5rem; margin-bottom: 1rem; }
  p { font-size: 1.1rem; line-height: 1.6; }
  @media (max-width: 768px) { width: 100%; }
`;

const TilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Tile = styled.div`
  text-align: center;
  img {
    width: 100%; height: 200px; object-fit: cover;
    border-radius: 8px; margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  background-color: var(--primary);
  color: white;
  padding: 12px 32px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: var(--primary-dark);
  }
`;

const HomePage = () => {
  return (
    <Container>
      <HeroSection>
        <HeroImage>
          {/* <img src={heroImage} alt="Hero" /> */}
          <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color: '#2563eb'}}></div>
        </HeroImage>
        <HeroContent>
          <h1>Heading</h1>
          <p>...</p>
        </HeroContent>
      </HeroSection>

      <TilesGrid>
        {[1, 2, 3].map(item => (
          <Tile key={item}>
            <div style={{height: '200px', background: '#dbeafe', borderRadius: '8px', marginBottom: '1rem'}}></div> 
             {/* <img src={itemImage} alt="Tile" /> */}
            <h3>{item}</h3>
            <p>...</p>
          </Tile>
        ))}
      </TilesGrid>

      <Button>View more</Button>
    </Container>
  );
};

export default HomePage;