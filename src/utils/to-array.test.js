import toArray from "./to-array";

describe("toArray", () => {
  it("should return array objects without modifications", () => {
    const arr = [];
    expect(toArray(arr)).toBe(arr);
  });

  it("should wrap non-array objects in an array", () => {
    const nonArray = {};
    expect(toArray(nonArray)).toEqual([nonArray]);
  });
});
