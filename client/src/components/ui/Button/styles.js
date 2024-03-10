import styled from 'styled-components';

export const Button = styled.button`
  padding: 8px;
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
    background: #f8f8f8; 
    color: #333;
    border-color: #f8f8f8;
  
    &:hover {
      background: #d9eaff; 
    }
  }

  &.primary {
    background: #3498db; 
    color: white; 
  
    &:hover {
      background: #217dbb; 
      border-color: #217dbb; 
    }
  }

`;

