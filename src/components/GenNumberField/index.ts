import styled from "styled-components";

export const GenNumberField = styled.h1`
    background-color: ${props => props.theme.white};
    padding: 1rem;
    border-radius: 1rem;
    color: #000;
    margin: auto;
`

export const NumbersContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(10, auto);
    justify-content: center;
    align-items: center;
    gap: 1rem;
    @media (max-width: 1100px){
        grid-template-columns: repeat(5, auto);
    }
    @media (max-width: 560px){
        grid-template-columns: repeat(3, auto);
    }
    @media (max-width: 330px){
        grid-template-columns: repeat(1, auto);
    }
`