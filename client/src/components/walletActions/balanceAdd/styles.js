import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-start
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

export const ButtonWrapper = styled.div`
    position: relative;
    display: inline-block;
`
export const ErrorBlock = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    cursor: not-allowed;
`
