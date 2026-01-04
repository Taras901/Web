import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const HeaderWrapper = styled.header`
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--dark);
  text-decoration: none;
  span { color: var(--primary); }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--medium);
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }
`;

const CartLink = styled(Link)`
  text-decoration: none;
  color: var(--dark);
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  
  &:hover { color: var(--primary); }
`;

const Badge = styled.span`
  background-color: #ef4444; /* Red color */
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 99px;
  min-width: 20px;
  text-align: center;
`;


const Header = () => {

  const cartItems = useSelector(state => state.cart);
  
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <HeaderWrapper>
      <Container>
        <Logo to="/">Furniture<span>Shop</span></Logo>
        
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/catalog">Catalog</NavLink>
          
          <CartLink to="/cart">
            <span>Cart</span>
            {totalCount > 0 && <Badge>{totalCount}</Badge>}
          </CartLink>
        </Nav>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;