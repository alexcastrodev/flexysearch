import {
  eventInputToCurrency,
  formatMoney,
  formatNumberToCents,
  moneyToFloat,
  preparePayload,
} from ".";

describe("Prepare Payload", () => {
  it("should receive event and return a payload", async () => {
    const event = {
      target: {
        value: "56,91",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    const payload = preparePayload(event, 2);

    expect(payload).toEqual({
      float: 56.91,
      formatted: "56,91",
      cents: 5691,
      value: "56,91",
    });
  });
  it("should receive event and return a payload - Decimals of 4", async () => {
    const event = {
      target: {
        value: "56,91",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    const payload = preparePayload(event, 4);

    expect(payload).toEqual({
      float: 56.91,
      formatted: "56,91",
      cents: 569100,
      value: "56,91",
    });
  });
  it("should fill with zero on payload - Decimals of 4", async () => {
    const event = {
      target: {
        value: "56,910",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    let payload = preparePayload(event, 4);

    expect(payload).toEqual({
      float: 56.91,
      formatted: "56,91",
      cents: 569100,
      value: "56,910",
    });

    const event2 = {
      target: {
        value: "56,9102",
      },
    } as React.ChangeEvent<HTMLInputElement>;
    payload = preparePayload(event2, 4);

    expect(payload).toEqual({
      float: 56.9102,
      formatted: "56,9102",
      cents: 569102,
      value: "56,9102",
    });
  });
  it("should receive event and return a payload - Decimals of 6", async () => {
    const event = {
      target: {
        value: "56,91",
      },
    } as React.ChangeEvent<HTMLInputElement>;

    const payload = preparePayload(event, 6);

    expect(payload).toEqual({
      float: 56.91,
      formatted: "56,91",
      cents: 56910000,
      value: "56,91",
    });
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

describe("Format input to cents", () => {
  it("get correct 111023 cents", () => {
    const input = "1100,2333";
    const cents = formatNumberToCents(input, {
      maximumFractionDigits: 2,
    });
    expect(cents).toEqual(110023);
  });
  it("get correct cents - decimal", () => {
    const input = "1100,2333";
    const cents = formatNumberToCents(input, {
      maximumFractionDigits: 4,
    });
    expect(cents).toEqual(11002333);
  });
});
