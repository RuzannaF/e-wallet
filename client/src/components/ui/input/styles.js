import styled from 'styled-components';

export const InputContainer = styled.div`
  position: relative;
`;

export const InputField = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &:hover {
    border-color: #007bff;
  }
  &.mediumInput {
    width: 250px;

    &::placeholder {
      font-family: 'Manrope', sans-serif;
      font-weight: light;
      font-size: 18px;
    }
  }

  &.smallInput {
    width: 175px;

    &::placeholder {
      font-family: 'Manrope', sans-serif;
      font-weight: light;
      font-size: 12px;
    }
  }
    &.errorInput {
      border: 1px solid red;
  }
`
