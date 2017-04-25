import { INSIGHT_TRACK } from "../types";
import isInsight from "./is-insight";

describe("isInsight", () => {
  const baseInsight = {
    type: INSIGHT_TRACK,
    event: "trackingEvent",
    selector: x => x
  };

  it("should return true for a valid insight", () => {
    const insight = baseInsight;
    expect(isInsight(insight)).toBe(true);
  });

  it("should return false if insight is not an object", () => {
    const insight = 0;
    expect(isInsight(insight)).toBe(false);
  });

  it("should return false if type is not a string", () => {
    const insight = {
      ...baseInsight,
      type: 0
    };

    expect(isInsight(insight)).toBe(false);
  });

  it("should return false if event is not a string", () => {
    const insight = {
      ...baseInsight,
      event: 0
    };

    expect(isInsight(insight)).toBe(false);
  });

  it("should return false if selector is not a function", () => {
    const insight = {
      ...baseInsight,
      selector: 0
    };

    expect(isInsight(insight)).toBe(false);
  });
});
