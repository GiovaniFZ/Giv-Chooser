import styled from 'styled-components';

export const GenWordsField = styled.h1`
  border-radius: 8px;
  background-color: ${(props) => props.theme['field-color']};
  padding: 1rem;
  color: #000;
  width: fit-content;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0 auto;
  margin-bottom: 1rem;
`;
