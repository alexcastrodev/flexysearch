import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { CurrencyInput } from '.';

describe('Textfield', () => {
  it('Should emit correct payload on Blur', () => {
    const onBlur = jest.fn();
    render(<CurrencyInput defaultValue='1,23' onBlurCurrency={onBlur} />);

    const input = screen.getByTestId('react-currency-input-uncontrolled');

    act(() => {
      input.focus();
      input.blur();
    })

    expect(onBlur).toHaveBeenCalledWith({
      cents: 123,
      value: '1,23',
      float: 1.23,
      formatted: '1,23',
    });
  })
  it('Should emit decimal in value blur', () => {
    const onBlur = jest.fn();
    render(<CurrencyInput value='1100,2333' onBlurCurrency={onBlur} />);
    const input = screen.getByTestId('react-currency-input-controlled');

    act(() => {
      input.focus();
      input.blur();
    })

    expect(onBlur).toHaveBeenCalledWith({
      cents: 110023,
      value: '1.100,23',
      float: 1100.23,
      formatted: '1.100,23',
    });
  })
  it('Should emit correct payload on change', async () => {
    const onChange = jest.fn();
    render(<CurrencyInput value='0' onChangeCurrency={onChange} />);
    const input = screen.getByTestId('react-currency-input-controlled');
    await userEvent.clear(input);
    fireEvent.change(input, { target: { value: '1100,2333' } });

    const lastCall = onChange.mock.calls.at(-1).at(0);

    expect(lastCall).toEqual({
      "cents": 110023,
      "float": 1100.23,
      "formatted": "1.100,23",
      "value": "1100,2333"
    });
  })
  it('Should emit and zero fill cents if are zeros', async () => {
    const onChange = jest.fn();
    render(<CurrencyInput value='0' onChangeCurrency={onChange} />);
    const input = screen.getByTestId('react-currency-input-controlled');
    await userEvent.clear(input);
    fireEvent.change(input, { target: { value: '1100' } });

    const lastCall = onChange.mock.calls.at(-1).at(0);

    expect(lastCall).toEqual({
      "cents": 1100,
      "float": 1100,
      "formatted": "1.100,00",
      "value": "1100"
    });
  })
})

describe('Currency decimal', () => {
  it('Should emit and zero fill cents if are zeros - decimal', async () => {
    const onChange = jest.fn();
    render(<CurrencyInput value='0' onChangeCurrency={onChange} maximumFractionDigits={4} />);
    const input = screen.getByTestId('react-currency-input-controlled');
    await userEvent.clear(input);
    fireEvent.change(input, { target: { value: '1100,0099' } });

    const lastCall = onChange.mock.calls.at(-1).at(0);

    expect(lastCall).toEqual({
      "cents": 11000099,
      "float": 1100.0099,
      "formatted": "1.100,0099",
      "value": "1100,0099"
    });
  })
})
