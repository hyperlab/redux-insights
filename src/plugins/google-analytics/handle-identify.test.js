import handleIdentify from "./handle-identify";

describe("handleIdentify", () => {
  it("should set userID on tracker", () => {
    const tracker = {
      set: jest.fn()
    };

    const insight = {
      data: "12345"
    };

    handleIdentify(tracker, insight);

    expect(tracker.set).toHaveBeenCalled();
    expect(tracker.set).toHaveBeenCalledWith("userId", insight.data);
  });
});
