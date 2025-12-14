import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/actions';
import { Link } from 'react-router-dom';

const Container = styled.div`max-width: 1200px; margin: 0 auto; padding: 2rem 1rem;`;
const Title = styled.h1`text-align: center; margin-bottom: 2rem; color: var(--dark);`;

const CartTable = styled.div`background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden;`;
const CartHeader = styled.div`display: grid; grid-template-columns: 3fr 1fr 1fr 1fr 0.5fr; padding: 1rem; background: var(--light); font-weight: bold; @media(max-width: 600px){ display: none; }`;
const CartItem = styled.div`display: grid; grid-template-columns: 3fr 1fr 1fr 1fr 0.5fr; padding: 1rem; border-bottom: 1px solid #eee; align-items: center; @media(max-width: 600px){ grid-template-columns: 1fr; gap: 10px; text-align: center; }`;

const ProductInfo = styled.div`display: flex; align-items: center; gap: 1rem; img { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; } @media(max-width: 600px){ flex-direction: column; }`;
const QuantityControl = styled.div`display: flex; align-items: center; gap: 10px; justify-content: center; button { width: 30px; height: 30px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 4px; &:hover { background: #eee; } }`;
const RemoveButton = styled.button`background: none; border: none; color: red; font-size: 1.5rem; cursor: pointer; &:hover { opacity: 0.7; }`;

const TotalSection = styled.div`margin-top: 2rem; text-align: right; h2 { font-size: 2rem; }`;
const CheckoutButton = styled.button`margin-top: 1rem; padding: 15px 40px; background: #10b981; color: white; border: none; border-radius: 6px; font-size: 1.2rem; cursor: pointer; &:hover { background: #059669; }`;
const EmptyMsg = styled.div`text-align: center; margin-top: 3rem; a { color: var(--primary); font-weight: bold; }`;

const CartPage = () => {
  // 1. Отримуємо товари з Redux
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // 2. Рахуємо загальну суму
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <Container>
        <Title>Your Cart</Title>
        <EmptyMsg>
          <h3>Your cart is empty 😔</h3>
          <Link to="/">Go back to shopping</Link>
        </EmptyMsg>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Your Shopping Cart</Title>
      
      <CartTable>
        <CartHeader>
          <div>Product</div>
          <div style={{textAlign:'center'}}>Price</div>
          <div style={{textAlign:'center'}}>Quantity</div>
          <div style={{textAlign:'center'}}>Total</div>
          <div></div>
        </CartHeader>

        {cartItems.map(item => (
          <CartItem key={item.id}>
            <ProductInfo>
              <img src={item.image} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p style={{fontSize:'0.8rem', color:'#888'}}>{item.category}</p>
              </div>
            </ProductInfo>
            
            <div style={{textAlign:'center'}}>${item.price}</div>
            
            <QuantityControl>
              <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
            </QuantityControl>
            
            <div style={{textAlign:'center', fontWeight:'bold'}}>
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <div style={{textAlign:'center'}}>
              <RemoveButton onClick={() => dispatch(removeFromCart(item.id))}>&times;</RemoveButton>
            </div>
          </CartItem>
        ))}
      </CartTable>

      <TotalSection>
        <h3>Total Amount:</h3>
        <h2>${totalAmount.toFixed(2)}</h2>
        <CheckoutButton>Proceed to Checkout</CheckoutButton>
      </TotalSection>
    </Container>
  );
};

export default CartPage;