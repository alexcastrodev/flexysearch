const defaultOptions = {
  minimumFractionDigits: 2,
  useGrouping: true,
  style: "decimal",
  maximumFractionDigits: 2,
};

/**
 * Prepares the payload for an input change event.
 *
 * @param event - The input change event.
 * @returns The prepared payload object.
 */
export const preparePayload = (
  event: React.ChangeEvent<HTMLInputElement>,
  maximumFractionDigits: number,
) => {
  const { value } = event.target;
  const floatValue = moneyToFloat(value, maximumFractionDigits);
  const parsedValue = formatMoney(floatValue, {
    maximumFractionDigits,
  });

  const newValue = (value || "").replace(/[^0-9.,]/g, "");
  const props = {
    float: floatValue,
    formatted: parsedValue,
    cents: formatNumberToCents(floatValue, {
      maximumFractionDigits,
    }),
    value: newValue,
  };

  return props;
};

/**
 * Converts a money value represented as a string to a floating-point number.
 *
 * @param value - The money value to convert.
 * @returns The converted floating-point number.
 */
export function moneyToFloat(value: string, fixed = 2) {
  const newValue = value.replace(".", "").replace(",", ".");
  const floatValue = parseFloat(newValue)?.toFixed(fixed) || 0;
  return Number(floatValue);
}

/**
 * Formats a number as a money value.
 *
 * @param value - The number to format as money.
 * @returns The formatted money value.
 */
export function formatMoney(
  value: number,
  options?: Intl.NumberFormatOptions,
) {
  const t = new Intl.NumberFormat("pt-BR", {
    ...defaultOptions,
    ...(options || {}),
  });
  return t.format(value);
}

// Function to format a number as currency and get the value in cents
export function formatNumberToCents(
  data: number,
  options: Intl.NumberFormatOptions,
) {
  const formattedCurrency = formatMoney(data, options);
  const numberWithoutFormatting = formattedCurrency.replace(/[.,]/g, "");
  const amountInCents = parseInt(numberWithoutFormatting, 10);

  return amountInCents;
}

/**
 * Converts an input value to a currency format.
 * @param value - The input value to be converted.
 * @param fixed - The number of decimal places to round the converted value to. Default is 2.
 * @returns The converted currency value as a string.
 */
export function eventInputToCurrency(value: string, fixed = 2) {
  const newValue = value.replace(".", "").replace(",", ".");
  const floatValue = parseFloat(newValue)?.toFixed(fixed) || "0";
  return formatMoney(Number(floatValue), {
    maximumFractionDigits: fixed,
  });
}
