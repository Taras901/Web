import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const HeaderWrapper = styled.header`
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  border: 2px solid var(--dark);
  width: 80px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--dark);
  position: relative;
  
  /* Хрестик на логотипі */
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    border: 1px solid var(--dark);
    opacity: 0.3;
  }
  &::before { transform: skewX(25deg); }
  &::after { transform: skewX(-25deg); }
`;

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  background: var(--light);
  padding: 5px;
  border-radius: 8px;
`;

const StyledLink = styled(Link)`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
  background-color: ${props => props.$active ? 'var(--primary-light)' : 'transparent'};
  color: ${props => props.$active ? 'var(--primary-dark)' : 'inherit'};

  &:hover {
    color: var(--primary);
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  svg {
    position: absolute;
    left: 10px;
    color: #9ca3af;
  }

  input {
    padding: 8px 16px 8px 35px;
    border-radius: 20px;
    border: 1px solid #d1d5db;
    outline: none;
    width: 250px;
    
    &:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 2px var(--primary-light);
    }
  }
`;

const Header = () => {
  const location = useLocation();
  const isCatalogPage = location.pathname === '/catalog';

  return (
    <HeaderWrapper>
      <Container>
        <Logo>LOGO</Logo>

        <Nav>
          <StyledLink to="/" $active={location.pathname === '/'}>Home</StyledLink>
          <StyledLink to="/catalog" $active={location.pathname === '/catalog'}>Catalog</StyledLink>
          <StyledLink to="/cart" $active={location.pathname === '/cart'}>Cart</StyledLink>
        </Nav>

        {isCatalogPage ? (
          <SearchWrapper>
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </SearchWrapper>
        ) : (
          <div style={{ width: '80px' }}></div>
        )}
      </Container>
    </HeaderWrapper>
  );
};

export default Header;