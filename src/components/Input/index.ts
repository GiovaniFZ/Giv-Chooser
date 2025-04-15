import styled from 'styled-components';

export const Input = styled.input`
  border-radius: 8px;
  width: 5%;
  font-size: 1.5rem;
  padding: 1rem;
  outline: none;
  border: none;
  background-color: ${(props) => props.theme['field-color']};
  color: #000;
  &:focus {
    outline: 5px solid ${(props) => props.theme['green-300']};
  }
  @media (max-width: 860px) {
    width: 20%;
  }
`;

export const InputWord = styled(Input)`
  width: 50%;
`;

export const InputField = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export const InputCheckbox = styled(Input)`
  all: unset;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 4px;
  background-color: ${(props) => props.theme['field-color']};
  cursor: pointer;
  box-sizing: border-box;
  overflow: 'hidden';
  position: relative;
  &:focus {
    outline: none;
  }
  &:checked {
    background-color: ${(props) => props.theme['green-500']};
  }
  &:checked::before {
    content: '\\2713';
    position: absolute;
    color: ${(props) => props.theme['white-color']};
    font-size: 0.8rem;
    font-weight: bold;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;
