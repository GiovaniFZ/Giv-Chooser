import styled from 'styled-components';

export const GenNumberField = styled.h1`
  background-color: ${(props) => props.theme['text-color']};
  padding: 1rem;
  border-radius: 1rem;
  color: #000;
`;

export const NumbersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, auto);
  justify-content: center;
  align-items: center;
  gap: 1rem;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(5, auto);
  }
  @media (max-width: 560px) {
    grid-template-columns: repeat(3, auto);
  }
  @media (max-width: 330px) {
    grid-template-columns: repeat(1, auto);
  }
`;

export const SmallNumbersContainer = styled(NumbersContainer)`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

export const GenNumberFieldMargin = styled(GenNumberField)`
  margin: auto;
`;
