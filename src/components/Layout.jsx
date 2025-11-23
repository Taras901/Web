import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 2rem 0;
`;

const Layout = ({ children }) => {
  return (
    <PageWrapper>
      <Header />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </PageWrapper>
  );
};

export default Layout;