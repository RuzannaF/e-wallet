import styled from 'styled-components';

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
`
export const StyledText = styled.span`
  font-family: 'Manrope', sans-serif;
  font-weight: regular;
  text-align: center; 
  line-height: 25px; 
  font-size: 20px;
  color: ${({ checked }) => (checked ? '#ffffff' : '#63B1FF')};
`