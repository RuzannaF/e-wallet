import styled from 'styled-components';

export const SelectContainer = styled.div`
  position: relative;
`

export const SelectField = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &:hover {
    border-color: #007bff;
  }
`

export const Option = styled.option`
  font-size: 16px;
`