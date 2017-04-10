import flattenArray from "./flatten-array";

describe("flattenArray", () => {
  it("should flatten a nested array", () => {
    const arr = ["is", "this", ["flat", "?"]];
    const expected = ["is", "this", "flat", "?"];

    expect(flattenArray(arr)).toEqual(expected);
  });

  it("should flatten a deeply nested array", () => {
    const arr = ["this", ["is", ["deeply", ["nested", ["right", ["?"]]]]]];
    const expected = ["this", "is", "deeply", "nested", "right", "?"];

    expect(flattenArray(arr)).toEqual(expected);
  });

  it("should throw if argument is not an array", () => {
    const notAnArray = true;

    expect(() => flattenArray(notAnArray)).toThrow();
  });
});
