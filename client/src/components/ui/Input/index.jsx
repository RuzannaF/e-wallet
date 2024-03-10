import React, { useState } from 'react'
import * as SC from './styles'

export const Input = ({ value, onChange, label, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
  
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