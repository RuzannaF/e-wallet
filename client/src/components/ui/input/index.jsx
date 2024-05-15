import React from 'react'
import * as SC from './styles'

export const Input = ({ value, onChange, ...props }) => {
    return (
      <SC.InputContainer>
        <SC.InputField
          {...props}
          value={value}
          onChange={onChange}
        />
      </SC.InputContainer>
    );
  };
