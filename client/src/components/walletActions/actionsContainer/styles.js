import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from {
    background-color: transparent; 
  }
  to {
    background-color: #63B1FF; 
  }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    max-height: 300px;
    background-color: #ffffff;
    padding: 20px;
`
export const ActionsRow = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 30px;
`

export const Action = styled.h1`
    font-family: 'Manrope', sans-serif;
    font-weight: bold;
    font-size: 30px;
    color: #666666;
    cursor: pointer;
    transition: background-color 0.3s; 
    border-radius: 20px;
    padding: 15px 20px;

    &:hover {
        animation: ${fadeIn} 0.3s forwards;
        color: white;
    }
    ${({ selected }) =>
    selected &&
    `
    background-color: #63B1FF;
    border-radius: 20px;
    color: white;
`}
`
export const ActionItemContainer = styled.div`
    padding: 10px; 
`