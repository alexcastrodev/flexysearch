import React from 'react'
import { IInputComponentProps } from '../../types'

export const CurrencyInputControlled: React.FC<IInputComponentProps> = ({
  inputProps,
  handleBlur,
  handleChange,
  value,
  testID = 'react-currency-input-controlled',
}) => {
  const [cursor, setCursor] = React.useState(0)
  const ref = React.useRef(null)

  React.useEffect(() => {
    const input: any = ref.current
    if (input) {
      input.setSelectionRange(cursor, cursor)
    }
  }, [ref, cursor, value])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const caretEnd = e.target?.selectionEnd || 0
    setCursor(caretEnd)
    handleChange && handleChange(e)
  }

  return (
    <input
      {...inputProps}
      value={value}
      onBlur={handleBlur}
      ref={ref}
      onChange={handleChangeInput}
      data-testid={testID}
    />
  )
}

export default CurrencyInputControlled
