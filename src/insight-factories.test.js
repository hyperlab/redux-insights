import { INSIGHT_IDENTIFY, INSIGHT_TRACK, INSIGHT_PAGE } from "./types";
import { id, identify, track, page } from "./insight-factories";

const insightTypes = [
  ["identify", INSIGHT_IDENTIFY, identify],
  ["track", INSIGHT_TRACK, track],
  ["page", INSIGHT_PAGE, page]
];

const event = "mockEvent";
const data = "mockData";

insightTypes.forEach(([name, type, factory]) => {
  describe(name, () => {
    it(`returns an insight object with type ${type} and null data`, () => {
      expect(factory(event)).toEqual({ type, event, data: null });
    });

    it(`returns an insight object with type ${type} and provided data`, () => {
      expect(factory(event, data)).toEqual({ type, event, data });
    });
  });
});
