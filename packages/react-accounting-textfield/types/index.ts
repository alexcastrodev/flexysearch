import React from "react";

export interface ChangeCurrencyEventProps {
  cents: number;
  float: number;
  formatted: string;
  value: string;
}

export type InputSize = "sm" | "md" | "lg";
export interface IInputProps {
  defaultValue?: string | number;
  value?: string | number;
  testID?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChangeCurrency?: (data: ChangeCurrencyEventProps) => void;
  onBlurCurrency?: (data: ChangeCurrencyEventProps) => void;
  showCurrencyIcon?: boolean;
  error?: boolean;
  helperText?: string | React.ReactElement;
  size?: InputSize;
  label?: string | React.ReactElement;
  minValue?: number;
  maxValue?: number;
  maximumFractionDigits?: number;
}
export interface IInputComponentProps {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  testID?: string;
}

export interface IUncontrolledProps extends IInputComponentProps {
  defaultValue: string;
}
