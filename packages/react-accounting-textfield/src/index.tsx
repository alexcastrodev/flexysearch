export type * from '../types'
export * from './utils'

import React from 'react'
import { ChangeCurrencyEventProps, IInputProps } from '../types'
import { CurrencyInputControlled } from './components/Controlled'
import { CurrencyInputUncontrolled } from './components/Uncontrolled'
import { EuroSignIcon } from './assets/icons/euro'
import classnames from 'clsx'
import { ExclamationCircleIcon } from './assets/icons/exclamationCircle'
import { formatMoney, moneyToFloat, eventInputToCurrency, preparePayload } from './utils'

export const CurrencyInput: React.FC<IInputProps> = ({
  inputProps,
  defaultValue,
  value,
  testID,
  onChangeCurrency,
  onBlurCurrency,
  showCurrencyIcon,
  size = 'md',
  label,
  error,
  helperText,
  minValue,
  maxValue,
  maximumFractionDigits = 2,
}) => {
  const [inputValue, setInputValue] = React.useState<string>('')

  React.useEffect(() => {
    typeof value !== 'undefined' && setInputValue(String(value))
  }, [value])

  React.useEffect(() => {
    if (value) {
      const localValue = moneyToFloat(String(value), maximumFractionDigits)
      setInputValue(formatMoney(localValue))
    }
    if (defaultValue && value) {
      console.warn(
        'You are trying to use controlled and uncontrolled at the same time. Just used inputProps.value or just defaultValue'
      )
    }
  }, [])

  const emitChanges = (
    currentValue: string,
    event: React.ChangeEvent<HTMLInputElement>,
    props: ChangeCurrencyEventProps
  ) => {
    !value && setInputValue(currentValue)
    inputProps?.onChange && inputProps.onChange(event)

    onChangeCurrency && onChangeCurrency(props)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const props = preparePayload(event, maximumFractionDigits)
    const { value, float } = props

    if (!maxValue && !minValue) {
      emitChanges(value, event, props)
    }

    const isTestedMaxValue = maxValue && float <= maxValue
    const isTestedMinValue = minValue && float >= minValue

    if (minValue && !maxValue && isTestedMinValue) {
      emitChanges(value, event, props)
    }

    if (maxValue && !minValue && isTestedMaxValue) {
      emitChanges(value, event, props)
    }

    if (maxValue && minValue && isTestedMinValue && isTestedMaxValue) {
      emitChanges(value, event, props)
    }
  }

  const onBlurCurrencyHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const props = preparePayload(event, maximumFractionDigits)

    onBlurCurrency?.(props)
  }

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (!inputValue) return
      let localValue = eventInputToCurrency(inputValue)
      setInputValue(localValue)

      inputProps?.onBlur && inputProps.onBlur(event)
      onBlurCurrencyHandler(event)
    },
    [inputValue]
  )

  return (
    <fieldset
      className={classnames({
        'react-accounting-textfield--fieldset': true,
        'react-accounting-textfield--fieldset--with-error':
          typeof error === 'boolean' ? error : false,
      })}
    >
      {label && (
        <label className='react-accounting-textfield--label'> {label}</label>
      )}
      <div
        className={classnames({
          'react-accounting-textfield--container': true,
          'react-accounting-textfield--container-with-adorment':
            showCurrencyIcon,
          'react-accounting-textfield--container-sm': size === 'sm',
          'react-accounting-textfield--container-md': size === 'md',
          'react-accounting-textfield--container-lg': size === 'lg',
          'react-accounting-textfield--container--with-label': !!label,
        })}
      >
        {showCurrencyIcon && (
          <div
            className={classnames({
              'react-accounting-textfield-with-adorment': showCurrencyIcon,
            })}
          >
            <EuroSignIcon />
          </div>
        )}

        {typeof value !== 'undefined' && (
          <CurrencyInputControlled
            inputProps={inputProps}
            value={String(inputValue)}
            handleBlur={handleBlur}
            handleChange={handleChange}
            data-testid={testID}
            setInputValue={setInputValue}
          />
        )}

        {typeof value === 'undefined' && (
          <CurrencyInputUncontrolled
            inputProps={inputProps}
            defaultValue={String(defaultValue)}
            value={String(inputValue)}
            handleBlur={handleBlur}
            handleChange={handleChange}
            data-testid={testID}
            setInputValue={setInputValue}
          />
        )}
      </div>
      {helperText && (
        <div className='react-accounting-textfield--helperText-container'>
          {error && (
            <i className='react-accounting-textfield--helperText-icon-error'>
              <ExclamationCircleIcon />
            </i>
          )}
          <span className='react-accounting-textfield--helperText'>
            {helperText}
          </span>
        </div>
      )}
    </fieldset>
  )
}
