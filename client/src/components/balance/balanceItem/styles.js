import styled from "styled-components"

export const BalanceItem = styled.div`
    display: flex;
    flex-direction: column;
    width: 150px;
    height: 150px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
    overflow: hidden; 
    background: hsla(210, 75%, 50%, 1);
    background: hsla(210, 100%, 69%, 1);
    background: linear-gradient(315deg, hsla(210, 100%, 69%, 1) 0%, hsla(216, 83%, 93%, 1) 100%);
    background: -moz-linear-gradient(315deg, hsla(210, 100%, 69%, 1) 0%, hsla(216, 83%, 93%, 1) 100%);
    background: -webkit-linear-gradient(315deg, hsla(210, 100%, 69%, 1) 0%, hsla(216, 83%, 93%, 1) 100%);
    filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#63B1FF", endColorstr="#DEEAFC", GradientType=1 );
    
`
export const IconContainer = styled.div`
    position: absolute;
    right: 30px;
    bottom: 25px;
    transform: translate(50%, 50%); 
`
export const CurrencyText = styled.span`
    font-family: 'Manrope', sans-serif;
    font-size: 35px;
    color: white;
    opacity: 0.9;
    font-weight: bold; 
`