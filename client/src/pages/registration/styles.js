import styled from "styled-components"


export const Title = styled.h1`
    font-size: 40px;
    font-weight: bold;
    color: #63B1FF;
`
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    margin: auto;
`
export const Text = styled.span`
    font-size: 20px;
    font-weight: bold;

    &.normal {
        color: #63B1FF;
    }

    &.error {
        color: red;
    }
`