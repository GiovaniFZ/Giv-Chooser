import styled from "styled-components";

export const Header = styled.header`
    background-color: ${props => props.theme["green-500"]};
    display: flex;
    width: 100%;
    height: 3rem;
    color: #fff;
    border-radius: 8px;
    align-items: center;
    a{
        margin-left: 1rem;
    }
`