import { track } from "../insight-factories";
import selectData from "./select-data";

describe("selectData", () => {
  it("does nothing if provided arg is an insight", () => {
    const insight = track("event");
    expect(selectData()(insight)).toBe(insight);
  });

  it("calls function with action and getState if arg is a function", () => {
    const data = "mockData";
    const selector = jest.fn(() => data);
    const action = { type: "MOCK_ACTION" };
    const getState = jest.fn();

    expect(selectData(action, getState)(selector)).toBe(data);
    expect(selector).toHaveBeenCalled();
    expect(selector).toHaveBeenCalledWith(action, getState);
  });

  it("selects data from payload using provided selector function", () => {
    const payload = {
      select: "mockData"
    };
    const selector = action => action.payload.select;
    const action = { type: "MOCK_ACTION", payload };
    const getState = jest.fn();

    expect(selectData(action, getState)(selector)).toBe(payload.select);
  });

  it("selects data from state using provided selector function", () => {
    const selector = (action, getState) => getState().payload;
    const action = { type: "MOCK_ACTION" };
    const data = { payload: "mockData" };
    const getState = jest.fn(() => data);

    expect(selectData(action, getState)(selector)).toBe(data.payload);
  });
});
