import styled, { keyframes, css } from 'styled-components';

const wobbleHorBottom = keyframes`
  0%,
  100% {
    transform: translateX(0%);
    transform-origin: 50% 50%;
  }
  15% {
    transform: translateX(-30px) rotate(-6deg);
  }
  30% {
    transform: translateX(15px) rotate(6deg);
  }
  45% {
    transform: translateX(-15px) rotate(-3.6deg);
  }
  60% {
    transform: translateX(9px) rotate(2.4deg);
  }
  75% {
    transform: translateX(-6px) rotate(-1.2deg);
  }
`

export const RadioContainer = styled.div`
  display: flex;
  gap: 10px;
`

export const RadioItem = styled.div`
  display: inline-block;
  width: 35px;
  height: 25px;
  padding: 2px;
  border: 2px solid #63B1FF;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ checked }) => (checked ? '#63B1FF' : 'transparent')};
  ${({ highlight }) =>
    highlight &&
    css`
      animation: ${wobbleHorBottom} 0.8s both;
    `}
`
export const StyledText = styled.span`
  font-family: 'Manrope', sans-serif;
  font-weight: regular;
  text-align: center; 
  line-height: 25px; 
  font-size: 20px;
  color: ${({ checked }) => (checked ? '#ffffff' : '#63B1FF')};
`
