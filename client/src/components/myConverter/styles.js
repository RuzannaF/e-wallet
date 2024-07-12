import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column; 
    width: 100%;
    gap: 10px;
`

export const Wrapper = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`
export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    `

export const Message = styled.span`
    font-family: 'Manrope', sans-serif;
    font-weight: regular;
    font-size: 15px;
    color: #666666;
    &.error {
        color: red;
    }
`