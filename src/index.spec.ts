import { hello } from ".";

describe("hello", () => {
  it("should return Hello World", () => {
    expect(hello("World")).toBe("Hello World");
  });
});
