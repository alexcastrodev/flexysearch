import {
  eventInputToCurrency,
  formatMoney,
  moneyToFloat,
  preparePayload,
} from ".";

it("should receive event and return a payload", async () => {
  const event = {
    target: {
      value: "1234",
    },
  } as React.ChangeEvent<HTMLInputElement>;

  const payload = preparePayload(event, 2);

  expect(payload).toEqual({
    float: 1234,
    formatted: "1.234,00",
    cents: 123400,
    value: "1234",
  });
});

describe("Money To Float", () => {
  it("Should unformat a string", () => {
    const value = "1234,56";
    const unformatted = moneyToFloat(value);
    expect(unformatted).toEqual(1234.56);
  });
  it("Should unformat a string - decimals", () => {
    const value = "1123,9934";
    const unformatted = moneyToFloat(value, 4);
    expect(unformatted).toEqual(1123.9934);
  });
});

describe("Format Money", () => {
  it("Should format a string", () => {
    const value = 123;
    const unformatted = formatMoney(value);
    expect(unformatted).toEqual("123,00");
  });

  it("Should format a string - decimals", () => {
    const value = 1123.9934;
    const unformatted = formatMoney(value, {
      maximumFractionDigits: 4,
    });
    expect(unformatted).toEqual("1.123,9934");
  });
});

describe("Event Input To Currency", () => {
  it("Should format a string", () => {
    const input = "123,321321";
    const unformatted = eventInputToCurrency(input);
    expect(unformatted).toEqual("123,32");
  });
  it("Should format a string - crazy edge case", () => {
    const input = "1.1.1,12345";
    const unformatted = eventInputToCurrency(input);
    expect(unformatted).toEqual("11,10");
  });
});