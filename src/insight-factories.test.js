import { INSIGHT_IDENTIFY, INSIGHT_TRACK, INSIGHT_PAGE } from "./types";
import { id, identify, track, page } from "./insight-factories";

const insightTypes = [
  ["identify", INSIGHT_IDENTIFY, identify],
  ["track", INSIGHT_TRACK, track],
  ["page", INSIGHT_PAGE, page]
];

const event = "mockEvent";
const customSelector = props => props.id;
const failingSelector = 0;

insightTypes.forEach(([name, type, factory]) => {
  describe(name, () => {
    it(`returns an insight object with type ${type} and default selector`, () => {
      expect(factory(event)).toEqual({ type, event, selector: id });
    });

    it(`returns an insight object with type ${type} and provided selector`, () => {
      expect(factory(event, customSelector)).toEqual({
        type,
        event,
        selector: customSelector
      });
    });

    it(`throws if provided selector is not a function`, () => {
      expect(() => factory(event, failingSelector)).toThrow();
    });
  });
});
