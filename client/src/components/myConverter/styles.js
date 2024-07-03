import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
`

export const Wrapper = styled.div`
display: flex;
    gap: 50px;
`
export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
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