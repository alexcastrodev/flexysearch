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
    cents: formatNumberToCents(value, {
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

export function padDecimal(input: string, padLength: number): string {
  // Split the input into integer and decimal parts
  const [integerPart, decimalPart] = input.split(",");
  if (!decimalPart) {
    return input;
  }

  // Pad the decimal part with zeros up to the specified length
  const paddedDecimal = decimalPart.padEnd(padLength, "0").slice(0, padLength);

  // Combine the integer and padded decimal parts
  const result = `${integerPart},${paddedDecimal}`;

  return result;
}

export function formatNumberToCents(
  data: string,
  options: Intl.NumberFormatOptions,
) {
  const maximumFractionDigits = options.maximumFractionDigits ?? 2;
  const currentInput = padDecimal(data, maximumFractionDigits);

  const numberWithoutFormatting = currentInput.replace(/[.,]/g, "");

  const amountInCents = parseInt(numberWithoutFormatting, 10);

  return amountInCents;
}

// Function to format a number as currency and get the value in cents
// export function formatNumberToCents(
//   data: number,
//   options: Intl.NumberFormatOptions,
// ) {
//   const formattedCurrency = formatMoney(data, options);
//   const numberWithoutFormatting = formattedCurrency.replace(/[.,]/g, "");
//   console.log(
//     "🚀 ~ file: index.ts:72 ~ formattedCurrency:",
//     data,
//     numberWithoutFormatting,
//     options,
//   );
//   const amountInCents = parseInt(numberWithoutFormatting, 10);

//   return amountInCents;
// }

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
