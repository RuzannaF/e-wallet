import styled from 'styled-components';

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const InputField = styled.input`
  width: 100%;
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
`;