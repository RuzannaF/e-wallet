import * as SC from './styles'

export const Select = ({ value, onChange, className, children, ...props }) => {
    return (
      <SC.SelectContainer>
        <SC.SelectField
          {...props}
          className={className}
          value={value}
          onChange={onChange}
        >
          {children}
        </SC.SelectField>
      </SC.SelectContainer>
    )
  }