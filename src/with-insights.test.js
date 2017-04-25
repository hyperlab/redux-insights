import withInsights from "./with-insights";
import { track } from "./insight-factories";

describe("withInsights", () => {
  it("should return a wrapper for action creators", () => {
    const insights = track("test");
    const wrap = withInsights(insights);

    expect(typeof wrap).toBe("function");

    const mockActionCreator = jest.fn();
    const enhancedActionCreator = wrap(mockActionCreator);

    expect(typeof enhancedActionCreator).toBe("function");

    enhancedActionCreator("test");

    expect(mockActionCreator).toHaveBeenCalled();
    expect(mockActionCreator).toHaveBeenCalledWith("test");
  });

  it("should work with no provided insights", () => {
    const expected = {
      type: "testAction",
      payload: "test"
    };

    const mockActionCreator = jest.fn().mockReturnValueOnce(expected);
    const enhancedActionCreator = withInsights()(mockActionCreator);
    const action = enhancedActionCreator(expected.payload);

    expect(typeof enhancedActionCreator).toBe("function");
    expect(action).toEqual(expected);
  });

  it("should attach insights to action object", () => {
    const insights = track("test");
    const expected = {
      type: "testAction",
      payload: "test",
      insights
    };

    const actionCreator = payload => ({
      type: expected.type,
      payload
    });
    const enhancedActionCreator = withInsights(insights)(actionCreator);
    const action = enhancedActionCreator(expected.payload);

    expect(action).toEqual(expected);
  });

  it("supports providing an insight creator", () => {
    const insightCreator = action => track("test", action.payload);
    const expected = {
      type: "testAction",
      payload: "test",
      insights: track("test", "test")
    };

    const actionCreator = payload => ({
      type: expected.type,
      payload
    });

    const enhancedActionCreator = withInsights(insightCreator)(actionCreator);
    const action = enhancedActionCreator(expected.payload);

    expect(action).toEqual(expected);
  });
});
