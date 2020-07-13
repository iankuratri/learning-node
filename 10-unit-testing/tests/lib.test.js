const lib = require("../lib");

describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return a greeting message with name", () => {
    const result = lib.greet("Ankur");
    expect(result).toContain("Ankur");
  });
});

describe("getCurrencies", () => {
  it("should return currency list", () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"]));
  });
});

describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1);
    expect(result).toMatchObject({ id: 1, price: 10 });
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    const args = [null, undefined, 0, NaN, false, ""];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return user object if valid username is passed", () => {
    const result = lib.registerUser("ankur");
    expect(result).toMatchObject({ username: "ankur" });
    expect(result.id).toBeGreaterThan(0);
  });
});
