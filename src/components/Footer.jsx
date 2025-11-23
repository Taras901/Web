import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGooglePlusG } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  border-top: 1px solid #e5e7eb;
  padding: 2rem 0;
  margin-top: 3rem;
  background-color: var(--light);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
`;

const BrandText = styled.div`
  max-width: 300px;
  h3 { margin-bottom: 0.5rem; }
  p { font-size: 0.875rem; }
`;

const Logo = styled.div`
  border: 2px solid var(--dark);
  width: 80px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  font-weight: bold; opacity: 0.7;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconLink = styled.a`
  background: white;
  padding: 8px;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  display: flex; align-items: center; justify-content: center;
  color: #4b5563;
  transition: 0.2s;

  &:hover {
    background-color: var(--primary);
    color: white;
  }
`;

const Copyright = styled.div`
  text-align: center;
  font-size: 0.875rem;
  border-top: 1px solid #d1d5db;
  padding-top: 1rem;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <TopSection>
          <BrandText>
            <h3>Branding stuff</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </BrandText>

          <Logo>LOGO</Logo>

          <SocialIcons>
            <IconLink href="#"><FaFacebookF /></IconLink>
            <IconLink href="#"><FaTwitter /></IconLink>
            <IconLink href="#"><FaLinkedinIn /></IconLink>
            <IconLink href="#"><FaGooglePlusG /></IconLink>
          </SocialIcons>
        </TopSection>

        <Copyright>
          2020 IoT © Copyright all rights reserved
        </Copyright>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;