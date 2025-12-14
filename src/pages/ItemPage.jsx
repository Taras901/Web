import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { itemsData } from '../data';

// 1. Імпортуємо хук і екшн
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';

// ... (твої стилі Container, Wrapper і т.д. залишаються без змін) ...
const Container = styled.div`max-width: 1200px; margin: 0 auto; padding: 2rem 1rem;`;
const Wrapper = styled.div`display: flex; gap: 3rem; @media (max-width: 768px) { flex-direction: column; }`;
const ImageContainer = styled.div`flex: 1; img { width: 100%; border-radius: 8px; }`;
const InfoContainer = styled.div`flex: 1;`;
const Title = styled.h1`font-size: 2.5rem; margin-bottom: 1rem; color: var(--dark);`;
const Description = styled.p`color: var(--medium); margin-bottom: 2rem;`;
const Price = styled.div`font-size: 2rem; font-weight: bold; margin-bottom: 2rem;`;
const Button = styled.button`padding: 12px 24px; background: var(--dark); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1.1rem; &:hover { background: var(--primary); }`;

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // 2. Ініціалізуємо dispatch

  const item = itemsData.find(product => product.id === parseInt(id));

  if (!item) return <Container><h2>Item not found!</h2></Container>;

  // 3. Функція додавання
  const handleAddToCart = () => {
    dispatch(addToCart(item)); // Відправляємо товар в Redux
    alert(`${item.title} added to cart!`); // Просте повідомлення
  };

  return (
    <Container>
      <Wrapper>
        <ImageContainer>
           <img src={item.image} alt={item.title} />
        </ImageContainer>

        <InfoContainer>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
          <Price>${item.price}</Price>
          
          <div style={{display:'flex', gap:'10px'}}>
            <Button onClick={() => navigate(-1)} style={{background:'gray'}}>Go back</Button>
            
            {/* 4. Вішаємо обробник на кнопку */}
            <Button onClick={handleAddToCart}>Add to cart</Button>
          </div>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default ItemPage;