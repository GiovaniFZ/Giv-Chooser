import styled from 'styled-components';

export const Button = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: ${(props) => props.theme['orange-500']};
  cursor: pointer;
  margin: 1rem;
  color: ${(props) => props.theme['text-color']};
  transition: background-color 0.25s;
  &:hover {
    background-color: ${(props) => props.theme.orange};
  }
`;
