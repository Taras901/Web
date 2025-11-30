import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { itemsData } from '../data';

const Container = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 2rem 1rem;
`;
const Wrapper = styled.div`
  display: flex; gap: 3rem;
  @media (max-width: 768px) { flex-direction: column; }
`;
const ImageContainer = styled.div`
  flex: 1; background-color: #f3f4f6; min-height: 400px; border-radius: 8px; overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; }
`;
const InfoContainer = styled.div` flex: 1; `;
const Title = styled.h1` font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--dark); `;
const Description = styled.p` color: var(--medium); line-height: 1.6; margin-bottom: 2rem; `;
const FooterRow = styled.div` display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; `;
const Price = styled.div` font-size: 2rem; font-weight: bold; color: black; `;
const Button = styled.button`
  padding: 12px 24px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s;
  background-color: ${props => props.$primary ? 'var(--dark)' : 'white'};
  color: ${props => props.$primary ? 'white' : 'var(--dark)'};
  border: 1px solid var(--dark);
  &:hover { opacity: 0.9; }
`;

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = itemsData.find(product => product.id === parseInt(id));

  if (!item) return <Container><h2>Item not found!</h2></Container>;

  return (
    <Container>
      <Wrapper>
        <ImageContainer>
          <img src={item.image} alt={item.title} />
        </ImageContainer>

        <InfoContainer>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
          
          <FooterRow>
            <Price>Price: ${item.price.toFixed(2)}</Price>
            <div style={{display:'flex', gap:'10px'}}>
              <Button onClick={() => navigate(-1)}>Go back</Button>
              <Button $primary>Add to cart</Button>
            </div>
          </FooterRow>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default ItemPage;