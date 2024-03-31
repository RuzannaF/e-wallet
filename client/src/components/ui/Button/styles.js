import styled from 'styled-components';

export const Button = styled.button`
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid black;
  max-width: 200px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &.regular {
    background: #fffff; 
    color: #333;
    border-color: #fffff;
  
    &:hover {
      background: #d9eaff; 
    }
  }

  &.primary {
    background: #63B1FF; 
    color: white;
    border: none;
    font-family: 'Manrope', sans-serif;
    font-size: 15px;
    font-weight: bold; 
  
    &:hover {
      background: #217dbb; 
      border-color: #217dbb; 
    }
  }

`;

