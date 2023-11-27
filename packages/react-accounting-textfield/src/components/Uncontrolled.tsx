import React from 'react'
import { IUncontrolledProps } from '../../types'
import {eventInputToCurrency} from '../utils'
export const CurrencyInputUncontrolled: React.FC<IUncontrolledProps> = ({
  inputProps,
  defaultValue,
  value,
  handleBlur,
  handleChange,
  setInputValue,
  testID = 'react-currency-input-uncontrolled',
}) => {
  React.useEffect(() => {
    if (defaultValue !== 'undefined') {
      setInputValue(eventInputToCurrency(defaultValue))
    }
  }, [])

  return (
    <input
      {...inputProps}
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
      data-testid={testID}
    />
  )
}

export default CurrencyInputUncontrolled
