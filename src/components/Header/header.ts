import styled from 'styled-components';

export const Header = styled.header`
  background-color: ${(props) => props.theme['green-550']};
  display: flex;
  width: 100%;
  height: 3rem;
  color: #fff;
  border-radius: 8px;
  align-items: center;
  a {
    margin-left: 1rem;
  }
`;

export const Drawer = styled.button`
  all: unset;
  color: ${(props) => props.theme['text-color']};
  cursor: pointer;
  transition: color 0.3s;
  display: none;
  margin-left: 1rem;

  &:hover {
    color: ${(props) => props.theme['text-color']};
  }
  &::after {
    content: '☰';
  }
  @media (max-width: 640px) {
    display: block;
  }
`;

export const DrawerContainer = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 8px;
  width: 200px;
  background-color: ${(props) => props.theme['gray-900']};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  animation-name: drawerAnimation;
  animation-duration: 0.3s;
  @keyframes drawerAnimation {
    0% {
      width: 0px;
    }
    100% {
      width: 200px;
    }
  }
`;

export const DrawerItem = styled.a`
  text-decoration: none;
  padding: 1rem;
  display: block;
  color: ${(props) => props.theme['text-color']};
  cursor: pointer;
  animation-name: slideIn;
  animation-duration: 0.5s;

  @keyframes slideIn {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const HeaderLinks = styled.div`
  display: flex;
  margin-left: auto;
  padding-right: 1rem;
  a {
    color: ${(props) => props.theme['text-color']};
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover {
      color: orange;
    }
  }
  @media (max-width: 490px) {
    display: none;
  }
`;
