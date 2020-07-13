const { fizzBuzz } = require("../exercise1");

describe("exercise1", () => {
  it("should throw when input is not a number", () => {
    const args = [null, undefined, "abc", {}];
    args.forEach((a) => {
      expect(() => {
        fizzBuzz(a);
      }).toThrow();
    });
  });

  it("should return FizzBuzz when input is divisible by 3 and 5", () => {
    const result = fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("should return Fizz when input is only divisible by 3", () => {
    const result = fizzBuzz(6);
    expect(result).toBe("Fizz");
  });

  it("should return Buzz when input is only divisible by 5", () => {
    const result = fizzBuzz(10);
    expect(result).toBe("Buzz");
  });

  it("should return input if it is divisible by 3 and 5", () => {
    const result = fizzBuzz(1);
    expect(result).toBe(1);
  });
});
