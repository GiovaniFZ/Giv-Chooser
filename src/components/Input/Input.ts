import styled from 'styled-components'

export const Input = styled.input`
border-radius: 8px;
width: 5%;
font-size: 1.5rem;
padding: 1rem;
outline: none;
border: none;
background-color: ${props => props.theme.white};
color: #000;
&:focus {
  outline: 5px solid ${props => props.theme["green-300"]};
}
`

export const InputField = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`